import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserModel } from '../user-model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CoreService } from 'src/app/core/services/core.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['Document', 'Names', 'LastName', 'SecondLastName', 'Email'];
  dataSource: MatTableDataSource<UserModel>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Output() new = new EventEmitter<boolean>();

  @Output() edit = new EventEmitter<UserModel>();

  expandedElement: UserModel;

  constructor(private coreService: CoreService ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.coreService.get('users?limit=0').subscribe(
      (res: any) => {
        // console.log(res);
        const data = res ? res : [];
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  newRegister() {
    this.new.emit(true);
  }

  editRegister(el) {
    this.edit.emit(el);
  }

}
