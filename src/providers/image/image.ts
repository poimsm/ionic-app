import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from "@ionic-native/file-transfer/ngx";

@Injectable()
export class ImageProvider {
  apiURL: string;

  constructor(
    public http: HttpClient,
    private transfer: FileTransfer,
    private platform: Platform
  ) {
    this.setAPI();
  }

  setAPI() {
    if (this.platform.is('cordova')) {
      this.apiURL = 'https://poimsm-server.herokuapp.com';
    } else {
      this.apiURL = 'http://localhost:3000';
    }
  }

  uploadImage(img) {
    console.log('PREVIOO?');

    const fileTransfer: FileTransferObject = this.transfer.create();

    console.log('ENTROOO AKA');

    const url = `${this.apiURL}/images/upload`;

    // File for Upload
    var targetPath = img;

    var options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: 'multipart/form-data'
    };
    console.log('ENTROOOO AKII');

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options)
      .then(() => {
        console.log('SUBIIIIIOOOOOOOOOOOOOOOOOO');
      }, (err) => {
        console.log('eeerrrOOOOOOOOOOOOOOOOOO');
      })
  }


}
