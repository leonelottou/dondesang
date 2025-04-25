import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable()
export class CommonService {
  //page1 = new BehaviorSubject('');
  image = new BehaviorSubject('');

  private   page1 = new Subject<any>();
  notifyObservable$ = this.page1.asObservable();

  private   page2 = new Subject<any>();
  notifyObservable2$ = this.page2.asObservable();


  setpage1() {
    //this.page1.next('rien');

    this.page1.next()
  }

  setpage2() {
    //this.page1.next('rien');

    this.page2.next()
  }

  setImage(images: string) {
    this.image.next(images);
  }
}