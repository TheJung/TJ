import { Mongo } from 'meteor/mongo'

export interface Chat {
  _id?: Mongo.ObjectID;
  sender: Mongo.ObjectID;
  content: string;
  createdAt: Date;
}

export interface Message {
  _id?: Mongo.ObjectID;
  member: Array<Mongo.ObjectID>;
  chatHistory: Array<Chat>;
}