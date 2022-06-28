export default function Movie({ movie }) {
  return <div>{movie.title}</div>;
}

export async function getServerSideProps(context) {
  const resp = await fetch("https://ghibliapi.herokuapp.com/films");
  const movies = await resp.json();

  const selectedMovie = movies.find((movie) => movie.id === context.params.id);
  console.log(context.params.id);
  console.log(selectedMovie.id);

  return {
    props: {
      movie: selectedMovie,
    },
  };
}
