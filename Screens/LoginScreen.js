import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Button,
  Dimensions,
  Keyboard,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ButtonGroup, Image, Input } from "react-native-elements";
import useNavigation from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";
import CheckIsEmail from "../Utility/CheckIsEmail";
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log("Inside the onAuthStateChange",authUser);
        navigation.replace("Home");
      } else {
        console.log("not inside the onAuthStateChanged", authUser);
      }
    });
    return unsubscribe;
  }, []);

  const signIn = () => {
    if (!email || !password) {
      alert("please Enter Valid Email And Password");
      return;
    } else if (!CheckIsEmail(email)) {
      alert("In Valid Email Id");
      return;
    }
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        alert("Wrong password.");
      } else {
        alert(errorMessage);
      }
    });
  };

  const resister = () => {
    navigation.navigate("Register");
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <StatusBar style="light" />
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: "https://cdn.dribbble.com/users/86597/screenshots/10992949/media/5796fed19aa2ac997589a341f369d9b1.png?compress=1&resize=400x300",
                // uri: "https://media-exp1.licdn.com/dms/image/C560BAQEP28Ge1vLJiw/company-logo_200_200/0/1650968075368?e=2147483647&v=beta&t=4qRCUArkBbYIOAMUkS8-XwbvVCF140dyyWXVzOsAIbk",
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputFieldContainer}>
              <Input
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
              />
              <Input
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={setPassword}
                onSubmitEditing={signIn}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="LOGIN"
                style={{ marginTop: 20 }}
                onPress={signIn}
              />
              <Text></Text>
              <Button title="Register" type="outline" onPress={resister} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: "cover",
    borderRadius: 100,
  },
  inputContainer: {
    marginHorizontal: 30,
  },
  inputFieldContainer: {},
  input: {
    outlineStyle: "none",
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    marginTop: 30,
  },
});
