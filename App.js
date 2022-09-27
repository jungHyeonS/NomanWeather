import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// component : 화면에 렌더링할 항목
// api : 자바스크립트 코드(자바스크립트 코드가 운영체제와 소통)
//https://reactnative.directory/
export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text style={styles.text}>Hello</Text>
    //   <StatusBar style="auto" />
    // </View>
    // style={{flexDirection:"row"}}
    <View style={{flex:1}}>
      <View style={{flex:1, backgroundColor:"tomato"}}></View>
      <View style={{flex:10,backgroundColor:"green"}}></View>
      <View style={{flex:1,backgroundColor:"blue"}}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  text:{
    fontSize:28
  }
});
