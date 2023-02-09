import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

export class MyUploadAdapter {
  constructor(private loader: any, private http: HttpClient) {}

  url : string = environment.serverAddress + '/upload';
  fileName : string = '';
  imageSrc : string = '';

  upload() {
    return this.loader.file
      .then((file:any) => new Promise( ( resolve, reject ) => {
        const formData = new FormData();
        formData.append('upload', file);

        return this.http.post(this.url, formData).subscribe({
            next: (data: any) => {
              this.fileName = data.sendFiles[0].filename;
              this.imageSrc = this.url + `/${this.fileName}`;
              resolve({default : this.imageSrc})
            },
            error: (e) => {
              console.error('error : ', e);
            }
          });
    } ));

  }
  abort() {
    console.error('aborted');
  }
}


