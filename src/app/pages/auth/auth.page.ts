import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.mode';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('',  [Validators.required, Validators.email]),
    password: new FormControl('',  [Validators.required])
  })

  firebaseSvc = inject(FirebaseService)
  utilsSvc = inject(UtilsService);

  ngOnInit() {
  }

  async submit(){

    if(this.form.valid){

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signIn(this.form.value as User)
      .then( res => console.log(res))
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
