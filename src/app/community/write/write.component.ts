import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit {

  title : string = ''
  content : string = ''
  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
  }

  postWrite(): void {
    const req = {
      title : this.title,
      content : this.content
    }

    this.httpClient.post(environment.serverAddress + `/write`, req).subscribe({
      next: (data: any) => {
        console.log('data', data)
      }
    });
  }


}
