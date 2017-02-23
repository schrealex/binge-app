import { Movie } from "./movie";
import { Serie } from "./serie";

export class Credits
{
    private _id: number;
    private _creditId: string;
    private _movie: Movie;
    private _serie: Serie;

    constructor(public id: number,
                public creditId: string,
                public movie: Movie,
                public serie: Serie)
    {
        this._id = id;
        this._creditId = creditId;
        this._movie = movie;
        this._serie = serie;
    }
}
