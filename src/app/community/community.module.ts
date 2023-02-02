import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table'
import {CommunityComponent} from "./community.component";
import {RouterModule, Routes} from "@angular/router";
import { WriteComponent } from './write/write.component';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import { BoardModalComponent } from './table/board-modal/board-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from '@angular/material/form-field';
import { ConfirmDeleteModalComponent } from './table/confirm-delete-modal/confirm-delete-modal.component';

const routes: Routes = [
  {
    path: '',
    component: CommunityComponent,
    children: [
      {path: 'table', component: TableComponent},
      {path: 'write', component: WriteComponent},
      {path: '', redirectTo: 'table', pathMatch: 'full'},
    ]
  },
];


@NgModule({
    declarations: [
      TableComponent,
      WriteComponent,
      HeaderComponent,
      BoardModalComponent,
      ConfirmDeleteModalComponent,
    ],
  exports: [
    TableComponent,
    RouterModule,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([...routes]),
    CommonModule,
    MatTableModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ]
})
export class CommunityModule { }
