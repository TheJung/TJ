import { FilesCollection }  from 'meteor/ostrio:files';
import { FSCollection } from './types';

export const Files: FSCollection = new FilesCollection({
  collectionName: 'file',
  storagePath: 'uploads/files'
});