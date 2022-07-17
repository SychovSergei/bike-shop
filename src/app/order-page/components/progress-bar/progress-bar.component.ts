import {Component, Input, OnInit} from '@angular/core';

export interface Steps {
  id: number,
  name: string,
  complete: boolean
}

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {


  @Input() current: number
  @Input() complete: boolean
  @Input() steps: Steps[]

  constructor() { }

  ngOnInit(): void {

  }


}

