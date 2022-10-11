import { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import React from "react";
import { Avatar, Input } from "react-native-elements";
import {
  FontAwesome,
  Foundation,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { auth, db } from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Message from "../Component/MessageComponent/Message";
const ChatScreen = ({ navigation, route }) => {
  const chatName = route.params.chatName;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  console.log(messages);
  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chat")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snashot) => {
        setMessages(
          snashot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

    return () => {
      console.log(messages);
      unsubscribe;
    };
  }, [route]);
  const sendMessage = () => {
    if (!message) {
      alert("Please Enter Message");
      return;
    }
    Keyboard.dismiss();
    db.collection("chat").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: message,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoUrl: auth.currentUser.photoURL,
    });

    setMessage("");
  };
  const cameraOpening = () => {};

  const Calling = () => {};
  useLayoutEffect(() => {
    let isEffect = true;
    if (isEffect) {
      navigation.setOptions({
        headerTitleAlign: "left",
        title: "Chat",
        headerTitleStyle: {
          fontWeight: "bold",
          marginLeft: 30,
        },
        headerBackTitleVisible: false,
        headerTitle: () => (
          <View style={{  flexDirection: "row", alignItems: "center" }}>
            <Avatar
              rounded
              size="small"
              source={{
                uri: "https://png.pngtree.com/png-clipart/20190630/original/pngtree-vector-avatar-icon-png-image_4162757.jpg",
              }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 10,
                color: "white",
               
              }}
            >
              {chatName}
            </Text>
          </View>
        ),
        headerRight: () => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity activeOpacity={0.5} onPress={cameraOpening}>
              <FontAwesome
                style={{ marginRight: 30 }}
                name="video-camera"
                size={24}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={Calling}>
              <Foundation
                style={{ marginRight: 30 }}
                name="telephone"
                size={24}
                color="white"
              />
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardAvoidingVerticalOffset={90}
      >
        <StatusBar styles="light" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
           
            {messages && <FlatList
              data={messages}
              renderItem={(message)=>(<Message message={message}/>)}
              inverted
              
            />}
            <View style={styles.footer}>
              <TextInput
                style={styles.input}
                placeholder="Signal Message"
                type="text"
                value={message}
                onChangeText={setMessage}
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                <MaterialCommunityIcons
                  name="send-circle"
                  size={50}
                  color="#3777f0"
                />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex:1 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginBottom: 30,
  },
  input: {
    flex: 1,
    border: "1px solid black",
    height: 40,
    borderRadius: 10,
    marginRight: 10,
    paddingLeft: 20,
    textAlignVertical: "center",
    outlineStyle:'none'
  },
  icon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3777f0",
    textAlign: "center",
    textAlignVertical: "center",
  },
  senderMessageContainer:{
    border: "1px solid black"
  },
  senderMessage:{},
  receiverMessageContainer:{
    border:'1px solid black'
  }
  
});
