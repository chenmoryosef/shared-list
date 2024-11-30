import { IItem } from '../Item/IItem';
import { IList } from './IList';

export class List implements IList {
  id: number;
  name?: string;
  items: IItem[];

  constructor(name?: string) {
    this.id = this.generateId();
    this.name = name;
    this.items = [];
  }

  private generateId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  add(item: IItem): void {
    this.items.push(item);
  }

  remove(item: IItem): void {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  modify(item: IItem, name?: string, description?: string): void {
    const index = this.items.findIndex((i) => i.id === item.id);
    if (index > -1) {
      if (name) this.items[index].setName(name);
      if (description) this.items[index].setDescription(description);
    }
  }

  clone(): IList {
    const list = new List(this.name);
    this.items.forEach((item) => list.add(item.clone()));
    return list;
  }
}
