export interface IItem {
  getName(): string;
  setName(name: string): void;
  setDescription(description: string): void;
  clone(): IItem;
}
