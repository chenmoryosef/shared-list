import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, TextInput, Button, FlatList } from 'react-native';
import ListsManager from '../components/ListsManager/ListsManager';
import Item from '../components/Item/Item';
import { IList } from '../components/List/IList';

export default function EditList() {
  const { listId } = useLocalSearchParams();
  const [listItems, setListItems] = useState<Array<String>>([]);
  const [newItem, setNewItem] = useState('');
  const [list, setList] = useState<IList | null>(null);

  useFocusEffect(
    useCallback(() => {
      const parsedListId = Number(listId);
      const fetchedList = ListsManager.getInstance().getList(parsedListId);
      if (fetchedList) {
        setList(fetchedList);
        setListItems(fetchedList.items.map((item) => {return item.getName()}) || []);
      }
    }, [listId])
  );

  const addItem = () => {
    if (newItem.trim()) {
      setListItems([...listItems, newItem.trim()]);
      setNewItem('');
      list?.add(new Item(newItem));
    }
  };

  if (!list) {
    return null; // Prevent rendering if list is invalid (redirecting)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Your List: {list.name}</Text>
      <FlatList
        data={listItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
      />
      <TextInput
        style={styles.input}
        placeholder="Add a new item"
        placeholderTextColor="#aaa"
        value={newItem}
        onChangeText={setNewItem}
      />
      <Button title="Add Item" onPress={addItem} />
      <Button title="Done" onPress={() => router.navigate('/')} color="#4CAF50" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  listItem: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 5,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
