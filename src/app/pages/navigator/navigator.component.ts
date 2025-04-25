import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  @Input() active = ''

  constructor() { }

  ngOnInit(): void {
  }

}
