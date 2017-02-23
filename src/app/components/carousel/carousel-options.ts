export class CarouselOptions
{
    private _id: string;
    private _navigation: boolean;
    private _height: number;
    private _width: number;
    private _imageWidth: string;
    private _imageHeight: string;

    constructor(public id: string,
                public navigation: boolean,
                public height: number,
                public width: number,
                public imageWidth: string,
                public imageHeight: string)
    {
        this._id = id;
        this._navigation = navigation;
        this._height = height;
        this._width = width;
        this._imageWidth = imageWidth;
        this._imageHeight = imageHeight;
    }
}
