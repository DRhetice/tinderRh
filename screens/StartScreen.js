import { View, Text, Button, TouchableOpacity, SafeAreaView, ImageBackground } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const StartScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 " >
        <ImageBackground className="flex-1" 
        resizeMode="cover"
        source={{uri:"https://tinder.com/static/tinder.png"}}
        >
<View className="flex-1 flex justify-around my-4">
            <Text 
                className="text-white font-bold text-4xl text-center">
                Let's Get Started!
            </Text>
            <View className="flex-row justify-center">
                {/* <Image source={require("../assets/images/welcome.png")}
                    style={{width: 350, height: 350}} /> */}
            </View>
            <View className="space-y-4">
                <TouchableOpacity
                    onPress={()=> navigation.navigate('Register')}
                    className="py-3 bg-yellow-400 mx-7 rounded-xl">
                        <Text 
                            className="text-xl font-bold text-center text-gray-700"
                        >
                            Sign Up
                        </Text>
                </TouchableOpacity>
               
                <View className="flex-row justify-center">
                    <Text className="text-white font-semibold">Already have an account?</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                        <Text className="font-semibold text-yellow-400"> Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </ImageBackground>
        
    </SafeAreaView>
  );
};

export default StartScreen;
