import { SafeAreaView,View, Text } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import ChatList from '../components/ChatList'


const ChatScreen = () => {
  return (
   <SafeAreaView className="pt-6">
    <Header title="Chat"  />
    <ChatList />
   </SafeAreaView>
  )
}

export default ChatScreen