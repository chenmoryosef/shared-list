import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { Link, useRouter } from 'expo-router';
import ListsManager from '../components/ListsManager/ListsManager'; // Import ListsManager
import { useRef, useState } from 'react';

export default function Index() {
  const listManager = ListsManager.getInstance();
  const router = useRouter();
  const inputRef = useRef<TextInput>(null); // Create a ref for TextInput
  let [listNameInput] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Lists:</Text>
      {
      Array.from(listManager.lists).map(([id, [list, done]]) => (
      console.log(id, list, done),
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
        listManager.createList(listName);
        inputRef.current?.clear(); // Clear input
        listNameInput = '';
        router.navigate('/create-new-list')        
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
