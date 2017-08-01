import { Component } from '@angular/core';
import { FhPage } from '../fh/fh';

import {
  ActionSheet,
  ActionSheetController,
  Config,
  NavController,
  ModalController,
  AlertController
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
    public modalCtrl: ModalController,
    public alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {

  this.storage.get('firstName').then((val) => {
    if(val = null)
    this.showPrompt();
  });

    callLambda("GET");

  }

ionViewWillEnter()
{
    this.storage.get('loggedIn').then((val) => {
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


showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Start',
      message: "Enter the name of your loved one who has passed",
      inputs: [
        {
          name: 'firstName',
          placeholder: 'First Name'
        },
        {
          name: 'lastName',
          placeholder: 'Last Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {

            this.storage.set('firstName', data.firstName);
            this.storage.set('lastName', data.lastName);
            console.log('Saved clicked' + data.firstName);
          }
        }
      ]
    });
    prompt.present();
  }

}

