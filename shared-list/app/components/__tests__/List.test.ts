import { IList } from '../List/IList';
import { List } from '../List/List';
import Item from '../Item/Item';

describe('Tests for List class', () => {
  let list: IList;
  const listName = 'test list';
  const itemName = 'test item';
  const itemDescription = 'test description';

  beforeEach(() => {
    list = new List(listName);
  });

  test('should create a list with correct properties', () => {
    expect(list.id).toBeGreaterThan(0);
    expect(list.name).toBe(listName);
    expect(list.items).toEqual([]);
  });

  test('should add an item to the list', () => {
    const item = new Item(itemName, itemDescription);
    list.add(item);
    expect(list.items.length).toBe(1);
    expect(list.items[0]).toBe(item);
  });

  test('should remove an item from the list', () => {
    const item = new Item(itemName, itemDescription);
    const item2 = new Item(itemName, itemDescription);
    list.add(item);
    list.add(item2);
    expect(list.items.length).toBe(2);

    list.remove(item);
    expect(list.items.length).toBe(1);
  });

  test('should modify an item in the list', () => {
    const item = new Item(itemName, itemDescription);
    list.add(item);
    list.modify(item, 'new name', 'new description');
    expect(list.items.length).toBe(1);
    expect(list.items[0].name).toBe('new name');
  });

  test('should clone the list', () => {
    const item = new Item(itemName, itemDescription);
    list.add(item);
    const clonedList = list.clone();
    expect(list.items.length).toBe(clonedList.items.length);
    expect(clonedList.items[0].name).toBe(list.items[0].name);
    expect(clonedList).not.toBe(list);
  });
});
