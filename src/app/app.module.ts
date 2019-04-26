import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { QRCodeModule } from 'angularx-qrcode';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { FirebaseMessaging } from "@ionic-native/firebase-messaging";
// import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';

import { ImagePicker } from "@ionic-native/image-picker";
import { PipesModule } from "../pipes/pipes.module";
import { Camera } from "@ionic-native/camera";
import { IonicStorageModule } from "@ionic/storage";
import { AppVersion } from "@ionic-native/app-version";
import { FileTransfer } from "@ionic-native/file-transfer";
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from '@agm/core';


export const firebaseConfig = {
  apiKey: "AIzaSyAUecL57weWVkb-4OR0TBCM1f18tHgqi5M",
  authDomain: "joopiter-3af7f.firebaseapp.com",
  databaseURL: "https://joopiter-3af7f.firebaseio.com",
  projectId: "joopiter-3af7f",
  storageBucket: "joopiter-3af7f.appspot.com",
  messagingSenderId: "873508722787"
};

import {
  HomePage,
  LoginPage,
  OncePage,
  UsuarioPage,
  OnceContentPage,
  DatosPersonalesPage,
  UpgradePage,
  FormularioPage,
  CarroContentPage,
  CarroPage,
  CarroPagarPage,
  CarroCompraExitosaPage,
  MisPedidosPage,
  MisPedidosContentPage,
  EstiloPage,
  EstiloContentPage,
  WishlistPage,
  ComidaPage,
  ComidaContentPage,
  EcommercePage,
  EcommerceContentPage,
  InformacionesPage,
  LavadoContentPage,
  LavadoPage,
  AlquilerPage,
  AlquilerContentPage,
  SuperPage,
  SuperContentPage,
  MascotasPage,
  MascotasContentPage,
  MueblesPage,
  MueblesContentPage,
  InscripcionPage,
  IntroduccionPage,
  Muebles2Page,
  MueblesCustomPage,
  MueblesDimensionPage,
  BellezaPage,
  BellezaContentPage,
  TiendaMascotasPage,
  TiendaMascotasProductosPage,
  TiendaMascotasNuevoPage,
  TiendaMascotasVentasPage,
  TiendaMascotasCodigoPage,
  TiendaMascotasNormalPage,
  TiendaMascotasCuponPage,
  TiendaMascotasPaquetePage,
  TiendaMascotasAgendaPage,
  TiendaMascotasDatosPage,
  TiendaMascotasInfoPage,
  TiendaMascotasStartPage,
  BikeMapaPage,
  BikePage,
  BikeRiderPage,
  BikeHistorialPage,
  BikeProgramarPage,
  FormularioInscripcionPage,
  FormularioStartPage,
  SuperTiendasPage,
  SuperCategoriasPage,
  SuperProductosPage,
  BikeIntroPage,
  BikeDireccionPage,
  UsuarioHistorialCuponPage,
  UsuarioHistorialPaquetePage,
  UsuarioHistorialPage,
  MascotasOfertaPage,
  MascotasPaquetePage,
  MascotasReservasPage,
  TiendaMascotasGaleriaPage,
  TiendaMascotasMapaPage
} from "../pages/index.pages";
import { MyApp } from "./app.component";
import { DataProvider } from "../providers/data/data";
import { AuthProvider } from "../providers/auth/auth";
import { HttpClientModule } from "@angular/common/http";
import { PopupsProvider } from "../providers/popups/popups";
import { CarroProvider } from "../providers/carro/carro";
import { ImageProvider } from "../providers/image/image";
import { LocalizacionProvider } from "../providers/localizacion/localizacion";
import { ConfigProvider } from "../providers/config/config";
import { BikeProvider } from '../providers/bike/bike';
import { MascotasProvider } from '../providers/mascotas/mascotas';
import { SemanaProvider } from '../providers/semana/semana';
import { MaquetaProvider } from '../providers/maqueta/maqueta';

// Custom Components
import { SeccionesComponent } from "../components/secciones/secciones";
import { SeccionesProvider } from '../providers/secciones/secciones';
import { FormularioHorarioComponent } from "../components/formulario-horario/formulario-horario";
import { ControlProvider } from '../providers/control/control';



