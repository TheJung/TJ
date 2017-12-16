
export interface Notification {
  _id?: Mongo.ObjectID;
  sender: Mongo.ObjectID;
  fromWhere: string;
  priview?: string;
  contents: any;
  receiver: Mongo.ObjectID;
  viewed: Boolean;
}