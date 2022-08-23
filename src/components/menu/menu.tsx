import React from "react";
import style from "./menu.module.scss";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { changeFilter } from "../../store/slice/notesSlice";
import { changeImportant } from "../../store/slice/notesSlice";
import {Link} from 'react-router-dom'

interface menuProps {
  searchOpen: boolean;
  openNote: (arg: boolean) => void;
  setSearchOpen: (arg: boolean) => void;
  isNoteOpen: boolean;
}

function Menu(props: menuProps) {
  const {filter} = useAppSelector((state) => state.notesSlice);
  const dispatch = useAppDispatch();

  //переключатели активности
  const [all, setAll] = React.useState(true)
  const [star, setStar] = React.useState(false)
  const [trash, setTrash] = React.useState(false)
  //переключатели активности

  //Цвет активности кнопок
  const colorActive = filter.length ? { color: "orange" } : { color: "" };
  const importantActive = star ? { color: "orange" } : { color: "" };
  const allActive =  all ? { color: "orange" } : { color: "" };
  const trashActive =  trash ? { color: "orange" } : { color: "" };
  const modalActive = props.isNoteOpen ? { color: "orange" } : { color: "" };
  //Цвет активности кнопок


  //Функция для переключения активности кнопок
  function switcher (all: boolean, star: boolean, trash: boolean):void{
    setAll(all);
    setStar(star);
    setTrash(trash);
  }

  return (
    <div className={style.wrap}>
      <div className={style.sticky}>
      <Link to='/profile'>
        <div
        className={style.item}
        style={{marginBottom: "30px"}}
        >
          <div className={style.profileCircle}>

          </div>
        </div>
      </Link>
      <Link to='/'>
        <div
          className={style.item}
          onClick={() => {
            switcher(true, false, false)
            dispatch(changeFilter(""));
            props.setSearchOpen(false);
            dispatch(changeImportant(false));
          }}
        >
          <i className="bi bi-journal-bookmark" style={allActive} ></i>
        </div>
        </Link>
        <Link to='/'>
        <div 
        onClick={() => {
          dispatch(changeImportant(true));
          switcher(false, true, false)
        }}
        className={style.item}>
          <i className="bi bi-star" style={importantActive}></i>
        </div>
        <div
          onClick={() => {
            props.openNote(false);
            props.setSearchOpen(!props.searchOpen);
          }}
          className={style.item}
        >
          <i className="bi bi-search" style={colorActive}></i>
        </div>
        </Link>
        <Link to='/delete'
        onClick={() =>{
          switcher(false, false, true)
        }}
        >
            <div 
            className={style.item}>
              <i className="bi bi-trash-fill" style={trashActive}></i>
            </div>
        </Link>
        <div
          className={style.item}
          onClick={() => {
            props.openNote(true);
            props.setSearchOpen(false);
          }}
        >
          <i className="bi bi-plus-circle-dotted" style={modalActive}></i>
        </div>
      </div>
    </div>
  );
}

export default Menu;

