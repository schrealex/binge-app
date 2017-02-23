import { Genre } from "./genre";
import { Media } from "./media";

export class Serie extends Media
{
    private _airDate: Date;
    private _episodeCount: number;

    constructor(public id: number,
                public title: string,
                public originalTitle: string,
                public airDate: Date,
                public posterPath: string,
                public backdropPath: string,
                public plot: string,
                public episodeCount: number,
                public genres: Genre[],
                public rating: number,
                public votes: number,
                public favorite: boolean = false)
    {
        super(id, title, originalTitle, posterPath, backdropPath, plot, genres, rating, votes, favorite);

        this._airDate = airDate;
        this._episodeCount = episodeCount;
    }
}
