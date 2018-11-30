import { Component } from "@angular/core";
import {
  IonicPage,
  ModalController,
  NavController,
  NavParams
} from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { Observable } from "rxjs";
import { LikeComentProvider } from "../../providers/like-coment/like-coment";

@IonicPage()
@Component({
  selector: "page-producto",
  templateUrl: "producto.html"
})
export class ProductoPage {
  product$: Observable<any>;
  likes$: Observable<any[]>;
  comments$: Observable<any[]>;
  data: any;
  message: string;
  userLike = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private _like: LikeComentProvider,
    private _auth: AuthProvider
  ) {
    this.data = this.navParams.data;
    // this.getBlog();
    // this.getLikesAndComments();
    // this.findUserLike();
  }
  back() {
    this.navCtrl.pop();
  }
  getBlog() {
    console.log("CAT", this.data.category);
    console.log("id", this.data.id);

    this.product$ = this._like.getOneProduct(this.data.category, this.data.id);
  }
  getLikesAndComments() {
    this.likes$ = this._like.getLikesOrComments(this.data.id, "likes", 3);
    this.comments$ = this._like.getLikesOrComments(
      this.data.id,
      "comments",
      20
    );
  }
  findUserLike() {
    // this._like
    //   .findIfLikeExist(this.data.id, this._auth.authData.userId)
    //   .subscribe(flag => (this.userLike = flag));
  }
  addLike(postId, flag, id) {
    console.log(flag);
    if (flag) {
      this._like.deleteLike(id);
    } else {
      this._like.updateLikes(this.data.category, postId, this._auth.authData);
    }
  }
  addComment(postId) {
    // this._blog.addComment(postId, this.message, this._auth.authData)
    this._like.updateComments(
      this.data.category,
      postId,
      this.message,
      this._auth.authData
    );
  }
}
