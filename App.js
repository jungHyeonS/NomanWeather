import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,ScrollView,Dimensions } from 'react-native';
import * as Location from 'expo-location';
const {width:SCREEN_WIDTH} = Dimensions.get("window");
// component : 화면에 렌더링할 항목
// api : 자바스크립트 코드(자바스크립트 코드가 운영체제와 소통)
//https://reactnative.directory/
export default function App() {
  const [city,setCity] = useState("Loadding...");
  const [location, setLocation] = useState();
  const [ok,setOk] = useState(true);
  const ask = async() => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setOk(false);
    }
    const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude,longitude},{useGoogleMaps:false})
    setCity(location[0].region)
  }
  useEffect(() => {
    ask();
  },[])



  return (
    // <View style={styles.container}>
    //   <Text style={styles.text}>Hello</Text>
    //   <StatusBar style="auto" />
    // </View>
    // style={{flexDirection:"row"}}
    <View style={styles.container}>
      <StatusBar style='light'/>


      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView 
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>

        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>

        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>

        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex:1, backgroundColor:"tomato"
  },
  city:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  cityName:{
    fontSize:58,
    fontWeight:"500"
  },  
  weather:{
  },
  day:{
    width:SCREEN_WIDTH,
    alignItems:"center",
  },
  temp:{
    marginTop:50,
    fontSize:178
  },
  description:{
    marginTop:-30,
    fontSize:60
  }
});
