import { Credits } from "./credits";
import { Movie } from "./movie";
import { Serie } from "./serie";

export class CastCredits extends Credits
{
    private _character: string;
    private _adult: boolean;

    constructor(public id: number,
                public creditId: string,
                public movie: Movie,
                public serie: Serie,
                public character: string,
                public adult: boolean)
    {
        super(id, creditId, movie, serie);

        this._character = character;
        this._adult = adult;
    }
}
