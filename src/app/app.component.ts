import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  passphrase = '';
  inputText = '';
  outputText = '';
  mode = 'Encryption';
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
    switch (this.mode) {
      case 'Encryption': {
        const encrypted = CryptoJS.AES.encrypt(this.inputText, this.passphrase);
        this.outputText = encodeURIComponent(encrypted.toString());
      }; break
      case 'Decryption': {
        const decrypted = CryptoJS.AES.decrypt(decodeURIComponent(this.inputText), this.passphrase);
        this.outputText = decrypted.toString(CryptoJS.enc.Utf8);
        if (this.outputText == '') {
          alert('Error: bad decrypt')
        }
      }; break
    }
  }

}
