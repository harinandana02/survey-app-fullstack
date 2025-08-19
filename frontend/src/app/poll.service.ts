import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Poll } from './poll.models';
import { Observable } from 'rxjs';
import { environment } from '../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  private baseUrl = environment.backendUrl + '/api/polls'
  constructor(private http: HttpClient) {

  }

  createPoll(poll: Poll): Observable<Poll>{
    return this.http.post<Poll>(this.baseUrl, poll);
  }

  getPolls(): Observable<Poll[]>{
    return this.http.get<Poll[]>(this.baseUrl);
  }

  vote(pollId: number, optionIndex: number): Observable<void>{
    return this.http.post<void>(`${this.baseUrl}/vote`, {pollId, optionIndex})
  }

}
