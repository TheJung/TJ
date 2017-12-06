import { Mongo } from 'meteor/mongo'

export interface User {
  _id?: Mongo.ObjectID;
  id: string;
  password: string;
  nickname: string;
  isAdmin: Boolean;
}