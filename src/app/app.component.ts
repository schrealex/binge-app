import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  moduleId: module.id,
  selector: 'binge',
  templateUrl: 'app.component.html'
})

export class AppComponent
{
  title: string = 'B I N G E';

  constructor(title: Title) {
    title.setTitle(this.title);
  }
}
