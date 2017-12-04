export interface Thread {
  _id?: string;
  title: string;
  author: string;
  // root post _id.
  rootPost: string;
  // chilren post _id.
  children?: string[];
}