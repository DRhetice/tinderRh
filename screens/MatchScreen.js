import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

const MatchScreen = () => {
const navigation = useNavigation()
const {params} = useRoute()
const {loggedInprofiles, userSwiped} = params;

  return (
    <View className="h-full bg-red-500 pt-20 opacity-80 relative">
     <View className="justify-center px-10 pt-20">
        <Image source={{uri: "https://links.papareact.com/mg9"}}
        className="w-full h-20"/>
     </View>
     <Text className="text-white text-center mt-5">
        You and {userSwiped.displayName} have likes each other.
     </Text>
     <View className="flex-row justify-center mt-5 space-x-5">
        <Image className="h-32 w-32 rounded-full"
        source={{
            uri: loggedInprofiles.photoURL
        }} />
         <Image className="h-32 w-32 rounded-full"
        source={{
            uri: userSwiped.photoURL
        }} />
     </View>
     <TouchableOpacity 
     className="bg-white m-5 px-10 py-8 rounded-full mt-10" onPress={()=>{
        navigation.goBack()
        navigation.navigate("Chat")
     }}>
        <Text className="text-center">Send a Message</Text>
     </TouchableOpacity>
    </View>
  )
}

export default MatchScreen