import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import ChatListItem from "../Component/ChatListItem/ChatListItem";
import { Avatar, Button } from "react-native-elements";
import { auth, db } from "../firebase";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  // const imageUrl =
  //   "https://png.pngtree.com/png-clipart/20190630/original/pngtree-vector-avatar-icon-png-image_4162757.jpg";
  // const personName = "Vaibhav";
  // const personMessage = "Hello Vishal, How Are you?";

  
  const [chats, setChats] = useState([]);
  console.log(chats)
 const getData = async() => {
  //db.collection("chat").where("userId"===auth.currentUser.uid).onSnapshot
     
  }
  useEffect(() => {
   const unsubscribe = db.collection("chat").onSnapshot((snapshot) => {
      setChats(
       snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubscribe;
  }, []);

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  const addChat = () => {
    navigation.navigate("AddChat");
  };

  const openCamera = () => {
    alert("Open Camera");
  };

  useLayoutEffect(() => {
    let isEffect = true;
    if (isEffect) {
      navigation.setOptions({
        title: "Cub2King",  
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#fff" },
        headerTitleStyle: {
          color: "black",
          fontWeight: "bold",
          alignText: "center",
        },
        headerTintColor: "black",
        headerLeft: () => (
          <View style={{ marginLeft: 20 }}>
            <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
              <Avatar source={{ uri: auth.currentUser.photoURL   }} rounded size="medium" />
            </TouchableOpacity>
          </View>
        ),
        headerRight: () => (
          <View
            style={{
              marginRight: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity activeOpacity={0.5} onPress={openCamera}>
              <Fontisto
                style={{ marginRight: 30 }}
                name="camera"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={addChat}>
              <MaterialIcons name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ),
      });
    }

    return () => {
      isEffect = false;
    };
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      
        {chats.length ? (<FlatList
          data={chats}
          renderItem={(chat)=>(<ChatListItem data={chat}/>)}
        />):(<ActivityIndicator size="large" color='#3777f0'/>)} 
      
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {},
});
