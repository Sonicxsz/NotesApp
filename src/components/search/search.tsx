import "./search.scss";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { changeFilter } from "../../store/slice/notesSlice";
import { TextField } from "@mui/material";
import { animationDiv } from "../modal/modal";
import { useEffect, useRef } from "react";

function Search(props: any) {
  const filter = useAppSelector((state) => state.notesSlice.filter);
  const dispatch = useAppDispatch();
  const refInp = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.searchOpen) {
      refInp.current?.focus();
    }
  }, []);
  return (
    <div className="transorm">
      <motion.div
        variants={animationDiv}
        initial="hidden"
        whileInView="visible"
        className="searchWrap"
        tabIndex={1}
      >
        <div tabIndex={1} className="blur">
          <div className="search">
            <span>Search</span>
            <input
              ref={refInp}
              className="seacrhInput"
              onChange={(e) => {
                dispatch(changeFilter(e.target.value));
              }}
              value={filter}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Search;
