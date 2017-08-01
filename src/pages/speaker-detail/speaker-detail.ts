import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

import { AlertController } from 'ionic-angular';
import { FhPage } from '../fh/fh';
import { SchedulePage } from '../schedule/schedule';
import {Storage} from '@ionic/storage';

@IonicPage({
  segment: 'speaker/:speakerId'
})
@Component({
  selector: 'page-speaker-detail',
  templateUrl: 'speaker-detail.html'
})



export class SpeakerDetailPage {
  speaker: any;
  gender: any;
  fullname: any;
  dateOfBirth: any;
  birthCountry: any;
  stateofbirth: any;
  dateOfDeath: any;
  countryOfDeath: any;
  deathaddr: any;
  edu: any;
  hispanic: any;
  race: any;
  NameToUse: string;


  constructor(public dataProvider: ConferenceData, public navCtrl: NavController,
   public navParams: NavParams,public alertCtrl: AlertController, private storage: Storage) {
 }

gotToNextDataPage()
{

  //Data Builder to Send to Submission Page
  let data = 
  {
    fullname: this.fullname,
    gender: this.gender,
    dateOfBirth: this.dateOfBirth,
    birthCountry: this.birthCountry,
    stateofbirth: this.stateofbirth,
    dateOfDeath: this.dateOfDeath,
    countryOfDeath: this.countryOfDeath,
    deathaddr: this.deathaddr,
    edu: this.edu,
    hispanic: this.hispanic,
    race: this.race
  }
 
 this.navCtrl.push(FhPage, data)

}

  ionViewWillEnter() {
    this.storage.get('loggedIn').then((val) => {
    if(val != "Yes")
    this.navCtrl.push(SchedulePage);
  });

this.storage.get('firstName').then((val1) => {
  console.log("VAL: " + val1);
  this.NameToUse = val1;
  });

  }

  goToSessionDetail(session: any) {
    this.navCtrl.push('SessionDetailPage', { sessionId: session.id });
  }


}



