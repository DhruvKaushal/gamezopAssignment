import styles from '../styles/global.module.css';

//Home page for the application. User can choose to navigate from the navbar
export default function Home() {
  const centeredHeading = {
    textAlign:"center"
  }
  return (
    <div className={styles.componentWrapper}>
      <h1 style={centeredHeading}>Welcome to the gamezop Assignment</h1>
      <h3 style={centeredHeading}>Choose options from navbars to navigate</h3>
    </div>
  );
}
