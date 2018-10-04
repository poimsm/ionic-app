import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from "firebase/app";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireStorage } from "angularfire2/storage";
import { take } from "rxjs/operators";
import "firebase/storage";
import { map, mergeMap, switchMap } from "rxjs/operators";
import { forkJoin } from "rxjs";
import { from } from "rxjs";
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
export interface Product {
  title: string;
  description: string;
  price: number;
  imgs: object;
  fecha: number;
  productId: string;
  userId: string;
  outfitIds: object;
  tallaColores: object;
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
export class SubirProvider {
  private products: AngularFirestoreCollection;
  private subProducts: AngularFirestoreCollection;
  private images: AngularFirestoreCollection;

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
          // this.afs
          //   .doc(categoria + "/" + postId)
          //   .update({ productIds: { ...ids } });
          resolve(postId);
          // for (let id of ids) {
          //   this.updateSelectedProduct(id, postId);
          // }
        });
    });
  }
  addProduct(titulo, descripcion, precio, TallaColores, imagenes, userId) {
    const postId = this.afs.createId();
    const product: Product = {
      title: titulo,
      description: descripcion,
      price: precio,
      imgs: {},
      outfitIds: {},
      fecha: new Date().getTime(),
      userId: userId,
      productId: postId,
      tallaColores: { ...TallaColores }
    };
    this.afs
      .collection("products")
      .doc(postId)
      .set(product)
      .then(data => {
        this.addImgByProduct(postId, imagenes);
      });
  }
  addSavedProduct(nombre, titulo, descripcion, precio, ciudad, postId, user) {
    const post: SavedProduct = {
      userName: nombre,
      title: titulo,
      description: descripcion,
      price: precio,
      city: ciudad,
      productId: postId,
      whoLikedUserId_fecha: user.userId + "_" + new Date().getTime()
    };
    this.afs.collection("savedProducts").add(post);
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
  // async addImgByProduct(postId, base64data) {
  //   let urls = [];
  //   for (let i = 0; i < base64data.length; i++) {
  //     const file = "data:image/jpg;base64," + base64data[i];
  //     const filePath = "img/" + postId + "_" + i;
  //     let url = await this.getUrl(filePath, file);
  //     urls.push(url);
  //   }
  //   this.afs
  //     .collection("products")
  //     .doc(postId)
  //     .update({ imgs: { ...urls } });
  // }
  async addImgByProduct(postId, base64data) {
    let urls = [];
    for (let i = 0; i < base64data.length; i++) {
      const file = base64data[i];
      const filePath = "img/" + postId + "_" + i;
      let url = await this.getUrl(filePath, file);
      urls.push(url);
    }
    this.afs
      .collection("products")
      .doc(postId)
      .update({ imgs: { ...urls } });
  }
  addImgs(postId, urls) {
    let img = {
      postId,
      imgs: { ...urls }
    };
    this.afs.collection("images").add(img);
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
    this.subProducts = this.afs.collection("user", ref =>
      ref.where("userId", "==", id)
    );
    return this.subProducts.valueChanges();
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
  getOutfitById(category, id) {
    this.subProducts = this.afs.collection(category, ref =>
      ref.where("userId", "==", id)
    );
    return this.subProducts.snapshotChanges().pipe(
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
  getOutfitByUserId(categories: string[], id) {
    return from(categories).pipe(
      mergeMap(category => this.getOutfitById(category, id))
    );
  }
  getProductById(field, id) {
    this.subProducts = this.afs.collection("products", ref =>
      ref.where(field, "==", id)
    );
    return this.subProducts.snapshotChanges().pipe(
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
  getImages2(ids: string[]) {
    return from(ids).pipe(
      mergeMap(id =>
        this.afDB
          .list("imagenes", ref => ref.orderByChild("postId").equalTo(id))
          .snapshotChanges()
      )
    );
  }
  getProductByOutfitId(ids: string[]) {
    return from(ids).pipe(
      mergeMap(id =>
        this.afs
          .collection("products", ref => ref.where("productId", "==", id))
          .valueChanges()
      )
    );
  }
  getProductByOutfitId2(ids: string[]) {
    return forkJoin(
      from(ids).pipe(
        mergeMap(id =>
          this.afs
            .collection("products", ref => ref.where("productId", "==", id))
            .valueChanges()
        )
      )
    );
  }
  // async getProductByOutfitId2(ids) {
  //   return new Promise ((resolve, reject) => {
  //     let products = [];
  //     for (let id of ids) {
  //       let product = await this.getProductById("productId", id);
  //       products.push(product);
  //     }
  //     resolve(products)
  //   })
  // }

  getSubProductsImgs(subProductId) {
    this.images = this.afs.collection("imagenes", ref =>
      ref.where("postId", "==", subProductId)
    );
    return this.images.snapshotChanges().pipe(
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
  updateSelectedProduct(id, outfitId) {
    this.afs.doc("products/" + id).update({ outfitId });
  }
  async updateSelectedProducts(products, outfitId) {
    for (let product of products) {
      if (product.active) {
        const data: any = await this.getOneProduct(product.doc.id);
        const outfitIds = data[0].outfitIds;
        const keys = Object.keys(outfitIds);
        outfitIds[keys.length] = outfitId;
        this.afs.doc("products/" + product.doc.id).update({ outfitIds });
      }
    }
  }
  getOneProduct(id: string) {
    return this.afs
      .collection("products", ref => ref.where("productId", "==", id))
      .valueChanges()
      .pipe(take(1))
      .toPromise();
  }
}
