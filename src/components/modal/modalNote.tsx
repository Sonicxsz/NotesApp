import { Box, Button, TextField, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import { title } from "process";
import style from "./modal.module.scss";
import { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { addNotes } from "../../store/slice/notesSlice";
import { timeCreater } from "../../utils/time";
import { Istate } from "../noteItem/NoteItemList";
import ModalBtns from "./modalBtns";

interface Imodal {
  closeNote: (value: boolean) => void;
}

function ModalNote(props: Imodal) {
  const [name, setName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [colorBtns, setColorBtns] = useState([
    { id: 0, name: "#2E958C" },
    { id: 1, name: "#589d62" },
    { id: 2, name: "#945D87" },
    { id: 3, name: "#EF7663" },
    {id:4, name: '#a8296b'},
    {id:5, name: '#303d55'}
  ]);
  const [color, setColor] = useState<string>("#2E958C");

  const dispatch = useAppDispatch();
  function addNewNote() {
    let id = nanoid();
    let date = timeCreater();
    let newNote: Istate = {
      important: false,
      name: name,
      title,
      id,
      time: date,
      color,
    };
    const json = JSON.stringify(newNote);
    dispatch(addNotes(json));
    props.closeNote(false);
  }

  return (
    <>
      <div className={style.flex}>
        <TextField
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className={style.nameInp}
          id="standard-basic"
          label="Введите название заметки"
          variant="standard"
        />
      </div>

      <div className={style.flex}>
        <TextField
          minRows={2}
          maxRows={6}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className={style.textInp}
          id="standard-textarea"
          label="Пишите...."
          placeholder="Творите"
          multiline
          variant="standard"
        />
      </div>

      <div className={style.colors}>
        <Typography mr={1} variant="body1">
          Цвет:
        </Typography>
        {colorBtns.map((i) => {
          let clazz =
            i.name === color ? `${style.colorPick}` : `${style.color}`;
          return (
            <div
              onClick={() => {
                setColor(i.name);
              }}
              key={i.id}
              className={clazz}
              style={{ backgroundColor: i.name }}
            ></div>
          );
        })}
      </div>

      <ModalBtns addNewNote={addNewNote} closeNote={props.closeNote} />
    </>
  );
}

export default ModalNote;
