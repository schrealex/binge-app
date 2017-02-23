import { Genre } from "./genre";
import { Actor } from "./actor";
import { CrewMember } from "./crewmember";
import { MediaInformation } from "./media-information";
import { Image } from "./image";

export class MovieInformation extends MediaInformation
{
    private _releaseDate: Date;
    private _runtime: number;
    private _tagline: string;

    constructor(public id: number,
                public imdbId: number,
                public title: string,
                public originalTitle: string,
                public releaseDate: Date,
                public genres: Genre[],
                public directors: CrewMember[],
                public producers: CrewMember[],
                public writers: CrewMember[],
                public actors: Actor[],
                public runtime: number,
                public posterPath: string,
                public backdropPath: string,
                public posters: Image[],
                public backdrops: Image[],
                public plot: string,
                public tagline: string,
                public rating: number,
                public votes: number,
                public favorite: boolean = false)
    {
        super(id, imdbId, title, originalTitle, genres, directors, producers, writers, actors, posterPath, backdropPath, posters, backdrops, plot, rating, votes, favorite);

        this._releaseDate = releaseDate;
        this._runtime = runtime;
        this._tagline = tagline;
    }
}
