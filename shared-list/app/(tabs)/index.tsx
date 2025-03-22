import { Text, View, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Link, useFocusEffect, useRouter } from 'expo-router';
import ListsManager from '../components/ListsManager/ListsManager';
import { useCallback, useRef, useState } from 'react';

export default function Index() {
  const listManager = ListsManager.getInstance();
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);
  let [listNameInput] = useState('');
  const [lists, setLists] = useState(Array.from(listManager.lists));

  // Refresh lists when page is focused
  useFocusEffect(
    useCallback(() => {
      setLists(Array.from(listManager.lists));
    }, [listManager])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📋 My Lists</Text>

      {/* List Display */}
      <FlatList
        data={lists}
        keyExtractor={([id]) => id.toString()}
        renderItem={({ item: [id, [list, done]] }) => (
          <Link key={id} href={`/show-list/${id}`} style={styles.listItem}>
            <Text style={styles.listText}>
              {list.name} {done ? '✅' : ''}
            </Text>
          </Link>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No lists yet. Create one below! 📂</Text>}
      />

      {/* Input Field */}
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Enter list name"
        placeholderTextColor="#ccc"
        onChangeText={(text) => { listNameInput = text }}
      />

      {/* Create List Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const listName = listNameInput ?? 'New list';
          const listId = listManager.createList(listName);
          inputRef.current?.clear();
          listNameInput = '';
          router.navigate(`/edit-list/${listId}`);
        }}
      >
        <Text style={styles.buttonText}>➕ Create List</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181a20',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listItem: {
    backgroundColor: '#2a2d36',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginBottom: 10,
  },
  listText: {
    color: '#fff',
    fontSize: 18,
  },
  emptyText: {
    color: '#aaa',
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    height: 45,
    width: '100%',
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#1f222a',
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
  },
  button: {
    marginTop: 15,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