@NgModule({
  declarations: [
    MyApp,
    SeccionesComponent,
    FormularioHorarioComponent,
    HomePage,
    LoginPage,
    OncePage,
    UsuarioPage,
    OnceContentPage,
    DatosPersonalesPage,
    UpgradePage,
    FormularioPage,
    CarroContentPage,
    CarroPage,
    CarroPagarPage,
    CarroCompraExitosaPage,
    MisPedidosPage,
    MisPedidosContentPage,
    EstiloPage,
    EstiloContentPage,
    WishlistPage,
    ComidaPage,
    ComidaContentPage,
    EcommercePage,
    EcommerceContentPage,
    InformacionesPage,
    LavadoContentPage,
    LavadoPage,
    AlquilerPage,
    AlquilerContentPage,
    SuperPage,
    SuperContentPage,
    MascotasPage,
    MascotasContentPage,
    MueblesPage,
    MueblesContentPage,
    InscripcionPage,
    IntroduccionPage,
    Muebles2Page,
    MueblesCustomPage,
    MueblesDimensionPage,
    BellezaPage,
    BellezaContentPage,
    TiendaMascotasPage,
    TiendaMascotasProductosPage,
    TiendaMascotasNuevoPage,
    TiendaMascotasVentasPage,
    TiendaMascotasCodigoPage,
    TiendaMascotasNormalPage,
    TiendaMascotasCuponPage,
    TiendaMascotasPaquetePage,
    TiendaMascotasAgendaPage,
    TiendaMascotasDatosPage,
    TiendaMascotasInfoPage,
    TiendaMascotasStartPage,
    BikeMapaPage,
    BikePage,
    BikeRiderPage,
    BikeHistorialPage,
    BikeProgramarPage,
    FormularioInscripcionPage,
    FormularioStartPage,
    SuperTiendasPage,
    SuperCategoriasPage,
    SuperProductosPage,
    BikeIntroPage,
    BikeDireccionPage,
    UsuarioHistorialCuponPage,
    UsuarioHistorialPaquetePage,
    UsuarioHistorialPage,
    MascotasOfertaPage,
    MascotasPaquetePage,
    MascotasReservasPage,
    TiendaMascotasGaleriaPage,
    TiendaMascotasMapaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { backButtonText: "Atras" }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    PipesModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDrc_AM9eMidi_yXt0h7q-orH0vt9D13vk',
      libraries: ['places']
    }),
    QRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    OncePage,
    UsuarioPage,
    OnceContentPage,
    DatosPersonalesPage,
    UpgradePage,
    FormularioPage,
    CarroContentPage,
    CarroPage,
    CarroPagarPage,
    CarroCompraExitosaPage,
    MisPedidosPage,
    MisPedidosContentPage,
    EstiloPage,
    EstiloContentPage,
    WishlistPage,
    ComidaPage,
    ComidaContentPage,
    EcommercePage,
    EcommerceContentPage,
    InformacionesPage,
    LavadoContentPage,
    LavadoPage,
    AlquilerPage,
    AlquilerContentPage,
    SuperPage,
    SuperContentPage,
    MascotasPage,
    MascotasContentPage,
    MueblesPage,
    MueblesContentPage,
    InscripcionPage,
    IntroduccionPage,
    Muebles2Page,
    MueblesCustomPage,
    MueblesDimensionPage,
    BellezaPage,
    BellezaContentPage,
    TiendaMascotasPage,
    TiendaMascotasProductosPage,
    TiendaMascotasNuevoPage,
    TiendaMascotasVentasPage,
    TiendaMascotasCodigoPage,
    TiendaMascotasNormalPage,
    TiendaMascotasCuponPage,
    TiendaMascotasPaquetePage,
    TiendaMascotasAgendaPage,
    TiendaMascotasDatosPage,
    TiendaMascotasInfoPage,
    TiendaMascotasStartPage,
    BikeMapaPage,
    BikePage,
    BikeRiderPage,
    BikeHistorialPage,
    BikeProgramarPage,
    FormularioInscripcionPage,
    FormularioStartPage,
    SuperTiendasPage,
    SuperCategoriasPage,
    SuperProductosPage,
    BikeIntroPage,
    BikeDireccionPage,
    UsuarioHistorialCuponPage,
    UsuarioHistorialPaquetePage,
    UsuarioHistorialPage,
    MascotasOfertaPage,
    MascotasPaquetePage,
    MascotasReservasPage,
    TiendaMascotasGaleriaPage,
    TiendaMascotasMapaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataProvider,
    ImagePicker,
    Camera,
    AuthProvider,
    FirebaseMessaging,
    AppVersion,
    PopupsProvider,
    CarroProvider,
    FileTransfer,
    InAppBrowser,
    ImageProvider,
    LocalizacionProvider,
    ConfigProvider,
    BikeProvider,
    Geolocation,
    MascotasProvider,
    BarcodeScanner,
    SemanaProvider,
    MaquetaProvider,
    SeccionesProvider,
    ControlProvider,

    // AngularFireDatabase
  ]
})
export class AppModule { }
