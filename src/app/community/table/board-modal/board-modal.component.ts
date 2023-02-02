import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-board-modal',
  templateUrl: './board-modal.component.html',
  styleUrls: ['./board-modal.component.scss'],
})
export class BoardModalComponent implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpClient: HttpClient,
  ) {
    this.modalData = data
  }

  title : any;
  content : any;
  modalData :any;
  modify : any = {
    isOn : false,
  }


  ngOnInit(): void {
    const title = this.modalData[0].title;
    const content = this.modalData[0].content;
    this.title = title;
    this.content = content;
  }

  patchBoard(id: number, req :any): void{
    this.httpClient
      .patch(environment.serverAddress + `/modify`,req)
      .subscribe({
        next: (data: any) => {
          console.log('patchBoard : ', data);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  toggleModifyMode(){
    if(this.modify.isOn){
      this.modifyBoard();
      location.href = '/table';
    } else {
      this.modify.isOn = true;
    }
  }

  modifyBoard(){
    const req = {
      id: this.modalData[0].id,
      title : this.title,
      content: this.content
    }
    this.patchBoard(this.modalData.id, req);
  }



}
