import { StyleSheet, Text, View ,StatusBar} from 'react-native'
import React from 'react'

const ChatScreen = ({route}) => {
  
  console.log(route.params);

  return (
    <View>
      <StatusBar styles='light'/>
      <Text>ChatScreen</Text>
    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})