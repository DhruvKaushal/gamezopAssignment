import DataCard from "./components/dataCard";
import styles from "../styles/news.module.css";
import { userProps } from "./constants/user.constants";

function News({ data }: userProps) {
  return (
    <div className={styles.componentWrapper}>
      <h2 style={{ textAlign: "center" }}>News feed</h2>
      <div className={styles.newsContainer}>
        {data.map((item) => (
          <DataCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();
  return { props: { data } };
}

export default News;
