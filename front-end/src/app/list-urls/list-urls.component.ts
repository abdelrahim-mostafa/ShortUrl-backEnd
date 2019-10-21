import { Component, OnInit } from '@angular/core';
import { UrlService } from '../url.service';

@Component({
  selector: 'app-list-urls',
  templateUrl: './list-urls.component.html',
  styleUrls: ['./list-urls.component.css']
})
export class ListUrlsComponent implements OnInit {

  allUrls : Object;
  constructor( private url : UrlService) { }

  ngOnInit() {
    this.url.allUrls().subscribe(
      (res) =>{
        console.log(res);
      } ,
      (err) =>{
        console.log(err);
      }
    );
  }

}
