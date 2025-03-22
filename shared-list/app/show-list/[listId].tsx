import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import ListsManager from '../components/ListsManager/ListsManager';
import { IList } from '../components/List/IList';

export default function ListPage() {
  const router = useRouter();
  const { listId } = useLocalSearchParams();
  const [list, setList] = useState<IList | null>(null);

  useFocusEffect(
    useCallback(() => {
      const parsedListId = Number(listId);
      const fetchedList = ListsManager.getInstance().getList(parsedListId);
      setList(fetchedList);
    }, [listId])
  );


  if (!list) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>List not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{list.name}</Text>
      <FlatList
        data={list.items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.listItem}>{item.name}</Text>}
      />

    <Text
      style={{ color: '#ffd33d', marginTop: 20, textAlign: 'center' }}
      onPress={() => {
        // Navigate to edit page
        router.navigate(`/edit-list/${list.id}`);
      }}
    >
      Edit List
    </Text>

    </View>

    
    // add delete button
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#ffd33d',
    marginBottom: 10,
    textAlign: 'center',
  },
  listItem: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 5,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});
