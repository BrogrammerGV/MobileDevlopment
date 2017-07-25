import { Component } from '@angular/core';
import { FhPage } from '../fh/fh';

import {
  ActionSheet,
  ActionSheetController,
  Config,
  NavController,
  ModalController
} from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ConferenceData } from '../../providers/conference-data';

import { SessionDetailPage } from '../session-detail/session-detail';
import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';
import { SchedulePage } from '../schedule/schedule';
import { Storage } from '@ionic/storage';
import {ModalPage} from '../modal/modal';

declare let callLambda: any;
declare let dataJson: any;


@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html'
})
export class SpeakerListPage {
  actionSheet: ActionSheet;
  speakers: any[] = [];

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public confData: ConferenceData,
    public config: Config,
    public inAppBrowser: InAppBrowser, 
    private storage: Storage,
    public modalCtrl: ModalController
  ) {}

  ionViewDidLoad() {
    //loadingData
    callLambda("GET");
  }

ionViewWillEnter()
{
    this.storage.get('loggedIn').then((val) => {
    console.log('Are You Logged In?:', val);
    if(val != "Yes")
    this.navCtrl.push(SchedulePage);
  });

}

  

  goToMainData() {
    this.navCtrl.push(SpeakerDetailPage);
  }

  goToSpeakerTwitter(speaker: any) {
    this.inAppBrowser.create(
      `https://twitter.com/${speaker.twitter}`,
      '_blank'
    );
  }


goDirectToFH()
{
  this.navCtrl.push(FhPage);
}
     
     
     //Modal Code
      openModal()
      {
        let myModal = this.modalCtrl.create(ModalPage);
        myModal.present();
      }



}

