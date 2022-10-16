import { StyleSheet, Text, View, Dimension } from "react-native";
import React, { useLayoutEffect, useState, useMemo, memo } from "react";
import { Avatar, Button, Input } from "react-native-elements";
import { KeyboardAvoidingView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { auth, db } from "../firebase";
const AddChatScreen = ({ navigation }) => {
  const [input, setAddChat] = useState("");
  // console.log("press");
  useLayoutEffect(() => {
    let isEffect = true;
    if (isEffect) {
      navigation.setOptions({
        title: "Add ChatGroup To Screen",
      });
    }
    return () => {
      isEffect = false;
    };
  }, [navigation]);

  const createChat = async () => {
    if (!input) {
      alert("Please Enter Chat Group Name");
      return;
    }
    await db
      .collection("chat")
      .add({ chatName: input })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <AntDesign name="wechat" size={40} color="#3777f0" />
        <Input
          placeholder="Insert chat Group Name"
          type="text"
          value={input}
          onChangeText={setAddChat}
          onSubmitEditing={createChat}
          style={styles.input}
        />
      </View>
      <Button title="Create New Chat Group" onPress={createChat} />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  input: {
    outlineStyle: "none",
  },
});
