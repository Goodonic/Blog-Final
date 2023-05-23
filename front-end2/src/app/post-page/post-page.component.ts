import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {async, observable, Observable, switchMap} from "rxjs";
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";
import {FlashMessagesService} from "flash-messages-angular";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit{


  post$: Observable<Object>
  post:any
  login:string
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private _flashMessagesService: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit() {
    if(this.authService.isAuthenticated()){ // @ts-ignore
      this.login = JSON.parse(localStorage.getItem("user")).login}
    this.post$ = this.route.params.pipe(switchMap((params:Params)=> this.authService.getPostById({id: params['id']})))
    // @ts-ignore
    this.post$.subscribe((someArray: any[]) => {
      this.post = someArray;
    });
  }

  deletePost(){
    let callback
    console.log(this.post._id)
    this.authService.deletePostById(this.post._id)
    this._flashMessagesService.show("Post deleted",
      { cssClass: 'alert-danger', timeout: 2000 });
    this.router.navigate(['/'])
  }
}
