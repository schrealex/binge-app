import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";

import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Rx';
import { Configuration } from "../model/configuration";

@Injectable()
export class ConfigurationService
{
    constructor(private http: Http)
    {

    }

    getConfiguration(): Observable<Configuration> {
        let configuration : Configuration;
        return this.http.get('app/configuration.json').map(response => {
            let result = response.json();
            result.forEach(c => {
                if(c.enviroment == 'development') {
                    configuration = new Configuration(c.enviroment, c.apiKey, c.username, c.password);
                }
            });
            return configuration;
        }).catch(this.handleError);
    }

    private handleError(error: Response)
    {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
