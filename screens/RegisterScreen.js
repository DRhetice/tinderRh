import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  createUserWithEmailAndPassword,
  currentUser,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { Firestore } from "firebase/firestore";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = async () => {
    if (email && pass && userName) {
      try {
        await createUserWithEmailAndPassword(auth, email, pass).then(() => {
          console.log(currentUser)
          // auth.currentUser
          //   .sendEmailVerification({
          //     handleCodeInApp: true,
          //     url: "https://tinderrh-52144.firebaseapp.com",
          //   })
          //   .then(() => {
          //     db.collection("users").doc(auth.currentUser.uid).set({
          //       userName,
          //       email,
          //     });
          //   })
          //   .catch((error) => {
          //     alert(error.message);
          //   });
        });
      } catch (error) {
        console.log("got error:", error.message);
      }
    }
  };

  return (
    <View className="flex-1 bg-white pt-3 mt-3">
      <ImageBackground
        className="flex-1 "
        resizeMode="cover"
        source={{ uri: "https://tinder.com/static/tinder.png" }}
      >
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/tinder.png")}
            className="w-20 h-20"
          />
        </View>

        <View className="flex-1 bg-white px-8 pt-8 rounded-t-[50px] ">
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Username</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={userName}
              onChangeText={(value) => setUserName(value)}
              placeholder="Enter Name"
            />
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={email}
              onChangeText={(value) => setEmail(value)}
              placeholder="Enter Email"
            />
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
              secureTextEntry
              value={pass}
              onChangeText={(value) => setPass(value)}
              placeholder="Enter Password"
            />
            <TouchableOpacity
              onPress={handleSubmit}
              className="py-3 bg-yellow-400 rounded-xl"
            >
              <Text className="font-xl font-bold text-center text-gray-700">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-xl text-gray-700 font-bold text-center py-5">
            Or
          </Text>
          <View className="flex-row justify-center space-x-12">
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image
                source={require("../assets/icons/google.png")}
                className="w-10 h-10"
              />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image
                source={require("../assets/icons/apple.png")}
                className="w-10 h-10"
              />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image
                source={require("../assets/icons/facebook.png")}
                className="w-10 h-10"
              />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center mt-7">
            <Text className="text-gray-500 font-semibold">
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="font-semibold text-yellow-500"> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default RegisterScreen;
