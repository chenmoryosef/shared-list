import { IItem } from './IItem';

export default class Item implements IItem {
  private id: number;
  private name: string;
  private description?: string;
  private creationTimestamp: number;
  private lastModificationTimestamp: number;

  constructor(name: string, description?: string) {
    this.id = this.generateId();
    this.name = name;
    this.description = description ?? '';
    this.creationTimestamp = Date.now();
    this.lastModificationTimestamp = Date.now();
  }

  getName(): string {
    return this.name;
  }

  private generateId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  private updateTimestamp(): void {
    this.lastModificationTimestamp = Date.now();
  }

  setName(name: string): void {
    this.name = name;
    this.updateTimestamp();
  }

  setDescription(description: string): void {
    this.description = description;
    this.updateTimestamp();
  }

  clone(): IItem {
    return new Item(this.name, this.description);
  }
}
