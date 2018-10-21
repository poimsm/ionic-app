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

export interface Menu {
  category: string;
  title: string;
  description: string;
  options: object;
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
export interface Product {
  userId_collection_date: string;
  title: string;
  price: number;
  fecha: number;
  productId: string;
  userId: string;
}
export interface Collection {
  userId: string;
  collectionId: string;
  title: string;
  itemsIn: number;
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
  addCollection(title, user) {
    const id = this.afs.createId();
    const collection: Collection = {
      userId: user.userId,
      collectionId: id,
      title: title,
      itemsIn: 0
    };
    this.afs
      .collection("colecciones")
      .doc(id)
      .set(collection);
  }
  addMenu(category, titulo, descripcion, opciones, imagen, user) {
    const postId = this.afs.createId();
    const menu: Menu = {
      category: category,
      title: titulo,
      description: descripcion,
      options: opciones,
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
      .set(menu)
      .then(data => {
        this.addImgByProduct(category, postId, imagen);
      });
  }
  addProduct(coleccion, titulo, precio, user) {
    const postId = this.afs.createId();
    const fecha = new Date().getTime();
    const product: Product = {
      userId_collection_date: `${user.userId}_${coleccion}_${fecha}`,
      title: titulo,
      price: precio,
      fecha: new Date().getTime(),
      userId: user.userId,
      productId: postId
    };
    this.afs
      .collection("products")
      .doc(postId)
      .set(product)
      .then(data => {
        // this.addImgByProduct(category, postId, imagen);
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
  getCollections(user) {
    const data = this.afs.collection("colecciones", ref =>
      ref.where("userId", "==", user.userId)
    );
    return data.snapshotChanges().pipe(
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
  // ----------------------------------------------------
  //           UPDATES
  // ----------------------------------------------------
  async updateCollection(id) {
    const data: any = await this.getOneCollection(id);
    console.log("dataa", data);

    this.afs.doc("colecciones/" + id).update({ itemsIn: data[0].itemsIn + 1 });
  }
  getOneCollection(id: string) {
    return this.afs
      .collection("colecciones", ref => ref.where("collectionId", "==", id))
      .valueChanges()
      .pipe(take(1))
      .toPromise();
  }
}
