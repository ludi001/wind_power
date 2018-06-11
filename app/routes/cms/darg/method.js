export function getPosition(offset, basewidth) {
  if (!offset || !basewidth) {
    return
  }
  let x = offset.x - 200;
  let y = offset.y - 70;

  return {
    col: parseInt(x/basewidth ) || 0,
    row: parseInt(y/basewidth ) || 0,
  }
}

export  function getColAct(compsInfo, col, key) {
  if(!col.col) {
    return
  }
  if(key >= col.col  && key <= col.col  + parseInt(compsInfo.width) ) {
    return true
  }
}

export  function getRowAct(compsInfo, col, key) {
  if(!col.rowl) {
    return
  }
  if(key >= col.rowl  && key <= col.rowl  + parseInt(compsInfo.height) ) {
    return true
  }
}

export function apiClient(ajaxArr){
    if(!ajaxArr){
      return '667'
    }else{
    return(
      ajaxArr.map(function(value,key){
        if(value.type!='websoket'){
          return (
             '4755'
            )
        }else{
          return '这里是websoket方法';
            console.log('这里是websoket方法')
        }
      })

      )
     }
}

