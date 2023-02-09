import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import { MyUploadAdapter } from './my-upload-adapter';
// @ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// @ts-ignore
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit {

  title : string = '';
  content : string = '';
  fileName : string = '';
  imageSrc : string = '';
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
   * @description MyUploadAdapter에서 받은 데이터 반영
   * */

  onReady(editor: ClassicEditor): void {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader :any ) => {
      const result = new MyUploadAdapter( loader, this.httpClient)
      console.log('result', result);
      return result;
    };
  }


  /**
   * @description 사진 입력 감지 -- 테스트용
   */
  onChange(files: FileList | undefined | null) {
    if (!files) return;
    this.postUpload(files);
  }

  /**
   * @description 사진 업로드 -- 테스트용
   */
  postUpload(files: FileList ) {
    const formData = new FormData();
    console.log('files : ', files);
    for (let i = 0; i < files.length; i++) {
      formData.append('upload', files[i]);
    }

    this.httpClient.post(environment.serverAddress + `/upload`, formData).subscribe( {
      next: (data: any) => {
        this.fileName = data.sendFiles[0].filename;
        this.imageSrc = `${environment.serverAddress}/upload/${this.fileName}`;
      },
      error: (e) => {
        console.error('error : ', e);
      }
    });
  }

}
