import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.mode';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.page.html',
  styleUrls: ['./sing-up.page.scss'],
})
export class SingUpPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('',  [Validators.required, Validators.email]),
    password: new FormControl('',  [Validators.required]),
    name: new FormControl('',  [Validators.required, Validators.minLength(6)])
  })

  firebaseSvc = inject(FirebaseService)
  utilsSvc = inject(UtilsService);

  ngOnInit() {
  }

  async submit(){

    if(this.form.valid){

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signUp(this.form.value as User)
      .then( async res => {
        await this.firebaseSvc.updateUser(this.form.value.name)
        console.log(res)
      })
      .catch(error => {

        console.log(error);

        this.utilsSvc.presentToast({
          message: 'Usuario o contraseña no validos',
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-cicle-outline'
        });

      })
      .finally(() => loading.dismiss())

    }
  }

}
