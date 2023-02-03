import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDeleteModalComponent} from "../confirm-delete-modal/confirm-delete-modal.component";

@Component({
  selector: 'app-board-modal',
  templateUrl: './board-modal.component.html',
  styleUrls: ['./board-modal.component.scss'],
})
export class BoardModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpClient: HttpClient,
    public dialog: MatDialog
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

  /**
   * @description 글 삭제
   */
  deleteBoard(id: number): void{
    this.httpClient
      .delete(environment.serverAddress + `/delete?id=${id}`,{})
      .subscribe({
        next: (data: any) => {
          console.log('deleted board', data);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  /**
   * @description 글 수정
   */

  modifyBoard(){
    const req = {
      id: this.modalData[0].id,
      title : this.title,
      content: this.content
    }
    this.patchBoard(req);
  }

  patchBoard(req :any): void{
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




  /**
   * @description 글 삭제 확인 모달 열기
   */

  confirmDelete(): void {
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
      width: '250px',
    });

    const boardId = this.modalData[0].id;

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result){
        this.deleteBoard(boardId);
        location.href = '/table';
      }
    });
  }

}
