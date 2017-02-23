export class Configuration
{
    private _enviroment: string;
    private _apiKey: string;
    private _username: string;
    private _password: string;

    constructor(public enviroment: string,
                public apiKey: string,
                public username: string,
                public password: string)
    {
        this._enviroment = enviroment;
        this._apiKey = apiKey;
        this._username = username;
        this._password = password;
    }
}
