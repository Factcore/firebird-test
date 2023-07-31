import styles from "./Filter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Button from "./UI/Button";
import { UsersStateInteface } from "../store/store";
import React from "react";

const Filter = () => {
    const filterValue = useSelector(
        (state: UsersStateInteface) => state.filter
    );
    const dispatch = useDispatch();

    const filterHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: "FILTER_ALL", payload: event.target.value });
    };

    const resetHandler = () => {
        dispatch({ type: "RESET" });
    };

    return (
        <div className={styles.filter}>
            <div className={styles.name}>Keyword:</div>
            <div className={styles.field}>
                <input
                    name="search"
                    type="text"
                    id="search"
                    onChange={filterHandler}
                    value={filterValue}
                />
            </div>
            <div className={styles.actions}>
                <Button
                    onClick={resetHandler}
                    className={styles["filter-button"]}
                >
                    Reset
                </Button>
            </div>
        </div>
    );
};

export default Filter;
