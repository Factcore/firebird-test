import { createStore } from "redux";
import { UserInteface } from "../components/User";
import UserList from "../components/UserList";

export interface UsersStateInteface {
    initialUsers: UserInteface[];
    users: UserInteface[];
    filteredUsers: UserInteface[];
    filter: string;
}

type SetAllType = {
    type: "SET_ALL";
    payload: UserInteface[];
};

type RemoveOneType = {
    type: "REMOVE_ONE";
    payload: UserInteface[];
};

type FilterAllType = {
    type: "FILTER_ALL";
    payload: string;
};

type ResetType = {
    type: "RESET";
};

type ActionTypes = SetAllType | RemoveOneType | FilterAllType | ResetType;

const reducerUsers = (
    state: UsersStateInteface = {
        users: [],
        initialUsers: [],
        filteredUsers: [],
        filter: ""
    },
    action: ActionTypes
): UsersStateInteface => {
    switch (action.type) {
        case "SET_ALL":
            return {
                ...state,
                users: action.payload,
                filteredUsers: action.payload,
                initialUsers: action.payload
            };
        case "REMOVE_ONE": {
            const users = state.users.filter(
                user => +user.id !== +action.payload
            );
            const filteredUsers = state.filteredUsers.filter(
                user => +user.id !== +action.payload
            );
            return { ...state, users: users, filteredUsers: filteredUsers };
        }
        case "FILTER_ALL": {
            const filteredUsers = state.users.filter(user => {
                if (action.payload.length === 0)
                    return { ...state, filteredUsers: UserList, filter: "" };
                const allData: string[] = [
                    user.email.toLocaleLowerCase(),
                    user.name.toLocaleLowerCase(),
                    user.username.toLocaleLowerCase()
                ];
                let found = false;
                allData.forEach(field => {
                    if (!found)
                        found = field.includes(
                            action.payload.toLocaleLowerCase()
                        );
                });
                return found;
            });
            return {
                ...state,
                filteredUsers: filteredUsers,
                filter: action.payload
            };
        }
        case "RESET": {
            return {
                ...state,
                filteredUsers: [...state.initialUsers],
                users: [...state.initialUsers],
                filter: ""
            };
        }
        default:
            return { ...state };
    }
};

const store = createStore(reducerUsers);

export default store;
