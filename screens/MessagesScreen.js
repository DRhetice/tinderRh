import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import { useRoute } from "@react-navigation/native";
import { TextInput } from "react-native";
import { Button } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import { FlatList } from "react-native";
import SenderMessage from "../components/SenderMessage";
import RecieverMessage from "../components/RecieverMessage";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const MessagesScreen = () => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([])

  const { user } = useAuth();
  const { params } = useRoute();
  const { matchDetails } = params;

  useEffect(()=>
    onSnapshot(
      query(
        collection(db, "matches", matchDetails.id, "messages"),
        orderBy("timestamp", "desc")
      ), snapshot => setMessage(snapshot.docs.map(doc =>(
        {
          id: doc.id,
          ...doc.data()
        }
      )))
    ),

  [matchDetails, db])

  const sendMessage = () => {

    addDoc(collection(db, "matches", matchDetails.id, "messages"), {
      timestamp: serverTimestamp(),
      userId: user.uid,
      displayName: user.displayName,
      photoURL: matchDetails.users[user.uid].photoURL,
      message: input,
    })
    setInput("")



  };
 
  return (
    <View className="flex-1 mt-3">
      <Header
        title={getMatchedUserInfo(matchDetails?.users, user.uid).job}
        callEnabled
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList 
          inverted={-1}
          className="pl-4"
          data={message}
          keyExtractor={(item)=>item.id}
          renderItem={({item:message})=>
        message.userId===user.uid ?(<SenderMessage key={message.id} message={message}/> ):(
          <RecieverMessage key={message.id} message={message}/>
        ) }
          
          />
          
        </TouchableWithoutFeedback>

     
        <View className="flex-row justify-between items-center border-t border-gray-200 px-5 py-2">
          <TextInput
            className="h-10 text-lg"
            placeholder="Send Message..."
            onChangeText={setInput}
            onSubmitEdiing={sendMessage}
            value={input}
          />
          <Button onPress={sendMessage} title="Send" color="#ff5864" />
         </View></KeyboardAvoidingView>
    </View>
  );
};

export default MessagesScreen;
