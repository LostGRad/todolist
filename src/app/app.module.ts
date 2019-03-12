import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
//Angular Material Design
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
//in-memory-web-api
import { HttpClientModule }   from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//services
import { InMemoryDataService }  from './services/in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';
//components
import { AppComponent } from './app.component';
import { ListComponent, ListDialogComponent, ProgressBar, SnackBarComponent, EditElementComponent, FirstCompotent} from './components/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ListDialogComponent,
    ProgressBar,
    SnackBarComponent,
    EditElementComponent,
    FirstCompotent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatTableModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatInputModule,
    MatSnackBarModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
  InMemoryDataService, { dataEncapsulation: false }
)
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
  entryComponents: [ListDialogComponent, ProgressBar, SnackBarComponent, EditElementComponent, FirstCompotent ]
})
export class AppModule { }
