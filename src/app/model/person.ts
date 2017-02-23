import { Image } from "./image";
import { CrewCredits } from "./crew-credits";
import { CastCredits } from "./cast-credits";

export class Person
{
    private _id: number;
    private _imdbId: string;
    private _facebookId: string;
    private _twitterId: string;
    private _creditId: string;
    private _name: string;
    private _profilePath: string;
    private _profiles: Image[];
    private _castCredits: CastCredits[];
    private _crewCredits: CrewCredits[];

    constructor(public id: number,
                public imdbId: string,
                public facebookId: string,
                public twitterId: string,
                public creditId: string,
                public name: string,
                public profilePath: string,
                public profiles: Image[],
                public castCredits: CastCredits[],
                public crewCredits: CrewCredits[])
    {
        this._id = id;
        this._imdbId = imdbId;
        this._facebookId = facebookId;
        this._twitterId = twitterId;
        this._creditId = creditId;
        this._name = name;
        this._profilePath = profilePath;
        this._profiles = profiles;
        this._castCredits = castCredits;
        this._crewCredits = crewCredits;
    }
}
