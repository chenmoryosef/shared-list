import ListsManager from './ListsManager';
import { List } from '../List/List';

describe('Tests for ListsManager class', () => {
  let listsManager: ListsManager;
  const testListName = 'Test List Name';

  beforeEach(() => {
    listsManager = new ListsManager();
  });

  test('should create a new list', () => {
    const listId = listsManager.createList(testListName);
    expect(listsManager.lists.size).toBe(1);
    expect(listsManager.lists.get(listId)?.[0].name).toBe(testListName);
  });

  test('should mark a list as done', () => {
    const listId = listsManager.createList(testListName);
    expect(listsManager.lists.get(listId)?.[1]).toBe(false);
    listsManager.markListDone(listId);
    expect(listsManager.lists.get(listId)?.[1]).toBe(true);
  });

  test('should not mark a non-existing list as done', () => {
    const nonExistingListId = 17;
    listsManager.markListDone(nonExistingListId);
    expect(listsManager.lists.get(nonExistingListId)?.[1]).toBeUndefined;
  });

  test('should get a copy of a list', () => {
    const listId = listsManager.createList(testListName);
    const listCopy = listsManager.getListCopy(listId);
    expect(listCopy).toBeInstanceOf(List);
    expect(listCopy).not.toBe(listsManager.lists.get(listId)?.[0]);
  });
});
