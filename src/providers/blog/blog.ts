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

export interface Blog {
  title: string;
  fecha: number;
  postId: string;
  userName: string;
  userId: string;
  userImage: string;
  format: object;
  imgs: object;
  likes: number;
  comments: number;
  replay: number;
  popular: number;
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
export class BlogProvider {
  constructor(
    private afAuth: AngularFireAuth,
    public afDB: AngularFireDatabase,
    public afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    console.log("Hello StoreProvider Provider");
  }

  // ----------------------------------------------------
  //           ADDS
  // ----------------------------------------------------
  addBlog(titulo, format, imgs, usuario) {
    return new Promise((resolve, reject) => {
      const postId = this.afs.createId();
      const blog: Blog = {
        title: titulo,
        fecha: new Date().getTime(),
        postId: postId,
        userName: usuario.name,
        userId: usuario.userId,
        userImage: usuario.userImg,
        format: format,
        imgs: {},
        likes: 0,
        comments: 0,
        replay: 0,
        popular: 0
      };
      this.afs
        .collection("Blogs")
        .doc(postId)
        .set(blog)
        .then(data => {
          this.addImgByBlog(postId, imgs);
          resolve(postId);
        });
    });
  }
  async addImgByBlog(postId, base64data) {
    let urls = [];
    for (let i = 0; i < base64data.length; i++) {
      const file = base64data[i];
      const filePath = "img/" + postId + "_" + i;
      let url = await this.getUrl(filePath, file).catch(err =>
        console.log(err)
      );
      urls.push(url);
    }
    this.afs
      .doc("Blogs/" + postId)
      .valueChanges()
      .pipe(take(1))
      .subscribe((blog: any) => {
        let modify = blog.format;
        let cont = 0;
        for (let i = 0; i < Object.keys(blog.format).length; i++) {
          if (blog.format[i].type == "img") {
            modify[i].img = urls[cont];
            cont++;
          }
        }
        this.afs.doc("Blogs/" + postId).update({ format: modify });
      });
  }
  getUrl(filePath, file) {
    return new Promise((resolve, reject) => {
      const ref = this.storage.ref(filePath);
      ref.putString(file, "base64").then(() => {
        ref
          .getDownloadURL()
          .pipe(take(1))
          .toPromise()
          .then(url => {
            if (url) {
              resolve(url);
            }
          });
      });
    });
  }
  // ----------------------------------------------------
  //           GETS
  // ----------------------------------------------------
  getBlogs(orden) {
    const outfit = this.afs.collection("Blogs", ref =>
      ref.orderBy(orden, "desc").limit(15)
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
  getOneBlog(postId) {
    const outfit = this.afs.collection("Blogs", ref =>
      ref.where("postId", "==", postId)
    );
    return outfit.valueChanges().pipe(
      map(data => {
        return data[0];
      })
    );
  }
  getLikesOrComments(postId, collection, limit) {
    const blog = this.afs.collection(collection, ref =>
      ref
        .orderBy("postId_time")
        .startAt(postId)
        .endAt(postId + "\uf8ff")
        .limit(limit)
    );
    return blog.snapshotChanges().pipe(
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

  updateLikes(postId: string, user) {
    this.afs
      .doc("Blogs/" + postId)
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
        this.afs.doc("Blogs/" + postId).update({ likes: cont });
      });
  }
  updateComments(postId: string, message, user) {
    this.afs
      .doc("Blogs/" + postId)
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
        this.afs.doc("Blogs/" + postId).update({ comments: cont });
      });
  }
  // ----------------------------------------------------
  //           DELETES
  // ----------------------------------------------------
  deleteLike(likeId) {
    this.afs.doc("likes/" + likeId).delete();
  }
}
