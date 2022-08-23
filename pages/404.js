import styles from '../styles/global.module.css';
export default function PageNotFound(){
    return (
        <div className={styles.componentWrapper}>
            <h2 className={styles.errorComp}>404 Page not found</h2>
        </div>
    )
}