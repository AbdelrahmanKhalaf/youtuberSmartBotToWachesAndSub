import { Component } from '@angular/core';
import { WebSocketService } from './shard/services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'controle-panle';

  constructor() {}
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {}
}
