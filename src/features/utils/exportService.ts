import ExcelJS from 'exceljs';

export type PromptRecord = Record<string, string>;
export type ExportFormat = 'txt' | 'xlsx';

// 1. Pure formatting strategies
const formatters: Record<ExportFormat, (record: PromptRecord) => Promise<Blob> | Blob> = {
    txt: (record) => {
        const content = Object.entries(record)
            .map(([prompt, duration]) => `Prompt: ${prompt}\nDuration: ${duration}\n\n${'='.repeat(40)}\n\n`)
            .join('');
        return new Blob([content], { type: 'text/plain;charset=utf-8' });
    },

    xlsx: async (record) => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Prompts');

        // Define columns: Col 1 = Prompt, Col 2 = Duration
        sheet.columns = [
            { header: 'Prompt', key: 'prompt', width: 45 },
            { header: 'Duration', key: 'duration', width: 20 }
        ];

        // Add rows from the record
        Object.entries(record).forEach(([prompt, duration]) => {
            sheet.addRow({ prompt, duration });
        });

        const buffer = await workbook.xlsx.writeBuffer();
        return new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    }
};

// 2. Side-effect handler for browser download
function triggerDownload(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}

// 3. Main export function
export async function exportPrompts(record: PromptRecord, format: ExportFormat, baseFilename = 'prompts') {
    if (!record || Object.keys(record).length === 0) {
        throw new Error('No data available to export.');
    }

    const formatter = formatters[format];
    if (!formatter) {
        throw new Error(`Unsupported export format: ${format}`);
    }

    const blob = await formatter(record);
    triggerDownload(blob, `${baseFilename}.${format}`);
}