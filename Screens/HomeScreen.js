import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Dimensions,
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
  const [isLoading, setIsLoading] = useState("true");
  //console.log(chats)
  const getData = async () => {
    db.collection("chat").onSnapshot((snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
      setIsLoading("false");
    });
  };
  useEffect(() => {
    let isEffect = true;
    if (isEffect) {
      getData();
    }
    return () => {
      isEffect = false;
     // console.log("comp is unmount");
     // console.table(chats.item);
    };

    console.log("After network call", isLoading);
    //console.log(chats)
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
        headerStyle: { backgroundColor: "#fff", padding: 30 },
        headerTitleStyle: {
          color: "black",
          fontWeight: "bold",
          alignText: "center",
        },
        headerTintColor: "black",
        headerLeft: () => (
          <View style={{ marginLeft: 0 }}>
            <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
              <Avatar
                source={{ uri: auth.currentUser.photoURL }}
                rounded
                size="medium"
              />
            </TouchableOpacity>
          </View>
        ),
        headerRight: () => (
          <View
            style={{
              marginRight: 0,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity activeOpacity={0.5} onPress={openCamera}>
              <Fontisto
                style={{ marginRight: 20 }}
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
      {isLoading == "true" ? (
        <ActivityIndicator size="large" color="#3777f0" />
      ) : (
        <FlatList
          data={chats}
          renderItem={(chat) => <ChatListItem data={chat} />}
          // renderItem={(chat)=>(console.log(chat.item))}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get("window").height,
  },
});
