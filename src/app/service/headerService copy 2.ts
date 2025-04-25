import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class CommonService {
  page1 = new BehaviorSubject('');
  image = new BehaviorSubject('');

  setpage1(title: string) {
 
  }

  setImage(images: string) {
    this.image.next(images);
  }
}