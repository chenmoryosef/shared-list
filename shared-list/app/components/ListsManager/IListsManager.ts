import { IList } from '../List/IList';

export type ListEntity = [IList, boolean];
export type ListsInfo = Map<number, ListEntity>;

export interface IListsManager {
  readonly lists: ListsInfo;

  createList(name?: string): number;
  markListDone(id: number): void;
  getListCopy(id: number): IList;
}
