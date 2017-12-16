
interface EventState {
  map: { loaded: Array<{ count: number }> }
}

namespace Tracker {
  interface Dependency {
    _dependentsById: {}
  }
}

interface ProgressCount {
  count: any,
  percent: ReactiveVar<any>
}

export interface LocalForage {
  INDEXEDDB: string,
  LOCALSTORAGE: string,
  WEBSQL: string,
  clear: (callback?: Function) => void,
  getItem: (key: string, callback?: Function) => void,
  iterate: (iterator: any, callback?: Function) => void,
  key: (n: any, callback?: Function) => void,
  keys: (callback?: Function) => void,
  length: (callback?: Function) => void,
  ready: (callback?: Function) => void,
  removeItem: (key: string, callback?: Function) => void,
  setItem: (key: string, value: any, callback?: Function) => void,
  _config: any,
  _dbInfo: any,
  _defaultConfig: any,
  _driver: string,
  _driverSet: any,
  _initDriver: Function,
  _initReady: (callback) => void,
  _initStorage: (option: any) => void,
  _ready: any
}

export interface Collection {
  eventemitter: EventState,
  invalidate: Function,
  inLoaded: Boolean,
  lastUpdatedAt: any,
  offlineDatebase: Boolean,
  pendingOnLoad: Boolean,
  pendingReads: any,
  pendingWrites: any,
  storage: LocalForage,
  supportRemovedAt: any,
  throttle: { invalidate: number },
  _collection: any
}