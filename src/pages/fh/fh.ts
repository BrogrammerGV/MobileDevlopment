import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SpeakerListPage } from "../speaker-list/speaker-list"

/**
 * Generated class for the FhPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare let callLambda: any;
declare let dataJson: any;



@IonicPage()
@Component({
  selector: 'page-fh',
  templateUrl: 'fh.html',
})
export class FhPage {
  /** ngModelVariables  for Data Submission */
dispositioni: any
crematory: any
disposition: any
fhdirector: any
physicianName: any
jsonObject: any



  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) 
  
  {
     

  }


ionViewCanEnter()
{
  callLambda("GET");
}

  ionViewDidLoad() 
  {
   //callLambda("GET");
     console.log('FH Data Loaded: ');

     if(dataJson != null)
     {

       console.log(dataJson);
          this.getRecord();
     }
     
  }

makeDataJSON()
{
  console.log(this.disposition + ' ' + this.crematory + this.fhdirector + ' ' + this.physicianName);

}



insertRecord()
{var jsonBuilder = 
  {
    "dispositioni": this.dispositioni,
    "disposition": this.disposition, 
    "crematory": this.crematory, 
    "fhdirector": this.fhdirector, 
    "physicianName": this.physicianName,
    "fullname": this.navParams.get('fullname'),
    "gender": this.navParams.get('gender')

  

  }
  callLambda("POST", jsonBuilder);

  this.navCtrl.push(SpeakerListPage);
}

getRecord()
{
  console.log("getRecordStarted**")


this.disposition = dataJson.disposition;
this.crematory=dataJson.crematory;
this.fhdirector=dataJson.fhdirector;
this.physicianName=dataJson.physicianName;
}

loadFinal()
{
  console.log("FinalCheck:" + dataJson);
}

 presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });

    console.log("PresetStarted**");
    loader.present();
  }



}
