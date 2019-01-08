import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { DatePicker } from '@ionic-native/date-picker';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

    options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  clickedImage: any;
  
  
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  email: any;
  name: any;
  quantity:any;
  mydate;


  medicine: any ={
    name:'',
    quantity:'',
    date:''
  }
  constructor(public db: AngularFireDatabase, private datePicker: DatePicker, public alertCtrl: AlertController, private camera: Camera, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
  
  }

  //GENERAL ALERT FUNCTION
  alert(message: string){
    this.alertCtrl.create({
      title: 'Info',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  openCamera(){
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.clickedImage = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      this.alert("Camera Not Found");
     });
  }

 

  datePick(){
  
    
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
      
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err),
      
    );
  }

  submit(){
    this.db.list('/medicines').push(this.medicine);
    this.navCtrl.push(HomePage);
  }
}
