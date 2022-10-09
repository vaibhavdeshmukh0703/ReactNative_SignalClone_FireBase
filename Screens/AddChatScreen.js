import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Avatar, Button, Input } from "react-native-elements";
import { KeyboardAvoidingView } from "react-native-web";
import { AntDesign } from "@expo/vector-icons";
import { db } from "../firebase";
const AddChat = ({ navigation }) => {
  const [input, setAddChat] = useState("");
  useLayoutEffect(() => {
    let isEffect = true;
    if (isEffect) {
      navigation.setOptions({
        title: "Add Chat To Screen",
      });
    }
    return () => {
      isEffect = false;
    };
  }, [navigation]);

  const createChat = async () => {
    if (!input) { alert("Please Enter Message"); return}
    await db
      .collection("chat")
      .add({chatName : input})
      .then(() => {
        navigation.goBack();
      })
      .catch((error)=>{alert(error)})
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      keyboardVerticalOffset={100}
      style={styles.container}
    >
      <View style={styles.inputContainer}>
        <AntDesign name="wechat" size={24} color="#3777f0" />
        <Input
          placeholder="Add chats"
          type="text"
          value={input}
          onChangeText={setAddChat}
          onSubmitEditing={createChat}
        />
      </View>
      <Button title="Create New Chat" onPress={createChat} />
    </KeyboardAvoidingView>
  );
};

export default AddChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:"white"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems:"center"
  },
});
