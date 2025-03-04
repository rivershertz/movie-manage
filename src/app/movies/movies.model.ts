export type Movie = {
  id: string;
  movie_id: number;
  original_title: string;
  original_language: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  adult: 0 | 1;
  duration: number;
};
