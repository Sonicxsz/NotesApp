import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import SettingsIcon from "@mui/icons-material/Settings";
import { changeFavorite, path } from "../../store/slice/notesSlice";
import { Istate } from "../../store/slice/notesSlice";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import styles from "./singleNote.module.scss";
import { useAppDispatch } from "../../hooks";

function SingleNote() {
  const [nameInp, setNameInp] = useState(true);
  const [textInp, setTextInp] = useState(true);
  const [panel, setPanel] = useState(false);
  const [oldNote, setOldNote] = useState<Istate>();
  const [note, setNote] = useState<Istate>();
  const idNote = useParams().id?.slice(1);
  const refName = useRef<HTMLInputElement>(null);
  const refText = useRef<HTMLTextAreaElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch(`${path}/${idNote}`)
      .then((res) => res.json())
      .then((res) => {
        setOldNote(res);
        setNote(res);
      });
  }, []);

  if (note) {
    const { title, name, color, important, time, id } = note;
    const colorS = +important ? "warning" : "inherit";
    const colorName = !nameInp ? "secondary" : "inherit";
    const colorTextarea = !textInp ? "secondary" : "inherit";
    const success =
      oldNote?.name == note?.name && oldNote.title == note.title
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
                onClick={(e) => {
                  e.stopPropagation();
                  setNameInp(!nameInp);
                  setTimeout(() => {
                    refName.current?.focus();
                  });
                }}
                className={styles.impSettings}
                style={{ marginTop: "75px", marginBottom: "200px" }}
              >
                <BorderColorIcon color={colorName} />
              </div>
              <div
                className={styles.impSettings}
                style={{ marginBottom: "285px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setTextInp(!textInp);
                  setTimeout(() => {
                    refText.current?.focus();
                  });
                }}
              >
                <BorderColorIcon color={colorTextarea} />
              </div>
              <div className={styles.impSettings}>
                <SaveAsIcon fontSize="large" color={success} />
              </div>
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
