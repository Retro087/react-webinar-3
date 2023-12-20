import item from "../components/item";

export default function getChild(parent, arr){
    let lastChild;
    if(parent?.length !== 0){    
      let children = arr.filter(el => el.parent._id === parent)    
      if(!children.length){
        return arr.find(item => item._id === parent)
      }
      children.forEach((item, i) => { 
        if(i === children.length-1){    
          lastChild = getChild(item._id, arr)
        }
      })
    }
    return lastChild
}