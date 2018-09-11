import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material";

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

  constructor() { }

  ngOnInit() {
  }

}
