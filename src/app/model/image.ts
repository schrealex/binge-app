export class Image
{
    private _aspectRatio: number;
    private _width: number;
    private _height: number;
    private _filePath: string;

    constructor(public aspectRatio: number, public width: number, public height: number, public filePath: string)
    {
        this._aspectRatio = aspectRatio;
        this._width = width;
        this._height = height;
        this._filePath = filePath;
    }
}
