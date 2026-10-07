import { Movie } from "./movie";
import { Session } from "./session";

export interface SessionResponse {
    data: MovieSessions[],
    meta: SessionsMeta,
}
export interface SessionsMeta{
    currentPage: number,
    lastPage: number,
    perPage: number,
    totalSessions: number,
    date: string,
}
export interface MovieSessions{
    movie: Movie,
    sessions: SessionWithMovie[],
}
export interface SessionWithMovie extends Session{
    movie: Movie,
}
