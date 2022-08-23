import { ButtonProps } from "./Button.Props";
import styles from './Button.module.scss'


export const MiniButton = ({children, ...props}:ButtonProps):JSX.Element => {
    return (
        <button className={styles.imp} {...props} >
            {children}
        </button>
    )
}