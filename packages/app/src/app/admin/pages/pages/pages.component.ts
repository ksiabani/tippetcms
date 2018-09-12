import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from "@angular/material";
import { AddPageDialogComponent } from "../../components/add-page-dialog/add-page-dialog.component";

export interface PeriodicElement {
  name: string;
  updated: Date;
  icon?: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'blog', updated: new Date(), icon: 'folder'},
  {name: 'products', updated: new Date(), icon: 'folder'},
  {name: 'index.html', updated: new Date(), icon: 'insert_drive_file'},
  {name: 'about.html', updated: new Date(), icon: 'insert_drive_file'},
  {name: 'contact.html', updated: new Date(), icon: 'insert_drive_file'}
];

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'updated'];
  dataSource = ELEMENT_DATA;
  emptyDataSource = new MatTableDataSource<Element>(null);

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPageDialogComponent, {
      disableClose: true,
      panelClass: "add-page-dialog",
      data: {}
    });
  }

}
