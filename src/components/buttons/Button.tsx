import { ButtonProps } from "./Button.Props";
import styles from './Button.module.scss'


export const MiniButton = ({children, ...props}:ButtonProps):JSX.Element => {
    return (
        <div className={styles.imp} {...props} >
            {children}
        </div>
    )
}