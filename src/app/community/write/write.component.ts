import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import { FileUploadService } from '../../file-upload.servise';

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
  imgSrc : string = '';
  public Editor = ClassicEditor;

  constructor(
    private httpClient: HttpClient,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {

  }


  shortLink: string = ''; // Variable to store shortLink from api response
  loading: boolean = false; // Flag variable
  file: any = null; // Variable to store file to Upload

  // On file Select
  onChange(event : any) {
    this.file = event.target.files[0];
    console.log('this.file', this.file)
  }

  // OnClick of button Upload
  onUpload() {
    if (this.file) {
      this.loading = !this.loading;
      this.fileUploadService.upload(this.file).subscribe((event: any) => {
        if (typeof event === 'object') {
          // Short link via api response
          this.shortLink = event.link;
          this.loading = false; // Flag variable
        }
      });
    }
  }

  Upload() {
    const req = {
      file : this.file
    }

    this.httpClient.post(environment.serverAddress + `/upload`, req).subscribe( {
      next: (data: any) => {
        console.log('data', data);
      }
    });
  }



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
    // location.href = '/table';
  }

  /**
   * @description 사진 업로드
   */

  postFile() : void{
    const req = {
    }

  }


}
