import { IList } from '../List/IList';
import { List } from '../List/List';
import { IListsManager, ListsInfo, ListEntity } from './IListsManager';

export default class ListsManager implements IListsManager {
  private static instance: ListsManager;
  lists: ListsInfo;

  private constructor() {
    this.lists = new Map();
  }

  static getInstance(): ListsManager {
    if (!ListsManager.instance) {
      ListsManager.instance = new ListsManager();
    }
    return ListsManager.instance;
  }

  createList(name?: string): number {
    if (!name) name = 'List';
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
