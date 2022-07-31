import React from 'react'
import style from './menu.module.scss'
function Menu(props:any) {
    

  return (
    <div className={style.wrap}>
        <div className={style.item}><i className="bi bi-journal-bookmark"></i></div>
        <div className={style.item}><i className="bi bi-star"></i></div>
        <div className={style.item}><i className="bi bi-trash-fill"></i></div>
        <div className={style.item}
          onClick={() =>{
            props.openNote(true)
          }}
        ><i className="bi bi-plus-circle-dotted"></i></div>
    </div>
  )
}

export default Menu