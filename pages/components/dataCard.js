import styles from "../../styles/dataCard.module.css";
function DataCard(props) {
  const { body, id, title, userId } = props.item;
  return (
    <div className={styles.dataCardOuters}>
      <h4>Title: {title}</h4>
      <div className={styles.dataCardInner}>
        <h4>UserId: {userId}</h4>
        <h4>ID: {id}</h4>
      </div>
      <p>News: {body}</p>
    </div>
  );
}

export default DataCard;
