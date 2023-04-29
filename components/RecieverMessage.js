import { View, Text, Image } from "react-native";
import React from "react";

const RecieverMessage = ({ message }) => {
  return (
    <View
      className="bg-red-600 rounded-lg rounded-tl-none px-5 py-3 mx-3 ml-14 my-2"
      style={{ alignSelf: "flex-start"}}
    >
      <Image source={{uri: message.photoURL}} className="h-12 w-12 rounded-full absolute top-0 -left-14" />
      <Text className="text-white">{message.message}</Text>
    </View>
  );
};

export default RecieverMessage;
