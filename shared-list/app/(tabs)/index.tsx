import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { List } from '../components/List/List';
import ListsManager from '../components/ListsManager/ListsManager'; // Import ListsManager

export default function Index() {
  const lists = Array.from(ListsManager.getInstance().lists);
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Lists:</Text>
      {lists.map(([id, [list, done]]) => (
        <Link key={id} href={`/list/${id}`} style={styles.text}>
          {list.name} {done ? '✅' : ''}
        </Link>
      ))}
      <Link href="/create-new-list" style={styles.button}>
        Create a new list
      </Link>
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
});
