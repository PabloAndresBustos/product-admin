import { Injectable, inject } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { User } from '../models/user.mode';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);

  /* Authenticacion */
  /* Acceso */
  signIn(user: User){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }
  /* Registro */
  signUp(user: User){
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }
  /* Update */
  updateUser(displayName: string){
    return updateProfile(getAuth().currentUser, {displayName});
  }
}
