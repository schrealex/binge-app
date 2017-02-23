export class Genre
{
    private _id: number;
    private _description: string;

    constructor(public id: number,
                public description: string)
    {
        this._id = id;
        this._description = description;
    }
}
