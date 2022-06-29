import { MovieData } from "../modals/MovieData";
import { ResponseMovieData } from "../modals/ResponseMovieData";

const BASE_URL = "https://www.omdbapi.com/?apikey=";
const NOT_APPLICABLE = "N/A";

const omdbRequest = async (path: string) => {
  return await fetch(BASE_URL + process.env.REACT_APP_OMDB_API_KEY + path).then(
    (response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Server response wasn't OK");
      }
    }
  );
};

export const getMovies = async (searchKeyword: string, page: number = 1) => {
  const path = "&s=" + searchKeyword + "&type=movie&page=" + page;
  return omdbRequest(path);
};

export const getMovieDetail = async (moviedId: string) => {
  const path = "&i=" + moviedId;
  const movieDetail = (await omdbRequest(path)) as unknown as ResponseMovieData;
  const {
    Actors,
    Awards,
    Country,
    Director,
    Genre,
    Language,
    Plot,
    Poster,
    Released,
    Runtime,
    Title,
    Writer,
    Year,
    imdbRating,
    imdbVotes,
  } = movieDetail;
  return {
    actors: Actors,
    awards: Awards !== NOT_APPLICABLE ? Awards : "",
    country: Country !== NOT_APPLICABLE ? Country : "",
    director: Director,
    genre: Genre,
    language: Language,
    plot: Plot,
    poster: Poster !== NOT_APPLICABLE ? Poster : "",
    released: Released !== NOT_APPLICABLE ? Released : "",
    runtime: Runtime !== NOT_APPLICABLE ? Runtime : "",
    title: Title,
    writer: Writer,
    year: Year !== NOT_APPLICABLE ? Year : "",
    imdbRating: imdbRating !== NOT_APPLICABLE ? imdbRating : "",
    imdbVotes: imdbVotes !== NOT_APPLICABLE ? imdbVotes : "",
  } as MovieData;
};
