import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from "@angular/material";
import { AddPageDialogComponent } from "../../components/add-page-dialog/add-page-dialog.component";

export interface PeriodicElement {
  name: string;
  slug: string;
  preview?: string;
  icon?: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Blog', slug: '/blog/', icon: 'folder', preview: 'https://picsum.photos/60/80/?image=221'},
  {name: 'Products', slug: '/products/', icon: 'folder', preview: 'https://picsum.photos/60/80/?image=201'},
  {name: 'Home', slug: '/', icon: 'insert_drive_file', preview: 'https://picsum.photos/60/80/?image=302'},
  {name: 'About', slug: 'about', icon: 'insert_drive_file', preview: 'https://picsum.photos/60/80/?image=926'},
  {name: 'Contact', slug: '/contact', icon: 'insert_drive_file', preview: 'https://picsum.photos/60/80/?image=98'}
];

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'slug', 'preview'];
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
