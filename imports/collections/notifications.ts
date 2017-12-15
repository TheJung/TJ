import { MongoObservable } from 'meteor-rxjs';
import { Notification } from 'imports/models/notification';

export const Notifications = new MongoObservable.Collection<Notification>('notifications');