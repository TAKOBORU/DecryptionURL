import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DecryptionURL';
  passphrase = '';
  ciphertext = '';
  decodetext = '';
  constructor() {
    const params = new URLSearchParams(window.location.search);
    const passphraseParam = params.get('passphrase');
    if (passphraseParam) {
      this.passphrase = passphraseParam;
    }
  }
  convert() {
    if (this.passphrase == '') {
      setTimeout(() => {
        const input = document.querySelector<HTMLInputElement>('input[name="passphrase"]');
        input?.focus();
      });
      return alert(`passphrase can't empty`);
    }
    const decrypted = CryptoJS.AES.decrypt(decodeURIComponent(this.ciphertext), this.passphrase);
    this.decodetext = decrypted.toString(CryptoJS.enc.Utf8);
    if (this.decodetext == '') {
      alert('Error: bad decrypt')
    }

  }
}
