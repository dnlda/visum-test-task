import Image from "next/image";
import styles from "./page.module.css";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function truncate(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export default async function Home() {
  let data = await fetch("https://jsonplaceholder.typicode.com/posts");
  let posts = await data.json();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          {posts.map((post: IPost) => (
            <div key={post.id} className={styles.ctas}>
              <li>
                <div> {post.title}</div>
                <div> {truncate(post.body, 100)}</div>
                <a className={styles.secondary} href={`/post/${post.id}`}>
                  Просмотр
                </a>
              </li>
            </div>
          ))}
        </ol>
      </main>
    </div>
  );
}
