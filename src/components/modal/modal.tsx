import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";
import style from "./modal.module.scss";
import ModalNote from "./modalNote";
import { motion } from "framer-motion";

export const animationDiv = {
  hidden: {
    y: 180,
    opacity: 0.4,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

interface Imodal {
  closeNote: (value: boolean) => void;
}

const Modal = (props: Imodal) => {
  const [mode, setMode] = useState<string>("1");

  return (
    <div className={style.dark}>
      <motion.div
        variants={animationDiv}
        initial="hidden"
        whileInView="visible"
        className={style.wrap}
      >
        <ToggleButtonGroup
          color="primary"
          exclusive
          value={mode}
          size="small"
          fullWidth
          style={{ maxWidth: "100px", maxHeight: "25px", margin: "10px 30% 0" }}
        >
          <ToggleButton
            value="1"
            color="success"
            onClick={() => {
              setMode("1");
            }}
            size="medium"
          >
            Note
          </ToggleButton>
          <ToggleButton
            onClick={() => {
              setMode("2");
            }}
            color="success"
            size="medium"
            value="2"
          >
            List
          </ToggleButton>
        </ToggleButtonGroup>
        {mode === "1" ? <ModalNote closeNote={props.closeNote} /> : null}
      </motion.div>
    </div>
  );
};

export default Modal;
