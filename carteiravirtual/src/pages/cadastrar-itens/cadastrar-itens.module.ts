import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastrarItensPage } from './cadastrar-itens';

@NgModule({
  declarations: [
    CadastrarItensPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastrarItensPage),
  ],
})
export class CadastrarItensPageModule {}
