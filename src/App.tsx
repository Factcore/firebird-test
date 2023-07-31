import { useCallback, useEffect } from "react";
import UserList from "./components/UserList";
import useLoading from "./hooks/useLoading";
import { UserInteface } from "./components/User";
import { UsersStateInteface } from "./store/store";
import { useDispatch, useSelector } from "react-redux";
import styles from "./App.module.scss";
import Filter from "./components/Filter";

const url = "https://jsonplaceholder.typicode.com/users";

function App() {
    const filteredUsers = useSelector(
        (state: UsersStateInteface) => state.filteredUsers
    );
    const dispatch = useDispatch();
    const [state, dispatchUsers, error] = useLoading(
        url,
        useCallback(
            (data: UserInteface[]) => {
                dispatch({ type: "SET_ALL", payload: data });
            },
            [dispatch]
        )
    );

    useEffect(() => {
        dispatchUsers();
    }, [dispatchUsers]);

    let app =
        state === "error" ? (
            <div className={styles.error}>{error.message}</div>
        ) : state === "loading" ? (
            <div className={styles.loading}>Loading...</div>
        ) : (
            <>
                <Filter />
                <UserList users={filteredUsers} />
            </>
        );

    return <div className={styles.app}>{app}</div>;
}

export default App;
