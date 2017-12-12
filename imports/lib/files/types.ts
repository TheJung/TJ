interface FileCursor {
  remove: (callback) => any;
  link: () => string;
  get: (property) => any;
  fetch: () => any;
  with: () => any;
}

interface FileCursors {
  get: () => any[];
  hasNext: () => Boolean;
  next: () => FileCursor;
  hasPrevious: () => Boolean;
  previous: () => FileCursor;
  fetch: () => any[];
  first: () => FileCursor;
  last: () => FileCursor;
  count: () => number;
  remove: (callback: (error) => void) => void;
  forEach: (callback: (file: File) => void, context: any) => void;
  each: () => FileCursor[];
  map: (callback, context) => void;
  current: () => any;
  observe: (callbacks) => void;
  observeChanges: (callbacks) => void;
}

export interface UploadConfigs {
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

export interface FSCollection {
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
  /**
   * write - [Server Only] FS와 FilesCollection에 Buffer를 씁니다.
   */
  write: (buffer: any, opts?: { fileName?: string, type?: string, size?: number, meta?: any, userId?: string, fileId?: string }, callback?: (error, fileRef) => void) => any;
  /**
   * load - [Server Only] 외부 URI로부터 FS와 FilesCollection에 파일을 씁니다.
   */
  load: (...args) => any;
  /**
   * addFile - [Server Only] FS의 로컬 파일을 FilesCollection에 추가합니다.
   */
  addFile: (...args) => any;
  /**
   * insert - [Client Only] 서버로 파일을 업로드 합니다.
   */
  insert: (config: UploadConfigs, ...args) => any;
  /**
   * find - [Isomorphic] FilesCollection의 cursor를 만듭니다.
   */
  find: (...args) => any;
  /**
   * findOne - [] 
   */
  findOne: (...args) => FileCursor;
  /**
   * remove - [Isomorphic] FilesCollection으로 부터 파일을 지우고 FS에서 언링크 합니다.
   */
  remove: (...args) => any;
  /**
   * unlink - [Sever Only] FS로 부터 언링크 합니다.
   */
  unlink: (...args) => any;
  /**
   * link - [Isomorphic] 다운로드 가능한 링크를 만듭니다.
   */
  link: (...args) => any;
  /**
   * collection - [Isomorphic] Meteor.Collection 인스턴스.
   */
  _getMimeType: (fileData) => any;
  _getUser: (...args) => any;
}
