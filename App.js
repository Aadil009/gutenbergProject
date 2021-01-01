import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList,ActivityIndicator } from 'react-native';
import MainStackNavigator from './MainStackNavigator';

export default function App() {

//   const [isLoading, setLoading] = useState(true);
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1)
//   const API = 'http://skunkworks.ignitesol.com:8000/books/?page='

//   useEffect(() => {
//     fetchRecords()
      
//   }, []);

//   const fetchRecords = (page) => {
//     // following API will changed based on your requirement
//     fetch(`http://skunkworks.ignitesol.com:8000/books/?page=${page}`)
//     .then((response) => response.json())
//       .then((json) => setData(json.results))
//       .catch((error) => console.error(error))
//       .finally(() => setLoading(false));
// }

// const onScrollHandler = () => {
//   setPage(page++, () => {
//      this.fetchRecords(page);
//   });
//   // setPage(page+1),
//   // this.fetchRecords(page)
// }
//   return (
//     <View style={{ flex: 1, padding: 24 }}>
//       {isLoading ? <ActivityIndicator/> : (
        
//         <FlatList
//            data={data}
//            renderItem={({ item }) => (
//             <Text>{item.title}</Text>
//           )}
//           keyExtractor={({ id }, index) => id}
           
//            onEndReached={onScrollHandler}
//            onEndThreshold={0}
//         />
//       )}
//     </View>
//   );
//   const [isLoading, setLoading] = useState(true);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch('http://skunkworks.ignitesol.com:8000/books/')
//       .then((response) => response.json())
//       .then((json) => setData(json.results))
//       .catch((error) => console.error(error))
//       .finally(() => setLoading(false));
//   }, []);
//   console.log(data)

  return (
    <>
      <StatusBar hidden />
      <MainStackNavigator />
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
