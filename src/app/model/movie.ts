import { Media } from "./media";
import { Genre } from "./genre";

export class Movie extends Media
{
    private _releaseDate: Date;

    constructor(public id: number,
                public title: string,
                public originalTitle: string,
                public releaseDate: Date,
                public posterPath: string,
                public backdropPath: string,
                public plot: string,
                public genres: Genre[],
                public rating: number,
                public votes: number,
                public favorite: boolean = false)
    {
        super(id, title, originalTitle, posterPath, backdropPath, plot, genres, rating, votes, favorite);

        this._releaseDate = releaseDate;
    }
}
