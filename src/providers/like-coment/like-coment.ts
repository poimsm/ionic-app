import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from "firebase/app";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireStorage } from "angularfire2/storage";
import { take } from "rxjs/operators";
import "firebase/storage";
import { map, mergeMap, switchMap } from "rxjs/operators";
import { forkJoin, Observable } from "rxjs";
import { from } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";

export interface Product {
  category: string;
  title: string;
  description: string;
  price: number;
  pricePer: string;
  img: string;
  fecha: number;
  productId: string;
  userId: string;
  storeName: string;
  likes: number;
  reviews: number;
  buys: number;
  totalStarts: number;
  sumStarts: number;
  starts: number;
}
export interface Comment {
  postId_time: string;
  postId: string;
  message: string;
  likes: number;
  userId: string;
  userName: string;
  userImage: string;
}
export interface Like {
  postId_time: string;
  postId: string;
  userId: string;
  userName: string;
  userImage: string;
}

@Injectable()
export class LikeComentProvider {
  constructor(
    private afAuth: AngularFireAuth,
    public afDB: AngularFireDatabase,
    public afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    console.log("Hello StoreProvider Provider");
  }
  // ----------------------------------------------------
  //           GETS
  // ----------------------------------------------------
  getBlogs(category, order) {
    const outfit = this.afs.collection(category, ref =>
      ref.orderBy(order, "desc").limit(15)
    );
    return outfit.snapshotChanges().pipe(
      map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()
          };
        });
      })
    );
  }
  getOneProduct(category, postId) {
    const product = this.afs.collection(category, ref =>
      ref.where("productId", "==", postId)
    );
    return product.valueChanges().pipe(
      map(data => {
        console.log("PROD", data[0]);

        return data[0];
      })
    );
  }
  getLikesOrComments(postId, collection, limit) {
    const product = this.afs.collection(collection, ref =>
      ref
        .orderBy("postId_time")
        .startAt(postId)
        .endAt(postId + "\uf8ff")
        .limit(limit)
    );
    return product.snapshotChanges().pipe(
      map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()
          };
        });
      })
    );
  }
  findIfLikeExist(postId, userId) {
    const like = this.afs.collection("likes", ref =>
      ref.where("postId", "==", postId).where("userId", "==", userId)
    );
    return like.snapshotChanges().pipe(
      map(data => {
        let flag: boolean;
        let id = data[0] ? data[0].payload.doc.id : "";
        data[0] ? (flag = true) : (flag = false);
        return { arrive: true, flag, id };
      })
    );
  }
  // ----------------------------------------------------
  //           UPDATES
  // ----------------------------------------------------

  updateLikes(category, postId: string, user) {
    this.afs
      .doc(category + "/" + postId)
      .valueChanges()
      .pipe(take(1))
      .subscribe((blog: any) => {
        const like: Like = {
          postId_time: `${postId}_${2553476400000 - new Date().getTime()}`,
          postId: postId,
          userName: user.name,
          userId: user.userId,
          userImage: user.userImg
        };
        const cont = blog.likes + 1;
        this.afs.collection("likes").add(like);
        this.afs.doc(category + "/" + postId).update({ likes: cont });
      });
  }
  updateComments(category, postId: string, message, user) {
    this.afs
      .doc(category + "/" + postId)
      .valueChanges()
      .pipe(take(1))
      .subscribe((blog: any) => {
        const comment: Comment = {
          postId_time: `${postId}_${2553476400000 - new Date().getTime()}`,
          postId: postId,
          message: message,
          likes: 0,
          userName: user.name,
          userId: user.userId,
          userImage: user.userImg
        };
        const cont = blog.comments + 1;
        this.afs.collection("comments").add(comment);
        this.afs.doc(category + "/" + postId).update({ comments: cont });
      });
  }
  // ----------------------------------------------------
  //           DELETES
  // ----------------------------------------------------
  deleteLike(likeId) {
    this.afs.doc("likes/" + likeId).delete();
  }
}
