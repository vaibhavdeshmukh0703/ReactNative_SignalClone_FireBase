//import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import HomeScreen from "./Screens/HomeScreen";
import AddChatScreen from "./Screens/AddChatScreen";
import ChatScreen from "./Screens/ChatScreen";

const stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: {
    backgroundColor: "#3777f0",
  },
  headerTitleStyle: {
    color: "white",
    fontWeight: "bold",
  },
  headerTitleAlign:"center",
  headerTintColor: "white",
};
export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={globalScreenOptions}>
        <stack.Screen name="Login" component={LoginScreen} />
        <stack.Screen name="Register" component={RegisterScreen} />
        <stack.Screen name="Home" component={HomeScreen} />
        <stack.Screen name="AddChat" component={AddChatScreen} />
        <stack.Screen name='Chat' component={ChatScreen}/>
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
