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

  addProduct(category, titulo, descripcion, precio, pricePer,imagen, user) {
    const postId = this.afs.createId();
    const product: Product = {
      category: category,
      title: titulo,
      description: descripcion,
      price: precio,
      pricePer: pricePer,
      img: "",
      fecha: new Date().getTime(),
      userId: user.userId,
      storeName: user.storeName,
      productId: postId,
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
        this.addImgByProduct(category, postId, imagen);
      });
  }
  async addImgByProduct(category, postId, base64data) {
    const file = base64data;
    const filePath = "img/" + postId;
    let url = await this.getUrl(filePath, file);
    this.afs
      .collection(category)
      .doc(postId)
      .update({ img: url });
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
