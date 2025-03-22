import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { Link, useFocusEffect, useRouter } from 'expo-router';
import ListsManager from '../components/ListsManager/ListsManager'; // Import ListsManager
import { useCallback, useRef, useState } from 'react';

export default function Index() {
  const listManager = ListsManager.getInstance();
  const router = useRouter();
  const inputRef = useRef<TextInput>(null); // Create a ref for TextInput
  let [listNameInput] = useState('');
  const [lists, setLists] = useState(Array.from(listManager.lists)); // Store lists in state

    // Refresh lists when page is focused
  useFocusEffect(
    useCallback(() => {
      setLists(Array.from(listManager.lists)); // Update state when page is focused
    }, [listManager])
  );
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Lists:</Text>
      {
      lists.map(([id, [list, done]]) => (
      <Link key={id} href={`/list/${id}`} style={styles.text}>
        {list.name} {done ? '✅' : ''}
      </Link>
      ))}

      <TextInput
      ref={inputRef} // Attach ref to TextInput
      style={styles.input}
      placeholder="Enter list name"
      placeholderTextColor="#aaa"
      onChangeText={(text) => { listNameInput = text }}
      />
      <Button
      title="Create List"
      onPress={() => {
        const listName = listNameInput ?? 'New list';
        const listId = listManager.createList(listName);
        inputRef.current?.clear(); // Clear input
        listNameInput = '';
        console.log('listId', listId);
        router.navigate({ pathname: '/create-new-list', params: { listId } });
      }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  header: {
    color: '#fff',
    fontSize: 24,
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    color: '#fff',
  }
});
