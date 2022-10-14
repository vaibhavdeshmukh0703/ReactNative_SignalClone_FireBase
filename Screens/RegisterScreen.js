import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Input } from "react-native-elements";
import firebase from "firebase/compat/app";
import CheckIsEmail from "../Utility/CheckIsEmail";
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
  //https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png
  //https://www.pngmart.com/files/22/User-Avatar-Profile-PNG.png'
  const Register = () => {
    console.log(userName, email, password, imageUrl);
    if (!userName || !email || !password) {
      alert("Please Enter Valid Full Name,Email,Password");
      return;
    } else if (!CheckIsEmail(email)) {
      alert("Please Enter valid Email Id");
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: userName,
          photoURL:
            imageUrl ||
            "https://www.shareicon.net/download/2016/05/24/770139_man_512x512.png",
        });
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <StatusBar style="light" />
          <Text h3 style={styles.title}>
            Create Account
          </Text>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Full Name"
              type="text"
              value={userName}
              onChangeText={setUsername}
              style={styles.input}
            />
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <Input
              placeholder="password"
              type="password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
            <Input
              placeholder="Profile Picture Url (Optional)"
              type="text"
              value={imageUrl}
              onChangeText={setImageUrl}
              onSubmitEditing={Register}
              style={styles.input}
            />

            <Button title="Register" onPress={Register} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center",marginHorizontal:30 },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#3777f0",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: { marginBottom: 10 },
  input: { outlineStyle: "none" },
});
