import { MediaInformation } from "./media-information";
import { Actor } from "./actor";
import { CrewMember } from "./crewmember";
import { Genre } from "./genre";
import { Image } from "./image";

export class SerieInformation extends MediaInformation
{
    private _inProduction: boolean;
    private _createdBy: any[];
    private _networks: any[];
    private _numberOfEpisodes: number;
    private _numberOfSeasons: number;
    private _seasons: any[];
    private _episodeRuntime: number[];
    private _firstAirDate: Date;
    private _lastAirDate: Date;
    private _status: string;
    private _type: string;

    constructor(
                public id: number,
                public imdbId: number,
                public title: string,
                public originalTitle: string,
                public genres: Genre[],
                public directors: CrewMember[],
                public producers: CrewMember[],
                public writers: CrewMember[],
                public actors: Actor[],
                public posterPath: string,
                public backdropPath: string,
                public posters: Image[],
                public backdrops: Image[],
                public plot: string,
                public rating: number,
                public votes: number,
                public favorite: boolean = false,
                public inProduction: boolean,
                public createdBy: any[],
                public networks: any[],
                public numberOfEpisodes: number,
                public numberOfSeasons: number,
                public seasons: any[],
                public episodeRuntime: number[],
                public firstAirDate: Date,
                public lastAirDate: Date,
                public status: string,
                public type: string)
    {
        super(id, imdbId, title, originalTitle, genres, directors, producers, writers, actors, posterPath, backdropPath, posters, backdrops, plot, rating, votes, favorite);

        this._inProduction = inProduction;
        this._createdBy = createdBy;
        this._networks = networks;
        this._numberOfEpisodes = numberOfEpisodes;
        this._numberOfSeasons = numberOfSeasons;
        this._seasons = seasons;
        this._episodeRuntime = episodeRuntime;
        this._firstAirDate = firstAirDate;
        this._lastAirDate = lastAirDate;
        this._status = status;
        this._type = type;
    }
}
