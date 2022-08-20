import DataCard from "./components/dataCard";
import styles from "../styles/news.module.css"
function News({ data }) {
  return (
      <div className={styles.newsContainer}>
      <br></br>
      {data.map((item) => (
        <DataCard key={item.id} item={item}/>
      ))}
      </div>
  )
}

export async function getStaticProps() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();
  return { props: { data } };
}

export default News;
