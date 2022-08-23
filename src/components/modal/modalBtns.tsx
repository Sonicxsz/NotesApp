import { Button } from "@mui/material";
import style from "./modal.module.scss";

interface btnProps {
  addNew?: () => void;
  closeNote?: (arg: boolean) => void;
}

function ModalBtns(props: btnProps) {
  return (
    <>
      <div className={style.btns}>
        <Button
          onClick={() => {
            if (props.closeNote)
            props.closeNote(false);
          }}
          variant="outlined"
          color="error"
        >
          Отменить
        </Button>
        <Button onClick={props.addNew} variant="contained" color="success">
          Добавить
        </Button>
      </div>
    </>
  );
}

export default ModalBtns;
