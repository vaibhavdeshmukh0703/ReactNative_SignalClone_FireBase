import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Input } from "react-native-elements";
import firebase from "firebase/compat/app";
import CheckIsEmail from '../Utility/CheckIsEmail'
import "firebase/compat/auth";  

import { auth } from "../firebase";
const RegisterScreen = ({ navigation }) => {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(() => {
    let isEffect = true;
    if (isEffect) {
      navigation.setOptions({
        headerBackTitle: "Back To Login",
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: "white",
        },
      });
    }
    return () => {
      isEffect = false;
    };
  }, [navigation]);

  const Register = () => {
    if (!userName || !email || !password) { alert("Please Enter Valid Full Name,Email,Password"); return }
    else if (!CheckIsEmail(email)) { alert("Please Enter valid Email Id");  return}
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: userName,
          photoUrl:
            imageUrl ||
            "https://www.pngmart.com/files/22/User-Avatar-Profile-PNG.png",
        });
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={100}
      enabled
      style={styles.container}
    >
      <StatusBar style="light" />
      <Text h3 style={styles.title}>
        Create A Signal Account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          type="text"
          value={userName}
          onChangeText={setUsername}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Input
          placeholder="Profile Picture Url (Optional)"
          type="text"
          value={imageUrl}
          onChangeText={setImageUrl}
          onSubmitEditing={Register}
        />

        <Button title="Register" onPress={Register} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#3777f0",
    marginBottom: 50,
  },
  inputContainer: { marginBottom: 10 },
});
