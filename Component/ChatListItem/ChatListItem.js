import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Avatar,ListItem } from 'react-native-elements'
const imageUrl =
  "https://png.pngtree.com/png-clipart/20190630/original/pngtree-vector-avatar-icon-png-image_4162757.jpg";
    

const ChatListItem = (props,) => {
  const navigation = useNavigation();
  const goToChatScreen = () => {
    navigation.navigate("Chat", {
      id:props.data.item.id,
      chatName: props.data.item.data.chatName
    });
  }
  
  
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={goToChatScreen} bottomDivider>
    <ListItem key={props.data.item.id}>  
          <Avatar source={{ uri: imageUrl }} rounded size="medium" />
          <ListItem.Content>
              <ListItem.Title style={{fontWeight:'bold'}}>{props.data.item.data.chatName} </ListItem.Title>
              <ListItem.Subtitle style={{ fontWeight:'500', marginTop:5} } numberOfLines={1} >abc</ListItem.Subtitle>
          </ListItem.Content>
      </ListItem>
      </TouchableOpacity>
  )
}

export default ChatListItem

const styles = StyleSheet.create({})