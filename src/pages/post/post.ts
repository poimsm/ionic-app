import { Component } from "@angular/core";
import { IonicPage, NavController, PopoverController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { PostExplorarPage } from "../post-explorar/post-explorar";
import { PostPedidosPage } from "../post-pedidos/post-pedidos";
import { PostPacksPage } from "../post-packs/post-packs";
import { PostCuponPage } from "../post-cupon/post-cupon";
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

  constructor(
    public navCtrl: NavController,
    private _auth: AuthProvider,
    public popoverCtrl: PopoverController
  ) {}
  openPage(page) {
    this.navCtrl.push(page);
  }
}
