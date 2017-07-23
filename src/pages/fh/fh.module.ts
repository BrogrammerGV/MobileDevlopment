import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FhPage } from './fh';

@NgModule({
  declarations: [
    FhPage,
  ],
  imports: [
    IonicPageModule.forChild(FhPage),
  ],
  exports: [
    FhPage
  ]
})
export class FhPageModule {}
