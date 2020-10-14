import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { List } from 'src/app/models/list.model';
import { WishesService } from 'src/app/services/wishes.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @ViewChild( IonList ) list: IonList;
  @Input() doneScreen = true;

  constructor( public wishesService: WishesService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {}

  selectedList(list:List){

    if (this.doneScreen){
      this.router.navigateByUrl(`/tabs/tab2/add/${list.id}`)
    } else {
      this.router.navigateByUrl(`/tabs/tab1/add/${list.id}`)
    }

  }

  deleteList(list: List){
    this.wishesService.deleteList( list );
  }

  async renameList( list ) {
    
    const alert = await this.alertCtrl.create({
      header: 'Change Name',
      inputs: [{
        name: 'title',
        type: 'text',
        value: list.title,
        placeholder: 'change the name'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Canceled');
        }
      }, {
        text: 'Update',
        handler: (data) => {
          if ( data.title.length === 0 ) {
            return;
          }
          list.title = data.title;
          this.wishesService.saveStorage();
          this.list.closeSlidingItems();
        }
      }]
    });
    alert.present();
  }

}
