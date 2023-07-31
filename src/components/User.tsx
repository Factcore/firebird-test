import styles from "./User.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Button from "./UI/Button";
import { useState } from "react";
import { UsersStateInteface } from "../store/store";
import Modal from "./UI/Modal";

export interface UserInteface {
    id: string | number;
    name: string;
    username: string;
    email: string;
    address?: {
        street: string,
        suite: string,
        city: string,
        zipcode: string | number,
        geo: {
            lat: string | number,
            lng: string | number
        }
    },
    company?: {
        name: string,
        catchPhrase: string,
        bs: string
    }
}

const User: React.FC<UserInteface> = (props) => {
    const filterValue = useSelector(
        (state: UsersStateInteface) => state.filter
    );
    const [showModal, setShowModal] = useState<boolean>(false);
    const dispatch = useDispatch();
    const removeHandler = () => {
        dispatch({ type: "REMOVE_ONE", payload: props.id });
    };
    const detailHandler = () => {
        setShowModal(true);
    };
    const closeDetailHandler = () => {
        setShowModal(false);
    };
    const filter = (value: string) => {
        if (!filterValue) return value;
        const reg = new RegExp(`(${filterValue})`, "gi");
        const parts = value.split(reg);
        return parts.map((part, key) => {
            if (part.toLocaleLowerCase() === filterValue.toLocaleLowerCase())
                return <mark key={key}>{part}</mark>;
            return part;
        });
    };
    return (
        <>
            {showModal && (
                <Modal onClose={closeDetailHandler} title={props.name}>
                    Address: <b>
                    {`${props.address?.city}, ${props.address?.street}, ${props.address?.suite}, ${props.address?.zipcode}`}
                    </b>
                    <br />
                    Zip: <b>{`${props.address?.geo.lat}, ${props.address?.geo.lng}`}</b> 
                    <hr />
                    Company: <b>{props.company?.name}</b>
                    <br />
                    <i>„{props.company?.catchPhrase}“</i>
                    <br />
                    Keywords: {props.company?.bs.split(' ').join(', ')}
                </Modal>
            )}
            <li className={styles.user} onClick={detailHandler}>
                <div className={styles.info}>
                    Name: <b>{filter(props.name)}</b>
                    <br />
                    Username: <b>{filter(props.username)}</b> - Email:{" "}
                    <b>{filter(props.email)}</b>
                </div>
                <div className={styles.actions}>
                    <Button
                        className={styles["remove-button"]}
                        onClick={removeHandler}
                    >
                        Remove
                    </Button>
                </div>
            </li>
        </>
    );
};

export default User;
