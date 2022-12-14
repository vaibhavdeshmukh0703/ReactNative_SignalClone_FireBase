import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Avatar, ListItem } from "react-native-elements";
import { db } from "../../firebase";
import moment, { now } from "moment";
const imageUrl =
  "https://png.pngtree.com/png-clipart/20190630/original/pngtree-vector-avatar-icon-png-image_4162757.jpg";

const ChatListItem = (props) => {
  const [chatMessags, setChatMessages] = useState([]);
  // console.log(props.data.item.id);
  useEffect(() => {
    const unsubscribe = db
      .collection('chat')
      .doc(props.data.item.id)
      .collection('messages')
      .orderBy("timestamp", "desc").limit(1)
      .onSnapshot((snapshot) => {
        setChatMessages(
          snapshot.docs.map((doc) => ({
              data: doc.data()
          }))  
        );
      });

    return unsubscribe;
  },[]);
  // console.log("chatMessage",chatMessags); 
  const navigation = useNavigation();
  const goToChatScreen = () => {
    navigation.navigate("Chat", {
      id: props.data.item.id,
      chatName: props.data.item.data.chatName,
    }); 
  };
//const time = "wait"
  const time = moment(chatMessags?.[0]?.data?.timestamp?.seconds*1000).format("LLLL");
  const newTime = moment(time).from(moment())
  // console.log("Time Which we get-->",newTime);
  //console.log(chatMessags?.[0]?.data)
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={goToChatScreen}
      bottomDivider
    >
     <ListItem style={styles.container}>
       <Avatar source={{ uri: chatMessags?.[0]?.data?.photoUrl ||  imageUrl }} rounded size="medium" />
       <ListItem.Content>
        <ListItem.Title style={{ fontWeight:"bold",textTransform:"capitalize"}} numberOfLines={1} ellipsizeMode="tail">
          {props.data.item.data.chatName}{" "} 
        </ListItem.Title>
        <ListItem.Subtitle
            style={{ marginTop:5,fontWeight:'normal',textTransform:"capitalize" }}
            numberOfLines={1}
          >
          {chatMessags?.[0]?.data?.message}
          </ListItem.Subtitle>
       </ListItem.Content>
      {newTime !="Invalid date" ?<Text>{newTime} by {chatMessags?.[0]?.data?.displayName}</Text>:<Text>No Message</Text>}

     </ListItem>
      {/* 
        {newTime === "Invalid date"?<Text style={styles.time}>No Last Message</Text>:<Text style={styles.time}>
          {newTime} by {chatMessags?.[0]?.data?.displayName}</Text>}
        
       */}
    </TouchableOpacity>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({
  // container:{
  //   flex:1,
  //   height:Dimensions.get("screen").height,
  // },
  time:{
    color: "#808080",
    fontWeight:12,
    fontStyle:"italic"
},
});
