import UserTable from './components/userTable';

function Users({ data }) {
  return (
    <div style={{ marginTop: "60px" }}>
      <h2 style={{ textAlign: "center" }}>Users List</h2>
      <UserTable data={data}/>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const data = await res.json();
  return { props: { data } };
}

export default Users;
