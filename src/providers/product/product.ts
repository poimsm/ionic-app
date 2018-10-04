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
  title: string;
  description: string;
  price: number;
  imgs: object;
  fecha: number;
  productId: string;
  postIds: object;
  userId: string;
  keyValues: object;
  likes: number;
  reviews: number;
  buys: number;
  totalStarts: number;
  sumStarts: number;
  starts: number;
}
export interface SavedProduct {
  userName: string;
  title: string;
  description: string;
  price: number;
  city: string;
  productId: string;
  whoLikedUserId_fecha: string;
}
export interface Imagen {
  postId: string;
  img: object;
}
@Injectable()
export class ProductProvider {
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

  addProduct(
    category,
    titulo,
    descripcion,
    precio,
    keyValues,
    imagenes,
    userId
  ) {
    const postId = this.afs.createId();
    const product: Product = {
      title: titulo,
      description: descripcion,
      price: precio,
      imgs: {},
      postIds: {},
      fecha: new Date().getTime(),
      userId: userId,
      productId: postId,
      keyValues: { ...keyValues },
      likes: 0,
      reviews: 0,
      buys: 0,
      totalStarts: 0,
      sumStarts: 0,
      starts: 0
    };
    this.afs
      .collection(category)
      .doc(postId)
      .set(product)
      .then(data => {
        this.addImgByProduct(category, postId, imagenes);
      });
  }
  async addImgByProduct(category, postId, base64data) {
    let urls = [];
    for (let i = 0; i < base64data.length; i++) {
      const file = base64data[i];
      const filePath = "img/" + postId + "_" + i;
      let url = await this.getUrl(filePath, file);
      urls.push(url);
    }
    this.afs
      .collection(category)
      .doc(postId)
      .update({ imgs: { ...urls } });
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

  getProducts(category, orden) {
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
}
