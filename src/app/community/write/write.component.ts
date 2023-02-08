import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

// @ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// // @ts-ignore
// import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
// // @ts-ignore
// import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';


@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit {

  title : string = '';
  content : string = '';
  imgSrc : string = '';
  file: FileList | undefined;
  public Editor = ClassicEditor;

  constructor(
    private httpClient: HttpClient,
  ) {}

  ngOnInit(): void {}

  /**
   * @description 글 등록
   */

  postWrite(): void {
    const req = {
      title : this.title,
      content : this.content
    }

    this.httpClient.post(environment.serverAddress + `/write`, req).subscribe( {
      next: (data: any) => {
        console.log('data', data);
      }
    });
  }

  confirmWrite(){
    this.postWrite()
    location.href = '/table';
  }

  /**
   * @description 사진 입력 감지
   */
  onChange(files: FileList | undefined | null) {
    if (!files) {
      return;
    }

    this.postUpload(files);
  }

  /**
   * @description 사진 업로드
   */
  postUpload(files: FileList ) {
    const formData = new FormData();
    console.log('files : ', files);
    for (let i = 0; i < files.length; i++) {
      formData.append('upload', files[i]);
    }

    this.httpClient.post(environment.serverAddress + `/upload`, formData).subscribe( {
      next: (data: any) => {
        console.log('file send res', data);
      },
      error: (e) => {
        console.error('error : ', e);
      }
    });
  }



}
