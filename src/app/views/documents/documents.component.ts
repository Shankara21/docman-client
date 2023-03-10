import { ControlService } from './../../Services/control.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  constructor(private router: Router, private ControlService: ControlService) { }
  term: any;
  name: string = this.router.url.substring(1);
  title: any;
  temp: any[] = [];
  data: any[] = [];

  // pagination
  p: number = 1;
  itemsPerPage: number = 15;
  totalProduct: any;
  ngOnInit(): void {
    // Categories
    this.ControlService.getCategories(this.name).subscribe((res: any) => {
      this.temp = res;
      this.title = this.temp[0].name;
    });

    this.ControlService.getListDocuments(this.name).subscribe((res: any) => {
      this.data = res;
      this.totalProduct = this.data.length;
    });
  }
  delete(id: any) {
    this.ControlService.deleteDocument(id).subscribe((res: any) => {
      this.router.navigate([this.name]);
      window.location.reload();
    });
  }
}
