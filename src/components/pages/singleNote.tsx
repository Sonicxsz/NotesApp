import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import SettingsIcon from "@mui/icons-material/Settings";
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { changeFavorite, path } from "../../store/slice/notesSlice";
import { Istate } from "../../store/slice/notesSlice";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import styles from "./singleNote.module.scss";
import { useAppDispatch } from "../../hooks";
import {noteSelecColors} from '../modal/modalNote'
function SingleNote() {
  const [nameInp, setNameInp] = useState(true);//измениение текста имени
  const [textInp, setTextInp] = useState(true); // изменение основного текста
  const [openColorPanel, setOpenColorPanel] = useState(false) // открыть настройки цвета
  const [colorPanel, setColorPanel] = useState(noteSelecColors) //Цвета на выбор
  const [colorPicker, setColorPicker] = useState(true); // активность значка цвета
  const [panel, setPanel] = useState(false); // открытие панели настроек
  const [oldNote, setOldNote] = useState<Istate>(); // копия оригинального объекта
  const [note, setNote] = useState<Istate>(); // отображаемый объект который можно менять
  const idNote = useParams().id?.slice(1); // id для запроса заметки 


  const refName = useRef<HTMLInputElement>(null); // ссылка на инпут для фокуса
  const refText = useRef<HTMLTextAreaElement>(null);// ссылка на инпут текста для фокуса
  
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch(`${path}/${idNote}`)
      .then((res) => res.json())
      .then((res) => {
        setOldNote(res);
        setNote(res);
      });
  }, []); //Запрос на получение заметки при монтирование 

  if (note) {
    const { title, name, color, important, time, id } = note; //деструктуризация заметки 
    const colorS = +important ? "warning" : "inherit";
    const colorName = !nameInp ? "secondary" : "inherit";
    const colorTextarea = !textInp ? "secondary" : "inherit";
    const colorPickerColor = !colorPicker ? 'secondary' : 'inherit';
    const success =
      oldNote?.name == note?.name && oldNote.title == note.title && oldNote.color == note?.color
        ? "inherit"
        : "success";

    return (
      <AnimatePresence>
        <div className={styles.flexX}>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "700px", opacity: 1 }}
            style={{ backgroundColor: color }}
            className={styles.note}
          >
            <div className={styles.note__first}>
              <BookmarkOutlinedIcon
                onClick={async () => {
                  const b = await JSON.stringify({ important: !important });
                  dispatch(changeFavorite({ b, id }));
                  setNote({ ...note, important: !important });
                }}
                color={colorS}
                fontSize="large"
              ></BookmarkOutlinedIcon>
              <SettingsIcon
                fontSize="large"
                onClick={(e) => {
                  e.stopPropagation();
                  setPanel(!panel);
                  
                  if(panel == true){
                    setOpenColorPanel(false);
                    setColorPicker(true);
                    setNameInp(true);
                    setTextInp(true);
                  }
                }}
                className={styles.edit_btn}
              />
            </div>

            <span className={styles.name}>
              <input
                onChange={(e) => {
                  setNote({ ...note, name: e.target.value });
                }}
                ref={refName}
                disabled={nameInp}
                type="text"
                value={name}
                className={styles.inputChange}
              ></input>
            </span>
            <div className={styles.line}></div>
            <textarea
              onChange={(e) => {
                setNote({ ...note, title: e.target.value });
              }}
              ref={refText}
              disabled={textInp}
              className={styles.text}
              value={title}
            ></textarea>

            <div className={styles.line}></div>
            <div className={styles.flex}>
              <div className={styles.time}>Дата: {time}</div>

              <div
                className={styles.imp}
                onClick={() => {
                  setPanel(false);
                }}
              >
                <Link style={{ color: "inherit" }} to={`/`}>
                  <OpenInFullIcon fontSize="small" />
                </Link>
              </div>
            </div>
          </motion.div>
          {panel && (
            <motion.div
              className={styles.panel}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "700px", opacity: 1 }}
            >
               <div
              className={styles.impSettings}
              style={{marginTop: "15px"}}
              onClick={() =>{
                setColorPicker(!colorPicker)
                setOpenColorPanel(!openColorPanel)
              }}
              >
              <ColorLensIcon color={colorPickerColor} fontSize="large" />
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setNameInp(!nameInp);
                  setTimeout(() => {
                    refName.current?.focus();
                  });
                  if(textInp == false){
                    setTextInp(!textInp);
                  }
                }}
                className={styles.impSettings}
                style={{ marginTop: "35px", marginBottom: "200px" }}
              >
                <BorderColorIcon color={colorName} />
              </div>
              <div
                className={styles.impSettings}
                style={{ marginBottom: "275px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setTextInp(!textInp);
                  setTimeout(() => {
                    refText.current?.focus();
                  });
                  if(nameInp == false){
                    setNameInp(!nameInp);
                  }
                }}
              >
                
                <BorderColorIcon color={colorTextarea} />
              </div>
             
              <div className={styles.impSettings}>
                <SaveAsIcon fontSize="large" color={success} />
              </div>
            </motion.div>
          )}

          { openColorPanel &&  <motion.div
              className={styles.panel}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "700px", opacity: 1 }}
            >
              {colorPanel.map((i) => {
                let clazz =
                  i.name === color ? `${styles.colorPick}` : `${styles.color}`;
                return (
                  <div
                    onClick={() => {
                      setNote({...note, color: i.name})
                    }}
                    key={i.id}
                    className={clazz}
                    style={{ backgroundColor: i.name }}
                  ></div>
                );
        })}


            </motion.div>

          }
        </div>
      </AnimatePresence>
    );
  } else {
    return null;
  }
}

export default SingleNote;



/// Оптимизировать клики на иконки