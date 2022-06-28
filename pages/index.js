import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

export default function Home({ movies }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Umi Movies App</title>
      </Head>
      {movies.map((movie) => (
        <div className={styles.movie_container} key={movie.id}>
          <div className={styles.image_container}>
            <img src={movie.image} />
          </div>
          <div className={styles.info_container}>
            <div className={styles.title}>{movie.title}</div>
            <div className={styles.description}>{movie.description}</div>
            <Link href={`/movies/${movie.id}`}>
              <div className={styles.more_button}>
                <div>MORE</div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const resp = await fetch("https://ghibliapi.herokuapp.com/films");
  const movies = await resp.json();

  movies.length = 5;

  return {
    props: {
      movies: movies,
    },
  };
}
