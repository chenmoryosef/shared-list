import { IItem } from '../Item/IItem';
import Item from '../Item/Item';

describe('Tests for Item class', () => {
  let item: IItem;
  const itemName = 'test item';
  const itemDescription = 'test description';

  beforeEach(() => {
    item = new Item(itemName, itemDescription);
  });

  test('should create an item with correct properties', () => {
    expect(item.id).toBeGreaterThan(0);
    expect(item.name).toBe(itemName);
    expect(item.description).toBe(itemDescription);
  });

  test('should update item properties', () => {
    const updatedItemName = 'updated item';
    const updatedItemDescription = 'updated description';
    item.setName(updatedItemName);
    item.setDescription(updatedItemDescription);
    expect(item.name).toBe(updatedItemName);
    expect(item.description).toBe(updatedItemDescription);
  });

  test('should clone the item', () => {
    const clonedItem = item.clone();
    expect(clonedItem).not.toBe(item);
    expect(clonedItem.name).toBe(item.name);
    expect(clonedItem.description).toBe(item.description);
    item.setName('new name');
    expect(clonedItem.name).not.toBe(item.name);
  });
});
