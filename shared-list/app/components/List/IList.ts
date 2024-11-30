import { IItem } from '../Item/IItem';

export interface IList {
  readonly id: number;
  readonly name?: string;
  readonly items: IItem[];

  // TODO: Consider replacing the item argument to item id.
  add(item: IItem): void;
  remove(item: IItem): void;
  modify(item: IItem, name?: string, description?: string): void;
}
