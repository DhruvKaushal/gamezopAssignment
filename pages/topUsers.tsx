import { useEffect, useState } from "react";
import UserTable from "./components/userTable";
import styles from '../styles/global.module.css';

export default function TopUsers() {
  const [data, setData] = useState([]);
  /* Get the boolean array indicating top user state from localstorage. 
  Corresponding to 'true', select user from data. All user data is also stored in storage for ease of use */ 
  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem("users"));
    const topUsersIndex = JSON.parse(localStorage.getItem("topUsers"));
    if (topUsersIndex && allUsers) {
      const topUsers = allUsers.filter((top, index) => {
        return topUsersIndex[index];
      });
      setData(topUsers);
    }
  }, []);

  return (
    <div className={styles.componentWrapper}>
      <h2 style={{ textAlign: "center" }}>Top Users List</h2>
      {data.length > 0 ? (
        <UserTable data={data} topUser/>
      ) : (
        <h2>No top users available</h2>
      )}
    </div>
  );
}
