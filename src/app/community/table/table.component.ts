import {Component, OnInit, OnChanges} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {MatDialog} from '@angular/material/dialog';
import {BoardModalComponent} from "./board-modal/board-modal.component";

export interface Board {
  id: number;
  title: string;
  content: string;
  updated_at: Date;
  created_at: Date;
}


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getAllBoard();
  }


  displayedColumns: string[] = ['id', 'title', 'updatedAt', 'createdAt'];
  dataSource: any = [];
  board: Board[] | undefined;
  clickedRows = new Set<Board>();
  modalData = '';
  nowBoardId :number |undefined;


  /**
   * find~~~ 특정 1개 검색
   * findALL~~~ 전체 검색
   * findBy~~ ex: findById << 이름에 해당 하는 것 검색
   * get 하나 가져오기
   * getALL 리스트로 다 가져오기
   * */
  getAllBoard(): void {
    this.httpClient
      .get(environment.serverAddress + `/getAll`, {})
      .subscribe({
      next: (data: any) => {
        this.board = data;
        console.log('this.board : ', data);
        this.dataSource = this.board;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getBoard(id: number): void {
    this.httpClient
      .get(environment.serverAddress + `/getBoard?id=${id}`, {})
      .subscribe({
      next: (data: any) => {
        console.log('getBoard : ', data);
        this.openDialog(data);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  clickRow(row: any) {
    this.getBoard(row.id);
    this.nowBoardId = row.id;
  }

  openDialog(data: any) {
    this.dialog.open(BoardModalComponent, {
      data: data,
      panelClass: 'test',
    });
  }
}


