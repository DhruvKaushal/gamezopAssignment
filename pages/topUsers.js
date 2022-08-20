import { useEffect, useState } from "react";
import UserTable from "./components/userTable";

export default function TopUsers() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem("users"));
    console.log(allUsers);
    const topUsersIndex = JSON.parse(localStorage.getItem("topUsers"));
    if (topUsersIndex && allUsers) {
        console.log(topUsersIndex)
      const topUsers = allUsers.filter((top, index) => {
        return topUsersIndex[index];
      });
      setData(topUsers);
      console.log(data)
    }
  }, []);
  return (
    <div style={{ marginTop: "60px" }}>
      <h2 style={{ textAlign: "center" }}>Top Users List</h2>
      {data.length > 0 ? (
        <UserTable data={data} topUser/>
      ) : (
        <h2>No top users available</h2>
      )}
    </div>
  );
}
