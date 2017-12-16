import { MongoObservable } from 'meteor-rxjs';

import { Thread } from '../models/thread';

export const Threads = new MongoObservable.Collection<Thread>('threads');