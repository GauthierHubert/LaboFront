import { group } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { groupBy, map, mergeMap, Observable, reduce, toArray } from 'rxjs';
import { Difficulty } from '../models/difficulty';
import { Type } from '../models/type';

@Injectable({
  providedIn: 'root'
})
export class DifficultyService implements OnInit {

  readonly URL : string = "http://localhost:8080"
  public difficulties !: Observable<Set<Difficulty>>;


  constructor(private _http : HttpClient) { }

  ngOnInit(): void {

  }

  get $mappedDifficulties(): Observable<Map<String, Set<Difficulty>>> {
    return this._http.get<Set<Difficulty>>(this.URL + "/difficulty/all").pipe(
      map((set) => {
        const mapped = new Map<String, Set<Difficulty>>();
        set.forEach((difficulty) => {
          if(mapped.has(difficulty.type.name)) {
            mapped.get(difficulty.type.name)?.add(difficulty);
          }else{
            mapped.set(difficulty.type.name, new Set<Difficulty>());
            mapped.get(difficulty.type.name)?.add(difficulty)
          }
        });
        return mapped;
      })
    );
  }
}
