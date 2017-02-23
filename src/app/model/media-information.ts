import { Actor } from "./actor";
import { CrewMember } from "./crewmember";
import { Genre } from "./genre";
import { Image } from "./image";

export class MediaInformation
{
    private _id: number;
    private _imdbId: number;
    private _title: string;
    private _originalTitle: string;
    private _genres: Genre[];
    private _directors: CrewMember[];
    private _producers: CrewMember[];
    private _writers: CrewMember[];
    private _actors: Actor[];
    private _posterPath: string;
    private _backdropPath: string;
    private _posters: Image[];
    private _backdrops: Image[];
    private _plot: string;
    private _rating: number;
    private _votes: number;
    private _favorite: boolean;

    constructor(public id: number,
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
                public favorite: boolean = false)
    {
        this._id = id;
        this._imdbId = imdbId;
        this._title = title;
        this._originalTitle = originalTitle;
        this._genres = genres;
        this._directors = directors;
        this._producers = producers;
        this._writers = writers;
        this._actors = actors;
        this._posterPath = posterPath;
        this._backdropPath = backdropPath;
        this._posters = posters;
        this._backdrops = backdrops;
        this._plot = plot;
        this._rating = rating;
        this._votes = votes;
        this._favorite = favorite;
    }
}
