import { IItem } from './IItem';

export default class Item implements IItem {
  id: number;
  name: string;
  description: string;
  timestamp: number;

  constructor(name: string, description: string) {
    this.id = this.GenerateId();
    this.name = name;
    this.description = description;
    this.timestamp = Date.now();
  }

  private GenerateId(): number {
    return Math.floor(Math.random() * 1000000);
  }
}
