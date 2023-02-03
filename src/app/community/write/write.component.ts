import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
// @ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit {

  title : string = ''
  content : string = ''
  public Editor = ClassicEditor;

  constructor(
    private httpClient: HttpClient,

  ) {

  }

  ngOnInit(): void {}

  result = document.querySelector(".result")

  /**
   * @description 글 등록
   */

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

  confirmWrite(){
    this.postWrite()
    location.href = '/table';
  }

}
