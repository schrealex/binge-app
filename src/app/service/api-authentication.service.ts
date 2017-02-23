import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";

import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Rx';
import { ConfigurationService } from "./configuration.service";

const baseUrl = 'https://api.themoviedb.org/3';

const requestTokenUrl = (apiKey) => `${baseUrl}/authentication/token/new?api_key=${apiKey}`;
const validateWithLoginUrl = (apiKey, username, password, requestToken) => `${baseUrl}/authentication/token/validate_with_login?api_key=${apiKey}&username=${username}&password=${password}&request_token=${requestToken}`;
const sessionIdUrl = (apiKey, requestToken) => `${baseUrl}/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`;

@Injectable()
export class ApiAuthenticationService
{
    private apiKey = '';
    private username = '';
    private password = '';

    constructor(private http: Http, private configurationService: ConfigurationService)
    {

    }

    getSessionId(): Observable<any> {
        return this.configurationService.getConfiguration().flatMap(configurationData => {
            this.apiKey = configurationData.apiKey;
            this.username = configurationData.username;
            this.password = configurationData.password;

            console.log('Configuration loaded');
            return this.authenticate();
        });
    }

    authenticate(): Observable<any>
    {
        return this.http.get(requestTokenUrl(this.apiKey)).flatMap(response => {
            if(response.json().success) {
                return this.http.get(validateWithLoginUrl(this.apiKey, this.username, this.password, response.json().request_token)).flatMap(response => {
                    if(response.json().success) {
                        return this.http.get(sessionIdUrl(this.apiKey, response.json().request_token)).map(response => {
                            console.log(response.json());
                            if(response.json().success) {
                                return response.json().session_id;
                            }
                        })
                        .catch(this.handleError);
                    }
                })
                .catch(this.handleError);
            }
        })
        .catch(this.handleError);
    }

    private handleError(error: Response)
    {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
