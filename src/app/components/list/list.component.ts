import {TemplateRef, ViewChild} from '@angular/core';
import {Component, OnInit, Input, Output } from '@angular/core';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MatDialog} from '@angular/material';
import {MatSidenav} from '@angular/material/sidenav';
import {MatSnackBar} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
////models
import {List} from '../../models/list';
///services
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    listItems: List[]=[];
    editedList: List;
    date = new Date();
    mounth=this.date.getMonth()+1;
    today:string;
    changeText: boolean=true;
    isValid=false;
    displayedColumns: string[] = ['id', 'text', 'createDate','button'];
    @ViewChild('drawer') drawer: MatSidenav;
    @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
    @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  constructor(private listService: ListService,public dialog: MatDialog,public snackBar: MatSnackBar)
  {
      this.startApp();
  }

  ngOnInit()
  {
      this.getList();


  }
  loadTemplate(size: number) {

        if(size==0)
        {
            return this.editTemplate;
        }
        else return this.readOnlyTemplate;

  }
  startApp()
  {

    this.listService.getMessage("Задачи загружаются....");
    const firstBar = this.dialog.open(ProgressBar,
    {
        height: '200px',
        width: '600px',
    });
    setTimeout(()=>{firstBar.close();}, 2000);
    }
  getList(): void
  {
      this.listService.get()
           .subscribe(listItems => this.listItems = listItems);
  }
  addToList(text:string)
  {

      this.editedList = new List();
      this.editedList.id=this.listItems.length+1;
      this.editedList.text=text;

      this.today=this.date.getDate()+"/"+this.mounth+"/"+this.date.getFullYear();
      this.editedList.createDate=this.today;
      this.listService.createData(this.editedList).subscribe(data => {
          this.getList();
      });
  }
  add(text:string)
  {
    this.listService.getMessage("Подождите, идёт добавление");
    this.drawer.close();
    const progressBar = this.dialog.open(ProgressBar,
    {
        height: '200px',
        width: '600px',
    });
    if((text.search( /!/i ))==-1)
    {
        this.addToList(text);
        setTimeout(()=>{progressBar.close();}, 3000);
    }
    else
    {
        setTimeout(()=>{
            progressBar.close();
            this.drawer.open();
            this.snackBar.openFromComponent(SnackBarComponent,
                {
                    duration: 5000,
                });
        }, 3000);

    }


  }
  enablebutton(event: any)
  {
      if(event.target.value!="")
      {
          this.isValid=true;
      }
      else this.isValid=false;
  }
   delElement(element: List)
   {
       this.listService.getMessage("Подождите, идёт удаление");
       const dialogRef = this.dialog.open(ListDialogComponent);
       dialogRef.afterClosed().subscribe(result =>
           {
             if(result==true)
             {
                 const progressBar = this.dialog.open(ProgressBar,
                      {
                          height: '200px',
                          width: '600px',
                      });
                 progressBar.afterClosed().subscribe(result =>
                     {
                         this.listItems = this.listItems.filter(l => l !== element);
                         this.listService.deleteList(element).subscribe();
                     });
                setTimeout(
                    ()=>{progressBar.close()
                        }, 3000);

             }
           });
    }
    editOfElement(element: List)
    {
        this.listService.getMessage("Подождите, ещё немного");
        this.listService.getText(element.text);
        const editComponent = this.dialog.open(EditElementComponent,
             {
                 height: '300px',
                 width: '300px',
             });
             editComponent.afterClosed().subscribe(result =>
                 {
                   if(result==true)
                   {
                       const progressBar = this.dialog.open(ProgressBar,
                            {
                                height: '200px',
                                width: '600px',
                            });
                       progressBar.afterClosed().subscribe(result =>
                           {
                               element.text=this.listService.rtrnText();
                               this.listService.updateData(element.id, element).subscribe(data => {
                                   this.getList();
                               });
                           });
                      setTimeout(
                          ()=>{progressBar.close()
                              }, 3000);

                   }
                 });
    }

}
@Component({
  selector: 'app-list-dialog',
  templateUrl: './list-dialog.component.html',
})
export class ListDialogComponent {

}
@Component({
  selector: 'app-list-progress-bar',
  templateUrl: './list-progress-bar.component.html',
})
export class ProgressBar {
    progressMessage=this.service.rtrnMessage();
    constructor(private service: ListService) {  }
}
@Component({
  selector: 'app-snack-bar',
  templateUrl: './list-snack-bar-component.html',
  styles: [`
    .example-snack-bar {
      color: hotpink;
    }
  `],
})
export class SnackBarComponent {}
@Component({
  selector: 'app-list-edit-element',
  templateUrl: './list-edit-element.component.html',
})
export class EditElementComponent {
    value =this.editService.rtrnText();
    constructor(private editService: ListService) {  }
    getValue(text : string)
    {
        this.editService.getText(this.value);
    }
}
@Component({
  selector: 'app-first-start',
  templateUrl: './first-start.component.html',
})
export class FirstCompotent
{

}
