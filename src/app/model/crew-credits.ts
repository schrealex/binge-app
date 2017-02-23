import { Credits } from "./credits";
import { Movie } from "./movie";
import { Serie } from "./serie";

export class CrewCredits extends Credits
{
    private _department: string;
    private _job: string;

    constructor(public id: number,
                public creditId: string,
                public movie: Movie,
                public serie: Serie,
                public department: string,
                public job: string)
    {
        super(id, creditId, movie, serie);

        this._department = department;
        this._job = job;
    }
}
