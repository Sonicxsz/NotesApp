import { useAppDispatch } from "../../hooks";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { motion, AnimatePresence } from "framer-motion";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {timeReamning} from '../../utils/timer'
import RedoIcon from '@mui/icons-material/Redo';
import "./noteItem.scss";
import { changeFavorite, recentlyDelete, deleteNotes } from "../../store/slice/notesSlice";
import { Link } from "react-router-dom";


export type INoteItem = {
  name: string;
  title: string;
  time: number | string;
  important: boolean;
  _id: string;
  delete:boolean;
  color: string;
  removeTime: string;
  setSearchOpen?: (arg: boolean) => void;
};

const NoteItem = (props: INoteItem) => {
  const { name, title, time, _id, important, removeTime} = props;
  const deleteTime = new Date(+removeTime).toDateString().slice(3)
  const color = +important ? "warning" : "inherit";
  const dispatch = useAppDispatch();
  const deleted = props.delete ? {backgroundColor: props.color,
                                  boxShadow: '0px 0px 15px yellow'} : { backgroundColor: props.color } 
  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "330px", opacity: 1 }}
        className="note"
        style={deleted}
      >
        <div className="note__first">
          {!props.delete ? <>
            <BookmarkOutlinedIcon
            color={color}
            fontSize="large"
            onClick={async () => {
              const b = await JSON.stringify({ important: !important });
              dispatch(changeFavorite({ b, _id }));
            }}
          ></BookmarkOutlinedIcon>
          <div className="imp">
            <ClearIcon
              fontSize="medium"
              onClick={ async () => {
                let removeTime = timeReamning()
                const b = await JSON.stringify({removeNote:true, removeTime})
                dispatch(recentlyDelete({_id, b}));
              }}
            ></ClearIcon>
          </div>
          </> : <>
            <div className="imp">
            <DeleteOutlineIcon
            fontSize="medium"
            onClick={async () => {
              dispatch(deleteNotes(_id))
            }}
          ></DeleteOutlineIcon>
            </div>
          <div className="imp">
            <RedoIcon
              fontSize="medium"
              onClick={ async () => {
                const b = await JSON.stringify({remove:false, removeTime:0})
                dispatch(recentlyDelete({_id, b}));
              }}
            ></RedoIcon>
          </div>
          </>}
        </div>
        <span className="name">{name}</span>

        <div className="text">
          <p>
            {title}
          </p>
        </div>
        <div className="line">

        </div>
        <div className="flex">
          <div className="time">
            {
              props.delete ? <><span style={{color:"yellow"}}>Будет удален</span>:{deleteTime}</> :  `Дата: ${time}`
            }
           
          </div>

          <Link style={{ color: "inherit" }} to={`noteid:${_id}`}>
            {!props.delete && <div
              className="imp"
              onClick={() => {
                if(props.setSearchOpen)
                props.setSearchOpen(false);
              }}
            >
              <OpenInFullIcon fontSize="small" />
            </div>}
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NoteItem;
