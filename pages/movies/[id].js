import Link from "next/link";
import styles from "../../styles/movie.module.scss";

export default function Movie({ movie }) {
  return (
    <div className={styles.container}>
      <div className={styles.banner_container}>
        <img src={movie.movie_banner} alt={`${movie.title} banner`} />
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{movie.title}</h1>
        <h2 className={styles.director}>Director: {movie.director}</h2>
        <h2 className={styles.release_date}>
          Release Date: {movie.release_date}
        </h2>
        <Link href="/">
          <div className={styles.back_button}>
            <div>BACK</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const resp = await fetch("https://ghibliapi.herokuapp.com/films");
  const movies = await resp.json();

  movies.length = 5;

  const paths = movies.map((movie) => ({
    params: {
      id: movie.id,
    },
  }));
  return {
    fallback: false,
    paths,
  };
}

export async function getStaticProps(context) {
  const resp = await fetch("https://ghibliapi.herokuapp.com/films");
  const movies = await resp.json();

  const selectedMovie = movies.find((movie) => movie.id === context.params.id);

  return {
    props: {
      movie: selectedMovie,
    },
  };
}
