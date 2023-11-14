import { Injectable } from '@angular/core';
import { IProduct, Product } from '@app/models';
import { createState, Store } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';
import {
  abstractStatePart,
  StoreAbstraction,
} from '../_dependencies/store-abstraction.service';

const storeName = 'productStore';

const { state, config } = createState(withEntities<IProduct>());
const finalState = {
  ...state,
  ...abstractStatePart,
};
const store = new Store({ name: storeName, state: finalState, config });

@Injectable({ providedIn: 'root' })
export class ProductStore extends StoreAbstraction<Product> {
  constructor() {
    super(store);
    this.toolsetBaseMapping(Product);
  }
}
