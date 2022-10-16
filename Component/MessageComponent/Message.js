import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth, db } from "../../firebase";
import { Avatar } from "react-native-elements";
import moment from "moment";
const Message = (props) => {
  const message = props.message.item.data.message;
  const photoURL = props.message.item.data.photoUrl;
  //console.log(props.message.item.data.timestamp.seconds);
 // const time = moment(moment(props.message.item.data.timestamp.seconds*1000).format('LLLL')).from(moment()) 
  //console.log(props.message.item.data)
  //const isMe = false;
  const isMe = props.message.item.data.email === auth.currentUser.email;
  return (
    <View
      style={[
        styles.component,
        isMe ? styles.senderMessageComponent : styles.receiverMessage,
      ]}
  
    >
      <Text style={styles.message} numberOfLines={1} ellipsizeMode="tail">{message}</Text>
      {/* <Text style={styles.subMessage}>{time}</Text> */}
      <View style={[isMe?styles.rightAvatarContainer:styles.leftAvatarContainer]}>
             <Avatar source={{ uri:photoURL}} size="small" rounded />
      </View>
      
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  component: {
    marginBottom: 40,
    position:"relative"
  },
  rightAvatarContainer:{
    position:"absolute",
    right:-15,
    bottom:-22,
  },
  leftAvatarContainer:{
    position:"absolute",
    left:-15,
    bottom:-22,
  },
  senderMessageComponent: {
    padding: 10,
    justifyContent: "flex-end",
    marginLeft: "auto",
    marginRight: 30,
    maxWidth: "70%",
    backgroundColor: "#3777f0",
    borderRadius: 10,
  },
  receiverMessage: {
    padding: 10,
    justifyContent: "flex-start",
    marginRight: "auto",
    marginLeft: 30,
    maxWidth: "70%",
    backgroundColor: "#808080",
    borderRadius: 10,
  },
  message: {
    fontWeight:"500",
    fontSize: 18,
    color: "white",
    textTransform :"capitalize"
  },
  subMessage:{
    fontSize:12,
    fontWeight:400,
    fontStyle:"italic",
    color:"black",  
    alignItems:"flex-start"
  }
});
