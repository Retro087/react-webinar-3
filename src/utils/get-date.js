export default function getDate(date) {
    const newDate = new Date(date); 
    const day = newDate.getDate()
    const month = newDate.toLocaleString('default', { month: 'long' });
    const year = newDate.getFullYear()
    const hours = newDate.getHours()
    const minutes = newDate.getMinutes()
    let plurizedMonth;
    let newHour;
    let newMin;

    if(month === 'август' || month === 'март'){
        month.join('а') 
    }else{
        plurizedMonth = month.replace("ь", 'я')
    }
    if(month === 'май'){
        plurizedMonth = month.replace("й", 'я')
    }
    if(hours.toString().length === 1){
        newHour = '0' + hours.toString()
    }else{
        newHour = hours
    }
    if(minutes.toString().length === 1){
        newMin = '0' + (minutes.toString())
    }else{
        newMin = minutes
    }
    return `${day} ${plurizedMonth} ${year} в ${newHour}:${newMin}`
}
  