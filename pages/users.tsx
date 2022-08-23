import UserTable from "./components/userTable";
import styles from "../styles/global.module.css";
import { userProps } from "./constants/user.constants";

function Users({ data }: userProps) {
  return (
    <div className={styles.componentWrapper}>
      <h2 style={{ textAlign: "center" }}>Users List</h2>
      <UserTable data={data} />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const data = await res.json();
  return { props: { data } };
}

export default Users;
