import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { List } from 'src/app/models/list.model';
import { WishesService } from '../../services/wishes.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( public wishesService: WishesService, private router: Router, private alertCtrl: AlertController ) {

  }

  async addList() {
    //his.router.navigateByUrl('/tabs/tab1/add');
  
    const alert = await this.alertCtrl.create({
      header: 'New list',
      inputs: [{
        name: 'title',
        type: 'text',
        placeholder: 'Add a new list'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Canceled');
        }
      }, {
        text: 'Add',
        handler: (data) => {
          if ( data.title.length === 0 ) {
            return;
          }

          const listId = this.wishesService.createList(data.title);
          this.router.navigateByUrl(`/tabs/tab1/add/${listId}`);
        }
      }]
    });
    alert.present();
  }

}
