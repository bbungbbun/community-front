import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit {

  textarea = document.getElementById("textarea")

  constructor() { }

  ngOnInit(): void {

  }



}
