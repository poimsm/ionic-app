import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from "@ionic-native/file-transfer";

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

    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = `${this.apiURL}/images/upload`;

    // File for Upload
    var targetPath = img;

    var options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: 'multipart/form-data'
    };
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options)
      .then(() => {
        console.log('SUBIIIIIOOOOOOOOOOOOOOOOOO');
      }, (err) => {
        console.log('eeerrrOOOOOOOOOOOOOOOOOO');
      })
  }


}
