import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListItem } from 'src/app/models/list-item.model';
import { List } from 'src/app/models/list.model';
import { WishesService } from 'src/app/services/wishes.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  list: List;
  nameItem = '';

  constructor(private wishService: WishesService, private route: ActivatedRoute ) {
    
    const listId = this.route.snapshot.paramMap.get('listId');

    this.list = this.wishService.getList(listId);
    
  }

  ngOnInit() {
  }

  addItem(){
    if (this.nameItem.length === 0) {
      return ;
    }
    const newItem = new ListItem(this.nameItem);
    this.list.items.push(newItem);

    this.nameItem = '';
    this.wishService.saveStorage();
  }

  changeCheck( item: ListItem ){
    const toDo = this.list.items
      .filter(itemData => !itemData.complete)
      .length;
    if (toDo === 0){
      this.list.doneIn = new Date();
      this.list.done = true;
    } else {
      this.list.doneIn = null;
      this.list.done = false;
    }
    this.wishService.saveStorage();
  }

  delete(i: number){
    this.list.items.splice(i, 1);
    this.wishService.saveStorage();
  }

}
