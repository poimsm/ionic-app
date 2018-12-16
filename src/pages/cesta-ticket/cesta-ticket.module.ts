import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CestaTicketPage } from './cesta-ticket';

@NgModule({
  declarations: [
    CestaTicketPage,
  ],
  imports: [
    IonicPageModule.forChild(CestaTicketPage),
  ],
})
export class CestaTicketPageModule {}
