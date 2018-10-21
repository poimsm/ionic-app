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
import { HttpClient } from "@angular/common/http";

import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";

export interface Outfit {
  title: string;
  img: object;
  fecha: number;
  userName: string;
  userId: string;
  userImage: string;
  productIds: object;
  likes: number;
  comments: number;
  reviews: number;
  buys: number;
  totalStarts: number;
  SumStarts: number;
  starts: number;
  tiendaRep: number;
  destacado: number;
  novedad: number;
  popular: number;
}
export interface Imagen {
  postId: string;
  img: object;
}
@Injectable()
export class OutfitProvider {
  constructor(
    private afAuth: AngularFireAuth,
    public afDB: AngularFireDatabase,
    public afs: AngularFirestore,
    private storage: AngularFireStorage,
    public http: HttpClient
  ) {
    console.log("Hello StoreProvider Provider");
    http
      .get("https://jsonplaceholder.typicode.com/users")
      .subscribe(data => console.log(data));
  }
  // ----------------------------------------------------
  //           ADDS
  // ----------------------------------------------------

  addOutfit(destacado, titulo, categoria, img, usuario, ids) {
    return new Promise((resolve, reject) => {
      const postId = this.afs.createId();
      const outfit: Outfit = {
        title: titulo,
        img: {},
        fecha: new Date().getTime(),
        userName: usuario.name,
        userId: usuario.userId,
        userImage: usuario.userImg,
        productIds: { ...ids },
        likes: 0,
        comments: 0,
        reviews: 0,
        buys: 0,
        totalStarts: 0,
        SumStarts: 0,
        starts: 0,
        tiendaRep: 0,
        destacado: 0,
        novedad: 0,
        popular: 0
      };
      this.afs
        .collection(destacado)
        .doc(postId)
        .set(outfit);
      this.afs
        .collection(categoria)
        .doc(postId)
        .set(outfit)
        .then(data => {
          this.addImgByOutfit(destacado, postId, [img], categoria);
          resolve(postId);
        });
    });
  }
  async addImgByOutfit(destacado, postId, base64data, categoria) {
    let urls = [];
    for (let i = 0; i < base64data.length; i++) {
      const file = base64data[i];
      const filePath = "img/" + postId + "_" + i;
      let url = await this.getUrl(filePath, file);
      urls.push(url);
    }
    this.afs.doc(destacado + "/" + postId).update({ img: { ...urls } });
    this.afs.doc(categoria + "/" + postId).update({ img: { ...urls } });
  }
  getUrl(filePath, file) {
    return new Promise((resolve, reject) => {
      const ref = this.storage.ref(filePath);
      ref.put(file).then(() => {
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
  getUser(id) {
    const user = this.afs.collection("user", ref =>
      ref.where("userId", "==", id)
    );
    return user.valueChanges();
  }
  getOutfits(category, orden) {
    const outfit = this.afs.collection(category, ref =>
      ref.orderBy(orden, "desc").limit(6)
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
  // getOutfitById(category, id) {
  //   this.subProducts = this.afs.collection(category, ref =>
  //     ref.where("userId", "==", id)
  //   );
  //   return this.subProducts.snapshotChanges().pipe(
  //     map(docArray => {
  //       return docArray.map(doc => {
  //         return {
  //           id: doc.payload.doc.id,
  //           ...doc.payload.doc.data()
  //         };
  //       });
  //     })
  //   );
  // }
  // getOutfitByUserId(categories: string[], id) {
  //   return from(categories).pipe(
  //     mergeMap(category => this.getOutfitById(category, id))
  //   );
  // }
}
