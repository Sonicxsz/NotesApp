import {TextField } from "@mui/material";
import style from "../modal.module.scss";
import { useState } from "react";
import { useAppDispatch } from "../../../hooks";
import { addNotes } from "../../../store/slice/notesSlice";
import { timeCreater } from "../../../utils/time";
import { Istate } from "../../noteItem/NoteItemList";
import ModalBtns from "../modalBtns";
import ColorPick from "../../colorPick/ColorPick";

interface Imodal {
  closeNote: (value: boolean) => void;
}

function ModalNote(props: Imodal) {
  const [name, setName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  
  const [color, setColor] = useState<string>("#2E958C");

  const dispatch = useAppDispatch();
  function addNewNote() {
    if(name.length > 0 && title.length > 0){
      let date = timeCreater(2);
    let newNote: Istate = {
      important: false,
      name: name,
      title,
      time: date,
      color,
    };
    const json = JSON.stringify(newNote);
    dispatch(addNotes(json));
    props.closeNote(false);
    }
    
  }

  return (
    <>
      <div className={style.flex}>
        <TextField
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          inputProps={{ maxLength: 23 }}
          helperText={name.length === 23 ? 'Максимум 23 символов' : ' '}
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
       
       <ColorPick setColor={setColor} color={color} />

      <ModalBtns addNewNote={addNewNote} closeNote={props.closeNote} />
    </>
  );
}

export default ModalNote;
