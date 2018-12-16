import { Component } from "@angular/core";
import { IonicPage, NavController, PopoverController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { PostExplorarPage } from "../post-explorar/post-explorar";
import { PostPedidosPage } from "../post-pedidos/post-pedidos";
import { PostPacksPage } from "../post-packs/post-packs";
import { PostCuponPage } from "../post-cupon/post-cupon";
import { PostRecreacionPage } from '../post-recreacion/post-recreacion';
import { PostServiciosPage } from '../post-servicios/post-servicios';
import { PostDeportePage } from '../post-deporte/post-deporte';
import { PostEstudiantePage } from '../post-estudiante/post-estudiante';
@IonicPage()
@Component({
  selector: "page-post",
  templateUrl: "post.html"
})
export class PostPage {

  pedidos = PostPedidosPage;
  packs = PostPacksPage;
  cupon = PostCuponPage;
  explorar = PostExplorarPage;
  recreacion = PostRecreacionPage;
  servicios = PostServiciosPage;
  deporte = PostDeportePage;
  estudiante = PostEstudiantePage;

  constructor(
    public navCtrl: NavController,
    private _auth: AuthProvider,
    public popoverCtrl: PopoverController
  ) {}
  openPage(page) {
    this.navCtrl.push(page);
  }
}
