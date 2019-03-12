import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { List } from '../models/list';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ListService{
    private message = '';
    private editText = '';
    private listUrl = 'api/list';
    constructor(private http: HttpClient) { }
 get(): Observable<List[]>
 {
      return this.http.get<List[]>(this.listUrl);
 }
createData(list: List){
    return this.http.post(this.listUrl, list);

 }
 updateData(id: number, list: List)
 {
    return this.http.post<List>(this.listUrl, list, httpOptions)
  }
  deleteList (list: List | number): Observable<List>
  {
     const id = typeof list === 'number' ? list : list.id;
     const url = `${this.listUrl}/${id}`;
     return this.http.delete<List>(url, httpOptions);
  }
getMessage(text: string)
  {
    this.message= text;
  }
rtrnMessage()
    {
      return this.message;
    }
getText(text: string)
      {
        this.editText= text;
      }
rtrnText()
        {
            return this.editText;
         }
}
