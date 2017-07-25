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

ionViewDidLoad()
{


}

  ionViewWillEnter() {
    this.storage.get('loggedIn').then((val) => {
    console.log('Are You Logged In?:', val);
    if(val != "Yes")
    this.navCtrl.push(SchedulePage);
  });

  }

  goToSessionDetail(session: any) {
    this.navCtrl.push('SessionDetailPage', { sessionId: session.id });
  }



  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Login',
      message: "Enter a name for this new album you're so keen on adding",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
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
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
}



