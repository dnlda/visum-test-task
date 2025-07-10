import { PostList } from "@/components/Post/PostList";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <PostList />
      </main>
    </div>
  );
}
