import { MongoObservable } from 'meteor-rxjs';

import { Forum } from '../models/forum';

export const Forums = new MongoObservable.Collection<Forum>('forums');