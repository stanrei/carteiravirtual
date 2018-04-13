import { ContactProvider } from './../../providers/contact/contact';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { FingerprintAIO ,FingerprintOptions} from '@ionic-native/fingerprint-aio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  contacts: Observable<any>;
  fingerprintOptions : FingerprintOptions;
  constructor(public navCtrl: NavController, private provider: ContactProvider,
    private toast: ToastController,
    private fingerAuth: FingerprintAIO) {

    this.contacts = this.provider.getAll();
  }

  newContact() {
    this.navCtrl.push('ContactEditPage');
  }

  editContact(contact: any) {
    // Maneira 1
    this.navCtrl.push('ContactEditPage', { contact: contact });

    // Maneira 2
    // this.navCtrl.push('ContactEditPage', { key: contact.key });
  }

  removeContact(key: string) {
    if (key) {
      this.provider.remove(key)
        .then(() => {
          this.toast.create({ message: 'Contato removido sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover o contato.', duration: 3000 }).present();
        });
    }
  }
  public showFingerprintAuthDlg(){
    this.fingerprintOptions = {
      clientId: 'fingerprint-Demo',
      clientSecret: 'password', //Only necessary for Android
      disableBackup:true  //Only for Android(optional)
    }
    this.fingerAuth.isAvailable().then(result =>{
      if(result === "OK")
      {
        this.fingerAuth.show(this.fingerprintOptions)
          .then((result: any) => console.log(result))
          .catch((error: any) => console.log(error));
      }
    });
  }
}
