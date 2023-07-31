import styles from "./Modal.module.scss";
import React from "react";
import ReactDOM from "react-dom";

const Modal: React.FC<{
    onClose: () => void;
    children: React.ReactNode;
    title: string;
}> = ({ onClose, children, title }) => {

    const closeHandler = (event : React.MouseEvent<HTMLDivElement>) => {
        if(event.currentTarget === event.target)
            onClose();
    };

    return ReactDOM.createPortal(
        <div className={styles.backdrop} onClick={closeHandler}>
            <dialog open className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <h3>{title}</h3>
                    </div>
                    <div className={styles.close} onClick={closeHandler}>
                        ✖
                    </div>
                </div>
                <div className={styles.body}>{children}</div>
            </dialog>
        </div>,
        document.getElementById("backdrop-root")!
    );
};

export default Modal;
