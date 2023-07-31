import User from "./User";
import { UserInteface } from "./User";
import styles from "./UserList.module.scss";

const UserList: React.FC<{ users: UserInteface[] }> = ({ users }) => {
    return (
        <ul className={styles['user-list']}>
            {users.map(user => (
                <User key={user.id} {...user} />
            ))}
        </ul>
    );
};

export default UserList;
