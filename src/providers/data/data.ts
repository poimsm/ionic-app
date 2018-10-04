import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from "firebase/app";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireStorage } from "angularfire2/storage";
import { finalize } from "rxjs/operators";
import "firebase/storage";
import { Query } from "@firebase/firestore-types";
import { map, mergeMap, switchMap } from "rxjs/operators";
import { from } from "rxjs";

export interface Usuario {
  userName: string;
  userId: string;
  userImg: string;
  fecha: number;
  contactInit: string;
  savedPostInit: string;
  savedProductInit: string;
  reputation: number;
  store: boolean;
}
export interface Product {
  title: string;
  description: string;
  price: number;
  city: string;
  fecha: number;
  userName: string;
  userId: string;
  userImage: string;
  sumScores: number;
  totalVotes: number;
  meanScore: number;
  totalReviews: number;
  totalLikes: number;
  totalImages: number;
  day_totalPoints: number;
}
export interface Post {
  name: string;
  title: string;
  description: string;
  price: number;
  city: string;
  fecha: number;
  userId: string;
  userImage: string;
  highlights: number;
  totalComments: number;
  totalLikes: number;
  totalImages: number;
  totalTags: number;
  totalViews: number;
  day_totalPoints: number;
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
export interface Categoria {
  postId: string;
  category: string;
}
export interface LikedPost {
  name: string;
  title: string;
  description: string;
  price: number;
  city: string;
  postId: string;
  whoLikedUserId_fecha: string;
}
export interface Imagen {
  postId: string;
  url: string;
}

@Injectable()
export class DataProvider {
  postId: string;
  user: any;
  imagenes = [];
  lastKey: string;
  usuario: any;

  constructor(
    public toastCtrl: ToastController,
    private afAuth: AngularFireAuth,
    public afDB: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {
    // this.getRecentPosts().subscribe(x => console.log(x));
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        return;
      }
      this.user = {
        name: user.displayName,
        fecha: new Date().getTime(),
        userId: user.uid,
        photoURL: user.photoURL
      };
      this.afDB
        .object("usuarios/" + this.user.userId)
        .update(this.user)
        .then(() => {
          () => console.log("MMMM");
        })
        .catch(err => {
          console.log("CHHHAAOO", err);
          this.afDB.object("usuarios/" + this.user.userId).set(this.user);
        });
    });
  }
  addProduct(
    titulo,
    descripcion,
    precio: number,
    ciudad,
    categoria,
    archivo,
    usuario
  ) {
    const post: Post = {
      name: usuario.nombre,
      title: titulo,
      description: descripcion,
      price: precio,
      city: ciudad,
      fecha: new Date().getTime(),
      userId: usuario.uid,
      userImage: usuario.imagen,
      highlights: 0,
      totalComments: 0,
      totalLikes: 0,
      totalImages: 0,
      totalTags: 0,
      totalViews: 0,
      day_totalPoints: 0
    };
    this.afDB
      .list(categoria)
      .push(post)
      .then(post => {
        this.addImgStorage(post.key, archivo);
      });
  }
  addCategoria(postId, categoria) {
    const cat: Categoria = {
      postId: postId,
      category: categoria
    };
    this.afDB.list("categorias").push(cat);
  }
  addSavedProduct(nombre, titulo, descripcion, precio, ciudad, postId) {
    const post: LikedPost = {
      name: nombre,
      title: titulo,
      description: descripcion,
      price: precio,
      city: ciudad,
      postId: postId,
      whoLikedUserId_fecha: this.user.userId + "_" + new Date().getTime()
    };
    this.afDB.list("likedPosts").push(post);
  }
  addImagenByPost(postId, url) {
    const imagen: Imagen = {
      postId: postId,
      url: url
    };
    this.afDB.list("imagenes").push(imagen);
  }
  addImgStorage(postId, base64data) {
    const metadata = {
      contentType: "image",
      cacheControl: "public, max-age=31536000"
    };
    const file = "data:image/jpg;base64," + base64data;
    const fileName = new Date().valueOf().toString();
    const filePath = "img/" + postId;
    const ref = this.storage.ref(filePath);
    ref.putString(file, "data_url").then(() => {
      const downloadURL = ref.getDownloadURL().subscribe(url => {
        this.addImagenByPost(postId, url);
      });
    });
  }
  presentToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  addLikedPostAnchor(fecha) {
    const post = {
      whoLikedUserId_fecha: this.user.userId + "_" + fecha
    };
    this.afDB.list("likedPosts").push(post);
  }
  anchorLikedPostInit() {
    const usuario: any = this.afDB.object("usuarios/" + this.user.userId);
    return usuario.valueChanges().map(doc => {
      if (doc.likedPostInit === undefined) {
        this.addLikedPostAnchor(0);
        this.addLikedPostAnchor(2553476400000);
        this.afDB.object("usuarios/" + this.user.userId).update({
          likedPostInit: "initialized"
        });
      }
    });
  }
  // ----------------------------------------------------
  //           GETS
  // ----------------------------------------------------
  getBestPosts(categoria) {
    return this.afDB
      .list(categoria, ref => ref.orderByChild("day_totalPoints"))
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return doc.key;
          });
        }),
        switchMap(Ids => {
          return this.getImages(Ids);
        }),
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.key,
              ...doc.payload.val()
            };
          });
        })
      );
  }
  getRecentPosts(categoria) {
    return this.afDB
      .list(categoria, ref => ref.orderByChild("fecha"))
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return doc.key;
          });
        }),
        switchMap(Ids => {
          return this.getImages(Ids);
        }),
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.key,
              ...doc.payload.val()
            };
          });
        })
      );
  }
  getImages(ids: string[]) {
    return from(ids).pipe(
      mergeMap(id =>
        this.afDB
          .list("imagenes", ref => ref.orderByChild("postId").equalTo(id))
          .snapshotChanges()
      )
    );
  }
  getRecentPosts2() {
    return this.afDB
      .list("posts", ref => ref.orderByChild("fecha"))
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.key,
              ...doc.payload.val()
            };
          });
        }),
        mergeMap(posts => {
          console.log("post", posts);

          for (const post of posts) {
            return this.afDB
              .list("imagenes", ref =>
                ref.orderByChild("postId").equalTo(post.id)
              )
              .snapshotChanges();
          }
        }),
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.key,
              ...doc.payload.val()
            };
          });
        })
      );
  }
}
