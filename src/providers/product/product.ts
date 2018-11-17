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

export interface Combo {
  category: string;
  title: string;
  price: number;
  img: string;
  fecha: number;
  userId: string;
  storeName: string;
  likes: number;
  reviews: number;
  buys: number;
  totalStarts: number;
  sumStarts: number;
  starts: number;
  lists: object;
  isList: boolean;
}
export interface Pack {
  category: string;
  title: string;
  description;
  price: number;
  img: string;
  fecha: number;
  userId: string;
  storeName: string;
  likes: number;
  reviews: number;
  buys: number;
  totalStarts: number;
  sumStarts: number;
  starts: number;
  table: object;
}
export interface Coupon {
  category: string;
  title: string;
  description: string;
  coupons: number;
  price: number;
  img: string;
  initDate: string;
  endDate: string;
  fecha: number;
  userId: string;
  storeName: string;
  storeAvatar: string;
  likes: number;
  reviews: number;
  buys: number;
  totalStarts: number;
  sumStarts: number;
  starts: number;
  conditions: object;
}
export interface Event {
  category: string;
  title: string;
  description: string;
  price: number;
  imgs: object;
  fecha: number;
  date: string;
  userId: string;
  hourInit: string;
  hourEnd: string;
  site: string;
  storeName: string;
  storeAvatar: string;
  reviews: number;
  buys: number;
  totalStarts: number;
  sumStarts: number;
  starts: number;
  lists: object;
  isList: boolean;
}
export interface Service {
  category: string;
  title: string;
  description: string;
  price: number;
  imgs: object;
  fecha: number;
  userId: string;
  hourInits: string;
  site: string;
  duration: number;
  storeName: string;
  storeAvatar: string;
  likes: number;
  buys: number;
  lists: object;
  isList: boolean;
}
export interface List {
  comboId: string;
  lists: object;
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
  addCombo(categoria, titulo, precio, imagen, listas, isList, user) {
    const postId = this.afs.createId();
    const combo: Combo = {
      category: categoria,
      title: titulo,
      price: precio,
      img: "",
      lists: listas,
      isList: isList,
      fecha: new Date().getTime(),
      userId: user.userId,
      storeName: user.storeName,
      likes: 0,
      reviews: 0,
      buys: 0,
      totalStarts: 0,
      sumStarts: 0,
      starts: 0
    };
    this.afs
      .collection("combo_" + categoria)
      .doc(postId)
      .set(combo)
      .then(data => {
        this.addOneImg("combo", categoria, postId, imagen);
      });
  }
  addPack(categoria, imagen, titulo, descripcion, precio, tabla, user) {
    const postId = this.afs.createId();
    const pack: Pack = {
      category: categoria,
      title: titulo,
      description: descripcion,
      price: precio,
      img: "",
      table: tabla,
      fecha: new Date().getTime(),
      userId: user.userId,
      storeName: user.storeName,
      likes: 0,
      reviews: 0,
      buys: 0,
      totalStarts: 0,
      sumStarts: 0,
      starts: 0
    };
    this.afs
      .collection("pack_" + categoria)
      .doc(postId)
      .set(pack)
      .then(data => {
        this.addOneImg("pack", categoria, postId, imagen);
      });
  }
  addCoupon(
    categoria,
    imagen,
    titulo,
    descripcion,
    precio,
    disponibles,
    condiciones,
    inicio,
    termino,
    user
  ) {
    const postId = this.afs.createId();
    const coupon: Coupon = {
      category: categoria,
      title: titulo,
      description: descripcion,
      price: precio,
      coupons: disponibles,
      img: "",
      conditions: condiciones,
      initDate: inicio,
      endDate: termino,
      fecha: new Date().getTime(),
      userId: user.userId,
      storeName: user.storeName,
      storeAvatar: user.userImg,
      likes: 0,
      reviews: 0,
      buys: 0,
      totalStarts: 0,
      sumStarts: 0,
      starts: 0
    };
    this.afs
      .collection("cupon_" + categoria)
      .doc(postId)
      .set(coupon)
      .then(data => {
        this.addOneImg("cupon", categoria, postId, imagen);
      });
  }
  addEvent(
    categoria,
    imagen,
    titulo,
    descripcion,
    precio,
    fecha,
    inicio,
    termino,
    lugar,
    lists,
    isList,
    user
  ) {
    const postId = this.afs.createId();
    const event: Event = {
      category: categoria,
      title: titulo,
      description: descripcion,
      price: precio,
      imgs: {},
      lists: lists,
      isList: isList,
      fecha: new Date().getTime(),
      date: fecha,
      hourInit: inicio,
      hourEnd: termino,
      site: lugar,
      userId: user.userId,
      storeName: user.storeName,
      storeAvatar: user.userImg,
      reviews: 0,
      buys: 0,
      totalStarts: 0,
      sumStarts: 0,
      starts: 0
    };
    this.afs
      .collection("evento_" + categoria)
      .doc(postId)
      .set(event)
      .then(data => {
        this.addManyImgs("evento", categoria, postId, imagen);
      });
  }
  addService(
    categoria,
    imagenes,
    titulo,
    descripcion,
    precio,
    duracion,
    lugar,
    inicios,
    lists,
    isList,
    user
  ) {
    const postId = this.afs.createId();
    const service: Service = {
      category: categoria,
      title: titulo,
      description: descripcion,
      price: precio,
      imgs: {},
      fecha: new Date().getTime(),
      userId: user.userId,
      hourInits: inicios,
      site: lugar,
      duration: duracion,
      storeName: user.storeName,
      storeAvatar: user.userImg,
      likes: 0,
      buys: 0,
      lists: lists,
      isList: isList
    };
    this.afs
      .collection("servicios_" + categoria)
      .doc(postId)
      .set(service)
      .then(data => {
        this.addManyImgs("servicios", categoria, postId, imagenes);
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
  async addOneImg(collection, category, postId, base64data) {
    const file = base64data;
    const filePath = "img/" + postId;
    let url = await this.getUrl(filePath, file);
    this.afs
      .collection(`${collection}_${category}`)
      .doc(postId)
      .update({ img: url });
  }
  async addManyImgs(collection, category, postId, base64data) {
    let urls = [];
    for (let i = 0; i < base64data.length; i++) {
      const file = base64data[i];
      const filePath = "img/" + postId + "_" + i;
      let url = await this.getUrl(filePath, file);
      urls.push(url);
    }
    this.afs
      .collection(`${collection}_${category}`)
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
