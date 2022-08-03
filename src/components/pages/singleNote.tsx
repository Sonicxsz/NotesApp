import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import SettingsIcon from "@mui/icons-material/Settings";
import { path } from "../../store/slice/notesSlice";
import { Istate } from "../../store/slice/notesSlice";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import styles from "./singleNote.module.scss";
import { animationDiv } from "../modal/modal";

function SingleNote() {
  const [nameInp, setNameInp] = useState(true);
  const [panel, setPanel] = useState(false);
  const [note, setNote] = useState<Istate>();
  const idNote = useParams().id?.slice(1);
  const refName = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(`${path}/${idNote}`)
      .then((res) => res.json())
      .then((res) => setNote(res));
  }, []);

  if (note) {
    const { title, name, color, important, time } = note;
    const colorS = +important ? "warning" : "inherit";

    return (
      <AnimatePresence>
        <div className={styles.flexX}>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "700px", opacity: 1 }}
            style={{ backgroundColor: color }}
            className={styles.note}
            onClick={() => {
              setNameInp(true);
            }}
          >
            <div className={styles.note__first}>
              <BookmarkOutlinedIcon
                color={colorS}
                fontSize="large"
              ></BookmarkOutlinedIcon>
              <SettingsIcon
                fontSize="large"
                onClick={(e) => {
                  e.stopPropagation();
                  setPanel(!panel);
                  setTimeout(() => {
                    refName.current?.focus();
                  });
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
            <div className={styles.text}>
              <p>{title}</p>
            </div>
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
              настройки
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    );
  } else {
    return null;
  }
}

export default SingleNote;
