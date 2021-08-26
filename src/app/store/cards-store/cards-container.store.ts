import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import AbstractStore from '../AbstractStore';
import {update} from './cards-container.actions';

@Injectable()
export default class CardsContainerStore extends AbstractStore {
  constructor(store: Store<any>) {
    super(store, 'cards');
  }

  public updateState() {
    super.updateState(update);
  }

}
