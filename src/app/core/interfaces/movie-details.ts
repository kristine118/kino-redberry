import { Movie } from './movie';
import { Format } from './format';

export interface MovieDetails extends Movie {
  backdropUrl: string,
  ageRating: AgeRating,
  genres: Genre[],
  formats: Format[],
  synopsis: string,
  director: string,
  cast: string,      
  availableDates: string[],
}
export interface Genre {
  id: number,
  slug: string,
  name: string,
}
export interface AgeRating {
  code: string,     
  minAge: number,   
  description: string,
}
