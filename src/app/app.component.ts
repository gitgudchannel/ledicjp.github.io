import {
  AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, Output, Renderer2,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  hover: string;
  title = 'app';

  @ViewChild('particlesJs') myCanvas: ElementRef;

  constructor(private rd: Renderer2) {
  }

  ngAfterViewInit() {
  }
}
