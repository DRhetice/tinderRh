import { Image ,View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from '../lib/getMatchedUserInfo'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'


const ChatRow = ({matchDetails}) => {
    const navigation = useNavigation()
    const {user}= useAuth()
    const [matchedUserInfo, setMatchedUserInfo] = useState(null)
    const [lastMessage, setLastMessage] = useState("")
    useEffect(()=>{
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid))
        
    },[matchDetails, user])

    useEffect(()=>onSnapshot(query(
        collection(db, "matches", matchDetails.id, "messages"),
        orderBy("timestamp", "desc")
    ), snapshot=> setLastMessage(snapshot.docs[0]?.data()?.message)),[matchDetails,db])
    

  return (
    
    <TouchableOpacity className="flex-row items-center py-3 px-5 mx-3 bg-white my-1 rounded-lg shadow-2xl"
    
    onPress={()=>navigation.navigate("Message",{
        matchDetails,
    })}>
        <Image className="rounded-full  w-16 h-16 mr-4" source={{uri: matchedUserInfo?.photoURL}}/>

        <View>
            <Text className=" text-lg font-semibold">{matchedUserInfo?.displayName} </Text>
            <Text>{lastMessage || "Say Hi"}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default ChatRow