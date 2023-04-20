import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {

  constructor(private http: HttpClient) { }

  getCharacters(params: any) {
    return this.http.get(environment.url, { params })
  }

  getCharacterId(id: string) {
    return this.http.get(environment.url + id)
  }

  getEpisode(url: string) {
    return this.http.get(url)
  }
}
