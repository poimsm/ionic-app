import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule } from "angularfire2/storage";
import {
  AngularFireDatabaseModule,
  AngularFireDatabase
} from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";

import { ImagePicker } from "@ionic-native/image-picker";
import { PipesModule } from "../pipes/pipes.module";
import { Facebook } from "@ionic-native/facebook";
import { Camera } from "@ionic-native/camera";
import { IonicStorageModule } from "@ionic/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyDbblV3zsLhNYwlHX_5_njNJj6KYXxEJi4",
  authDomain: "joopiterapp-2a5e4.firebaseapp.com",
  databaseURL: "https://joopiterapp-2a5e4.firebaseio.com",
  projectId: "joopiterapp-2a5e4",
  storageBucket: "joopiterapp-2a5e4.appspot.com",
  messagingSenderId: "140100374140"
};

import {
  AjustesPage,
  HomePage,
  PerfilPage,
  NotificacionesPage,
  FollowPage,
  MessagePage,
  LoginPage,
  ProductoPage,
  BlogsPage,
  SubproductoPage,
  EjemploPage,
  ReviewPage,
  DescuentosPage,
  PublicacionesPage,
  CuponesPage,
  NuevaTiendaPage,
  TiendaPage,
  GuardadoPage,
  PedidosPage,
  FiltrosPage,
  BlogContentPage,
  PopBlogPage,
  UserPage,
  CommentsPage,
  ListPage,
  MarketPage,
  NewProductPage,
  NewBlogPage,
  NewOutfitPage,
  OutfitsPage,
  RoomsPage,
  DeliveryPage,
  CestaPage,
  DirectionPage
} from "../pages/index.pages";
import { MyApp } from "./app.component";
import { BrowserProvider } from "../providers/browser/browser";
import { DataProvider } from "../providers/data/data";
import { UserProvider } from "../providers/user/user";
import { AuthProvider } from "../providers/auth/auth";
import { SubirProvider } from "../providers/subir/subir";
import { BlogProvider } from "../providers/blog/blog";
import { FollowProvider } from "../providers/follow/follow";
import { MarketProvider } from "../providers/market/market";
import { OutfitProvider } from "../providers/outfit/outfit";
import { ProductProvider } from "../providers/product/product";
import { LikeComentProvider } from "../providers/like-coment/like-coment";
import { NotificationProvider } from "../providers/notification/notification";
import { BasketProvider } from '../providers/basket/basket';

@NgModule({
  declarations: [
    MyApp,
    AjustesPage,
    HomePage,
    PerfilPage,
    NotificacionesPage,
    FollowPage,
    MessagePage,
    LoginPage,
    ProductoPage,
    BlogsPage,
    SubproductoPage,
    EjemploPage,
    ReviewPage,
    DescuentosPage,
    PublicacionesPage,
    CuponesPage,
    NuevaTiendaPage,
    TiendaPage,
    GuardadoPage,
    PedidosPage,
    FiltrosPage,
    BlogContentPage,
    PopBlogPage,
    UserPage,
    CommentsPage,
    ListPage,
    MarketPage,
    NewProductPage,
    NewBlogPage,
    NewOutfitPage,
    OutfitsPage,
    RoomsPage,
    DeliveryPage,
    CestaPage,
    DirectionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { backButtonText: "Atras" }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    PipesModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AjustesPage,
    HomePage,
    PerfilPage,
    NotificacionesPage,
    FollowPage,
    MessagePage,
    LoginPage,
    ProductoPage,
    BlogsPage,
    SubproductoPage,
    EjemploPage,
    ReviewPage,
    DescuentosPage,
    PublicacionesPage,
    CuponesPage,
    NuevaTiendaPage,
    TiendaPage,
    GuardadoPage,
    PedidosPage,
    FiltrosPage,
    BlogContentPage,
    PopBlogPage,
    UserPage,
    CommentsPage,
    ListPage,
    MarketPage,
    NewProductPage,
    NewBlogPage,
    NewOutfitPage,
    OutfitsPage,
    RoomsPage,
    DeliveryPage,
    CestaPage,
    DirectionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BrowserProvider,
    AngularFireDatabase,
    DataProvider,
    ImagePicker,
    UserProvider,
    Facebook,
    Camera,
    AuthProvider,
    SubirProvider,
    BlogProvider,
    FollowProvider,
    MarketProvider,
    OutfitProvider,
    ProductProvider,
    LikeComentProvider,
    NotificationProvider,
    BasketProvider
  ]
})
export class AppModule {}
