import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class headerTitleService {
  title = new BehaviorSubject('');
  image = new BehaviorSubject('');

  setTitle(title: string) {
    this.title.next(title);
  }

  setImage(image: string) {
    this.image.next(image);
  }
}