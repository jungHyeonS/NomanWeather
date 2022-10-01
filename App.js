import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,ScrollView,Dimensions,ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { Fontisto } from '@expo/vector-icons';
const {width:SCREEN_WIDTH} = Dimensions.get("window");

const API_KEY = "d847b1e9380af73454b43b1736a986bd"
// component : 화면에 렌더링할 항목
// api : 자바스크립트 코드(자바스크립트 코드가 운영체제와 소통)
//https://reactnative.directory/


const icons = {
  "Clouds" : "cloudy",
  "Clear" : "day-sunny",
  "Rain" : "rain",
  "Atmosphere":"cloudy-gusts",
  "Snow":"snow",
  "Drizzle":"rains",
  "Thunderstorm":"lightning"
}

export default function App() {
  const [city,setCity] = useState("Loadding...");
  const [days,setDays] = useState([])
  const [ok,setOk] = useState(true);
  const getWeather = async() => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setOk(false);
    }
    const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude,longitude},{useGoogleMaps:false})
    setCity(location[0].region)
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
    const json = await response.json();
    setDays(json.daily);
  }
  useEffect(() => {
    getWeather();
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

          { days.length === 0 ? 
          <View style={styles.day}>
              <ActivityIndicator color="white" size="large" style={{marginTop:10}}/>
          </View>
          : (
            days.map((day,index) => 
              <View style={styles.day} key={index}>
                <View style={{flexDirection:"row", alignItems:"center",justifyContent:"space-between",width:"100%"}}>
                  <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
                  <Fontisto style={{marginTop:60}} name={icons[day.weather[0].main]} size={68} color="white" />
                </View>
                
                <Text style={styles.description}>{day.weather[0].main}</Text>
                <Text style={styles.tinyText}>{day.weather[0].description}</Text>
              </View>
            )
          )
          }
        
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
    fontSize:38,
    fontWeight:"500",
    color:"white"
  },  
  weather:{
  },
  day:{
    width:SCREEN_WIDTH,
    alignItems:"flex-start",
    paddingHorizontal:20
  },
  temp:{
    marginTop:50,
    fontSize:100,
    color:"white"
  },
  description:{
    marginTop:-10,
    fontSize:30,
    color:"white",
    fontWeight:"500"
  },
  tinyText:{
    marginTop:-5,
    fontSize:25,
    color:"white",
    fontWeight:"500"
  }
});
