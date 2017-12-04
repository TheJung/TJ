import { MongoObservable } from 'meteor-rxjs';

import { User } from '../models/user';

export const Users = new MongoObservable.Collection<User>('users');