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
  LoginPage,
  OncePage,
  DeportePage,
  UsuarioPage,
  RecreacionPage,
  FrutaPage,
  OnceContentPage,
  FrutaContentPage,
  CategoriasPage,
  DatosPersonalesPage,
  MisComprasPage
} from "../pages/index.pages";
import { MyApp } from "./app.component";
import { DataProvider } from "../providers/data/data";
import { AuthProvider } from "../providers/auth/auth";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    OncePage,
    DeportePage,
    UsuarioPage,
    RecreacionPage,
    FrutaPage,
    OnceContentPage,
    FrutaContentPage,
    CategoriasPage,
    DatosPersonalesPage,
    MisComprasPage
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
    LoginPage,
    OncePage,
    DeportePage,
    UsuarioPage,
    RecreacionPage,
    FrutaPage,
    OnceContentPage,
    FrutaContentPage,
    CategoriasPage,
    DatosPersonalesPage,
    MisComprasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AngularFireDatabase,
    DataProvider,
    ImagePicker,
    Facebook,
    Camera,
    AuthProvider
  ]
})
export class AppModule {}
