import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";
import { UserPage } from "../user/user";
import { BlogProvider } from "../../providers/blog/blog";
import { AuthProvider } from "../../providers/auth/auth";
import { CommentsPage } from "../comments/comments";
import { Observable } from "rxjs";

@IonicPage()
@Component({
  selector: "page-blog-content",
  templateUrl: "blog-content.html"
})
export class BlogContentPage {
  blog$: Observable<any>;
  blog2$: Observable<any>;

  likes$: Observable<any[]>;
  comments$: Observable<any[]>;

  // userLike$: Observable<boolean>;
  userLike = {};
  data: any;
  render = [];
  message = "Di algo";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _blog: BlogProvider,
    private _auth: AuthProvider,
    private modalCtrl: ModalController
  ) {
    this.data = this.navParams.data;
    for (let i = 0; i < Object.keys(this.data.format).length; i++) {
      this.render.push(this.data.format[i]);
    }
    this.getBlog();
    this.getLikesAndComments();
    this.findUserLike();
  }
  findUserLike() {
    this._blog
      .findIfLikeExist(this.data.id, this._auth.authData.userId)
      .subscribe(flag => (this.userLike = flag));
  }
  getBlog() {
    this.blog$ = this._blog.getOneBlog(this.data.id);
  }
  getLikesAndComments() {
    this.likes$ = this._blog.getLikesOrComments(this.data.id, "likes", 3);
    this.comments$ = this._blog.getLikesOrComments(
      this.data.id,
      "comments",
      20
    );
  }

  addLike(postId, flag, id) {
    console.log(flag);
    if (flag) {
      this._blog.deleteLike(id);
    } else {
      this._blog.updateLikes(postId, this._auth.authData);
    }
  }
  addComment(postId) {
    // this._blog.addComment(postId, this.message, this._auth.authData)
    this._blog.updateComments(postId, this.message, this._auth.authData);
  }
  openPage() {
    this.navCtrl.push(CommentsPage);
  }
  openUser() {
    this.navCtrl.push(UserPage);
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad BlogContentPage");
  }
}
