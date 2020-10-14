import { ListItem } from './list-item.model';


export class List {

  id: number;
  title: string;
  createdIn: Date;
  doneIn: Date;
  done: boolean;
  items: ListItem[];

  constructor( title: string ) {
    this.title = title;
    this.createdIn = new Date();
    this.done =  false;
    this.items = [];

    this.id = new Date().getTime();
  }
}
