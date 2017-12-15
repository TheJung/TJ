import { FilesCollection } from 'meteor/ostrio:files';

interface UploadConfigs {
  file: File | any | string;
  isBase64?: Boolean;
  meta?: any;
  transport?: string;
  ddp?: any;
  onStart?: (error, fileData) => void;
  onUploaded?: (error, fileRef) => void;
  onAbort?: (fileData) => void;
  onError?: (error, fileData) => void;
  onProgress?: (progress: number, fileData) => void;
  onBeforeUpload?: (fileData) => Boolean;
  streams?: number | any;
  chunkSize?: number | any;
  allowWebWorkers?: Boolean;
  autoStart?: Boolean;
}

interface FSCollection {
  allowClientCode: Boolean;
  chunkSize: number;
  collection: Mongo.Collection<any>;
  collectionName: string;
  ddp: { isProduction: Boolean, isDevelopment: Boolean, isClient: Boolean, isServer: Boolean, isCordova: Boolean };
  debug: Boolean;
  disableUpload: Boolean;
  downloadRoute: string;
  namingFunction: Boolean;
  onBeforeUpload: (file) => void;
  onbeforeunloadMessage: string;
  public: Boolean
  schema: {
    extension: {optional: Boolean, type: () => any},
    isAudio: {type: () => any},
    isImage: {type: () => any},
    isJSON: {type: () => any},
    isPDF: {type: () => any},
    isText: {type: () => any},
    isVideo: {type: () => any},
    meta: {blackbox: Boolean, optional: Boolean, type: () => any},
    name: {type: () => any},
    path: {type: () => any},
    public: {optional: true, type: () => any},
    size: {type: () => any},
    type: {type: () => any},
    updatedAt: {optional: true, type: () => any},
    userId: {optional: true, type: () => any},
    versions: {blackbox: true, type: () => any},
    _collectionName: {type: () => any},
    _downloadRoute: {type: () => any},
    _storagePath: {type: () => any}
  };
  _events: any;
  _eventsCount: number;
  _methodNames: {_Abort: string, _Write: string, _Start: string, _Remove: string};
  _supportWebWorker: Boolean;
  _webWorkerUrl: string;
  insert: (config: UploadConfigs, ...args) => any;
  remove: () => any;
  _getMimeType: (fileData) => any;
  _getUser: () => any;
}

export class FilesHelper {
  private filesCollection: FSCollection;

  constructor(collectionName: string, allowClientCode: Boolean, onBeforeUpload: (file: File) => Boolean | string) {
    this.filesCollection = new FilesCollection({
      collectionName: collectionName,
      allowClientCode: allowClientCode, // Disallow remove files from Client
      onBeforeUpload: onBeforeUpload
    });
  }

  get collection() {
    return this.filesCollection;
  }

}