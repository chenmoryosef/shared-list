export interface IItem {
  readonly id: number;
  readonly name: string;
  readonly description?: string;
  readonly creationTimestamp: number;
  readonly lastModificationTimestamp: number;

  setName(name: string): void;
  setDescription(description: string): void;
  clone(): IItem;
}
