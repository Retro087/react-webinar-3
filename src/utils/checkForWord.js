export default function checkForWord(str) {
    let result = false
    if(!str.length) return result
    let arr = str.split(' ')
    arr.forEach(item => {
        if(item !== ''){
            result = true
        }
    })
    return result;
}
  