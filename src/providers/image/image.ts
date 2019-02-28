import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from "@ionic-native/file-transfer";
import { ConfigProvider } from '../config/config';

@Injectable()
export class ImageProvider {
  apiURL: string;

  constructor(
    public http: HttpClient,
    private transfer: FileTransfer,
    private _config: ConfigProvider
  ) {
    this.apiURL = this._config.apiURL;
  }

  uploadImage(img) {

    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = `${this.apiURL}/imgs/upload`;

    var targetPath = img;

    var options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: 'multipart/form-data'
    };
    return fileTransfer.upload(targetPath, url, options);
  }


}
