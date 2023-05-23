import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  posts: any = [];
  constructor(private authService: AuthService,
  ) {}
  ngOnInit(): void{
    this.authService.getAllPosts("World").subscribe(posts =>
      this.posts = posts,
        (err: any) =>{NaN},
        ()=>{
          for(let i = 0; i < this.posts.length; i++){
            this.posts[i].text = this.posts[i].text.substring(0, 150);

        }
    })

  }

  categoryFilter(category:any){
    this.posts = [];
    this.authService.getAllPosts(category).subscribe(posts =>
        this.posts = posts,
      (err: any) =>{NaN},
      ()=>{
        for(let i = 0; i < this.posts.length; i++){
          this.posts[i].text = this.posts[i].text.substring(0, 150);
        }
      })
  }
}
