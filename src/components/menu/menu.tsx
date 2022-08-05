import React from "react";
import style from "./menu.module.scss";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { changeFilter } from "../../store/slice/notesSlice";
import { changeImportant } from "../../store/slice/notesSlice";

interface menuProps {
  searchOpen: boolean;
  openNote: (arg: boolean) => void;
  setSearchOpen: (arg: boolean) => void;
}

function Menu(props: any) {
  const filter = useAppSelector((state) => state.notesSlice.filter);
  const dispatch = useAppDispatch();

  const colorActive = filter.length ? { color: "orange" } : { color: "" };

  return (
    <div className={style.wrap}>
      <div className={style.sticky}>
        <div
          className={style.item}
          onClick={() => {
            dispatch(changeFilter(""));
            props.setSearchOpen(false);
            dispatch(changeImportant(false));
          }}
        >
          <i className="bi bi-journal-bookmark"></i>
        </div>
        <div className={style.item}>
          <i
            className="bi bi-star"
            onClick={() => {
              dispatch(changeImportant(true));
            }}
          ></i>
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

        <div className={style.item}>
          <i className="bi bi-trash-fill"></i>
        </div>
        <div
          className={style.item}
          onClick={() => {
            props.openNote(true);
            props.setSearchOpen(false);
          }}
        >
          <i className="bi bi-plus-circle-dotted"></i>
        </div>
      </div>
    </div>
  );
}

export default Menu;
function setSearchOpen(arg0: boolean) {
  throw new Error("Function not implemented.");
}
