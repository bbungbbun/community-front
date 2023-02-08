import {HttpClient,} from "@angular/common/http";
import {environment} from "../../../environments/environment";

export class MyUploadAdapter {
  constructor(private loader: any, private http: HttpClient) {
    this.loader = loader
  }
  upload() {
    return this.loader.file.then((file:any) => {
      const formData = new FormData();
      console.log('files : ', file);
      formData.append('upload', file);

      return this.http
        .post(environment.serverAddress + `/upload`,formData)
        .subscribe({
            next: (data: any) => {
              console.log('file send res', data);
            },
            error: (e) => {
              console.error('error : ', e);
            }
        });
    });
  }
  abort() {
    console.error('aborted');
  }

}
