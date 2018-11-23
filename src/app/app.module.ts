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
  HomePage,
  PerfilPage,
  LoginPage,
  ProductoPage,
  PublicacionesPage,
  TiendaPage,
  UserPage,
  CommentsPage,
  CestaPage,
  BestPage,
  NewServicePage,
  CuponPage,
  CabanaPage,
  PedidosPage,
  PopCategoriasPage,
  ExplorarPage,
  ExplorarContentPage,
  CalendarioPage,
  PacksPage,
  MesPage,
  ServiceCalendarPage
} from "../pages/index.pages";
import { MyApp } from "./app.component";
import { DataProvider } from "../providers/data/data";
import { UserProvider } from "../providers/user/user";
import { AuthProvider } from "../providers/auth/auth";
import { SubirProvider } from "../providers/subir/subir";
import { ProductProvider } from "../providers/product/product";
import { LikeComentProvider } from "../providers/like-coment/like-coment";
import { BasketProvider } from "../providers/basket/basket";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PerfilPage,
    LoginPage,
    ProductoPage,
    PublicacionesPage,
    TiendaPage,
    UserPage,
    CommentsPage,
    CestaPage,
    BestPage,
    NewServicePage,
    CuponPage,
    CabanaPage,
    PedidosPage,
    PopCategoriasPage,
    ExplorarPage,
    ExplorarContentPage,
    CalendarioPage,
    PacksPage,
    MesPage,
    ServiceCalendarPage
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
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PerfilPage,
    LoginPage,
    ProductoPage,
    PublicacionesPage,
    TiendaPage,
    UserPage,
    CommentsPage,
    CestaPage,
    BestPage,
    NewServicePage,
    CuponPage,
    CabanaPage,
    PedidosPage,
    PopCategoriasPage,
    ExplorarPage,
    ExplorarContentPage,
    CalendarioPage,
    PacksPage,
    MesPage,
    ServiceCalendarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AngularFireDatabase,
    DataProvider,
    ImagePicker,
    UserProvider,
    Facebook,
    Camera,
    AuthProvider,
    SubirProvider,
    ProductProvider,
    LikeComentProvider,
    BasketProvider
  ]
})
export class AppModule {}
