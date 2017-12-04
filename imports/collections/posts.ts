import { MongoObservable } from 'meteor-rxjs';

import { Post } from '../models/post';

export const Posts = new MongoObservable.Collection<Post>('posts');