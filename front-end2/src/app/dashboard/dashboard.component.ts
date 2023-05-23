import { Component } from '@angular/core';
import {FlashMessagesService} from "flash-messages-angular";
import {RegService} from "../reg.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private _flashMessagesService: FlashMessagesService,
              private regService: RegService,
              private router: Router) {}
  title: string;
  photo: string;
  category: string;
  text: string;


  createPost() {

    const post = {
      category: this.category,
      title: this.title,
      photo: this.photo,
      text: this.text,
      // @ts-ignore
      author: JSON.parse(localStorage.getItem("user")).login,
      date: new Date(),
    }

    if ((!post.category)||(!post.title)||(!post.photo)||(!post.text)){
      this._flashMessagesService.show('Fill in all the fields!',
        { cssClass: 'alert-danger', timeout: 2000 });
      return false
    }
    console.log(post);

    this.regService.createPost(post).subscribe(data=>{
      // @ts-ignore
      if(!data.success){
        // @ts-ignore
        this._flashMessagesService.show(data.msg,
          { cssClass: 'alert-danger', timeout: 2000 });

      }
      else {
        // @ts-ignore
        this._flashMessagesService.show(data.msg,
          { cssClass: 'alert-success', timeout: 2000 });
        this.router.navigate(['/']);
      }
    })
    return false


  }
}
