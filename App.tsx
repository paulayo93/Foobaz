import React from 'react';
import {useState, useEffect} from 'react';
import {
  FlatList,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
} from 'react-native';


type DataItem = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
};


const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState<DataItem[]>([]); //set the type of what the hook expects to be an array of DataItem.

  useEffect(() => {
    fetch('https://reqres.in/api/users?page=2')
      .then(response => response.json())
      .then((responseJson: {data: any}) => {
        setIsLoading(false);
        setDataSource(responseJson?.data);
       
      })
      .catch(error => {
        setIsLoading(false);
        // do something with the error...
      });
  }, []);

  if (isLoading) {
    return (
      <View
        style={{flex: 1, padding: 20, marginTop: 40, backgroundColor: 'white'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <SafeAreaView
      style={styles.safeArea}>
      <FlatList
        data={dataSource}
        renderItem={({item}) => (
          <Pressable
          onPress={() => null}
          style={styles.cardContainer}>
          <View
            style={styles.cardContent}>
            <Image
              source={{uri: item?.avatar}}
              style={styles.avatar}
            />
            <View>
              <Text style={{color: '#000'}}>{item?.first_name} {item?.last_name}</Text>
            </View>
          </View>
        </Pressable>
        )}
        keyExtractor={({id}, index) => id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 80,
    marginHorizontal: 16,
  },
  avatar: {
    height: 60,
    width: 55,
    marginLeft: 16,
    marginRight: 15,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    paddingVertical: 16,
    backgroundColor: '#EEEFF2',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    shadowColor: '#EEEFF2',
    shadowRadius: 50,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});

export default App;
