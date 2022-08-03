import { useAppDispatch } from "../../hooks";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { motion, AnimatePresence } from "framer-motion";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import "./noteItem.scss";
import { changeFavorite, deleteNotes } from "../../store/slice/notesSlice";
import { Link } from "react-router-dom";

export type INoteItem = {
  name: string;
  title: string;
  time: number | string;
  important: boolean;
  id: string;
  color: string;
};

const NoteItem = (props: INoteItem) => {
  const { name, title, time, id, important } = props;
  const text = title.length > 260 ? title.slice(0, 248) + "..." : title;
  const color = +important ? "warning" : "inherit";

  const dispatch = useAppDispatch();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "330px", opacity: 1 }}
        className="note"
        style={{ backgroundColor: props.color }}
      >
        <div className="note__first">
          <BookmarkOutlinedIcon
            color={color}
            fontSize="large"
            onClick={async () => {
              let a = { important: !important };
              let b = await JSON.stringify(a);
              console.log("ss");
              dispatch(changeFavorite({ b, id }));
            }}
          ></BookmarkOutlinedIcon>
          <div className="imp">
            <ClearIcon
              fontSize="medium"
              onClick={() => {
                dispatch(deleteNotes(id));
              }}
            ></ClearIcon>
          </div>
        </div>
        <span className="name">{name}</span>

        <div className="text">
          <p>{text}</p>
        </div>
        <div className="line"></div>
        <div className="flex">
          <div className="time">Дата: {time}</div>

          <div className="imp">
            <Link style={{ color: "inherit" }} to={`noteid:${id}`}>
              <OpenInFullIcon fontSize="small" />
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NoteItem;
