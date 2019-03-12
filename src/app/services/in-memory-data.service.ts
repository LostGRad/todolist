import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { List } from '../models/list';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

    createDb() {
       const list= [
         { id: 1, text: 'Mr. Nice', createDate:'6/15/2015' },
         { id: 2, text: 'Narco', createDate:'6/15/2015' },
         { id: 3, text: 'Bombasto', createDate:'6/15/2015' },
         { id: 4, text: 'Celeritas', createDate:'6/15/2015' },
         { id: 5, text: 'Magneta', createDate:'6/15/2015' },
         { id: 6, text: 'RubberMan', createDate:'6/15/2015' },
         { id: 7, text: 'Dynama', createDate:'6/15/2015' },
         { id: 8, text: 'Dr IQ', createDate:'6/15/2015' },
         { id: 9, text: 'Magma', createDate:'6/15/2015' },
         { id: 10, text: 'Tornado', createDate:'6/15/2015' }
       ];
       return {list};
     }

}
