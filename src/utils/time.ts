export const timeCreater = () =>{
    

    let hours = zeroHelper(new Date().getHours())
    let minutes = zeroHelper(new Date().getMinutes())
    let day = zeroHelper(new Date().getDate())
    let month = getMonthName(new Date().getMonth())
  
    return `${day} ${month} - ${hours}:${minutes} `
}

function zeroHelper (num:number ):string  {
    if(num < 10){
        return `0${num}`   
    }else{
        return String(num) 
    }
    
}

 function getMonthName (num:number):string {
    switch(num){
        case 1: {
            return 'January'
        }
        case 2: {
            return 'February'
        }
        case 3: {
            return 'March'
        }
        case 4: {
           return 'April' 
        }
        case 5: {
         return 'May'   
        }
        case 6: {
            return 'June'
        }
        case 7: {
            return 'July'
        }
        case 8: {
            return 'August'
        }
        case 9: {
            return 'September'
        }
        case 10: {
           return 'October' 
        }
        case 11: {
            return 'November'
        }
        case 12: {
            return 'December'
        }
        default: {
            return 'smtWrong'
        }
    }
}