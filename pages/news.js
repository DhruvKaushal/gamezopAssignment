function News({ data }) {
  return <p>Hello from news</p>;
}

export async function getStaticProps() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();
  return { props: { data } };
}

export default News;
