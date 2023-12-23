import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public getItem(key: string): any {
    // @ts-ignore
    return JSON.parse(localStorage.getItem(key));
  }

  public setItem(key: string, obj: any) {
    console.log(obj);
    localStorage.setItem(key, JSON.stringify(obj));
  }
}
