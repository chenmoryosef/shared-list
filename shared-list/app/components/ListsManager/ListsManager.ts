import { IList } from '../List/IList';
import { List } from '../List/List';
import { IListsManager, ListsInfo, ListEntity } from './IListsManager';

export default class ListsManager implements IListsManager {
  lists: ListsInfo;

  constructor() {
    this.lists = new Map();
  }

  createList(name?: string): number {
    const list = new List(name);
    this.lists.set(list.id, [list, false]);
    return list.id;
  }

  markListDone(id: number): void {
    if (this.lists.has(id)) {
      const listEntity = this.lists.get(id);
      if (listEntity) {
        this.lists.set(id, [listEntity[0], true]);
      }
    }
  }

  getListCopy(id: number): IList {
    const listEntity = this.lists.get(id);
    if (listEntity) {
      return listEntity[0].clone();
    }
    return new List();
  }
}
