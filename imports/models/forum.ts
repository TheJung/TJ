import { Mongo } from 'meteor/mongo'

export interface ForumSetting {
  managers: Array<Mongo.ObjectID>;
  read: Boolean,
  write: Boolean,
  requirePermission: { criteria: 'user' | 'admin' }
}

export interface Forum {
  _id?: Mongo.ObjectID;
  subject: string;
  createdAt: Date;
  setting: ForumSetting;
  category: string;
}