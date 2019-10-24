import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlService } from '../url.service';

@Component({
  selector: 'app-u',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  NotFound : String;
  constructor( private rout : ActivatedRoute , private url : UrlService) { 
    this.rout.paramMap.subscribe(params => {
      let parser = params.get('parser');
      if(parser){
        this.url.getUrlParser(parser).subscribe(
          (res) => {
            if(res['status'] === "done" && res['data']['status']){
              let data = res['data'];
              this.NotFound = "Welecome";
              location.href = data['link'];
            } else {
              this.NotFound = "404 Not found";
            }
          },
          (err) => {
            this.NotFound = "404 Not found";
          }
        )
      } else {
        this.NotFound = "404 Not found";
      } 
    });
  }

  ngOnInit() {
    
  }

}
