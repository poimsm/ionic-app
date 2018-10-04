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

export interface Following {
  userId: string;
  following: string;
}
export interface Follower {
  userId: string;
  followedBy: string;
}
export interface Feed {
  userId_time: string;
  postId: string;
}

@Injectable()
export class FollowProvider {
  constructor(
    private afAuth: AngularFireAuth,
    public afDB: AngularFireDatabase,
    public afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    console.log("Hello StoreProvider Provider");
  }
  addFollowing(followingId, userId) {
    const following: Following = {
      userId: userId,
      following: followingId
    };
    this.afs.collection("following").add(following);
  }
  async addFeed(postId, userId) {
    const ids = await this.getUserIds(userId);
    const following: Feed = {
      userId_time: `${userId}_${2553476400000 - new Date().getTime()}`,
      postId: postId
    };
    this.afs.collection("feed").add(following);
  }
  getUserIds(userId) {
    return this.afs
      .collection("following", ref => ref.where("following", "==", userId))
      .valueChanges()
      .pipe(take(1))
      .toPromise();
  }

  getFeed(postId, collection, limit) {
    const blog = this.afs.collection(collection, ref =>
      ref
        .orderBy("userId_time")
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
}
