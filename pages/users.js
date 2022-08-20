function Users({ data }) {
    console.log(data)
  return (
    <>
      <h2 style={{marginTop:"60px"}}>Hello from users</h2>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const data = await res.json();
  return { props: { data } };
}

export default Users;
