export interface TMDBMovieResult {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string | undefined;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  vote_average: number;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  adult: boolean;
  video: boolean;
}