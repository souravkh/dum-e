const TXT_EXTENSION = "txt"

function txtFileChecker(fileName :string):boolean{ 
    if(fileName){
          const extension = fileName?.split(".")?.pop()?.toLowerCase() ?? "";
          if(extension==TXT_EXTENSION)
            return true
    }
    return false

}

export default txtFileChecker;
