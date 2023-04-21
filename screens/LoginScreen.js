import { View, Text, TouchableOpacity, TextInput, SafeAreaView, Image } from 'react-native'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import {ArrowLeftIcon} from 'react-native-heroicons/outline'
import { ImageBackground } from 'react-native'

const LoginScreen = () => {
  const navigation=useNavigation()
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const handleSubmit = async()=>{
        if(email && pass){
            try {
                await signInWithEmailAndPassword(auth,email,pass)
                
            } catch (error) {
                console.log('got error:',error.message)
                
            }
        }
    }
  return (
    <View className="flex-1 bg-white pt-3 mt-3" >
      <ImageBackground className="flex-1 " 
        resizeMode="cover"
        source={{uri:"https://tinder.com/static/tinder.png"}}
        >
        

<View className="flex-row justify-start">
  <TouchableOpacity onPress={()=> navigation.goBack()} 
  className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
    <ArrowLeftIcon size="20" color="black" />
  </TouchableOpacity>
</View>
<View  className="flex-row justify-center">
  <Image source={require('../assets/images/tinder.png')} 
  style={{width: 200, height: 200}} />
</View>



<View 
className="flex-1 bg-white px-8 pt-8">
  <View className="form space-y-2">
    <Text className="text-gray-700 ml-4">Email Address</Text>
    <TextInput 
      className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
      placeholder="email"
      value={email}
      onChangeText={value =>  setEmail(value)}
    />
    <Text className="text-gray-700 ml-4">Password</Text>
    <TextInput 
      className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
      secureTextEntry
      placeholder="password"
      value={pass}
      onChangeText={value => setPass(value)}
    />
    <TouchableOpacity className="flex items-end">
      <Text className="text-gray-700 mb-5">Forgot Password?</Text>
    </TouchableOpacity>
    <TouchableOpacity  onPress={handleSubmit}
      className="py-3 bg-yellow-400 rounded-xl">
        <Text 
            className="text-xl font-bold text-center text-gray-700"
        >
                Login
        </Text>
     </TouchableOpacity>
    
  </View>
  <Text className="text-xl text-gray-700 font-bold text-center py-5">Or</Text>
  <View className="flex-row justify-center space-x-12">
    <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
      <Image source={require('../assets/icons/google.png')} className="w-10 h-10" />
    </TouchableOpacity>
    <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
      <Image source={require('../assets/icons/apple.png')} className="w-10 h-10" />
    </TouchableOpacity>
    <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
      <Image source={require('../assets/icons/facebook.png')} className="w-10 h-10" />
    </TouchableOpacity>
  </View>
  <View className="flex-row justify-center mt-7">
      <Text className="text-gray-500 font-semibold">
          Don't have an account?
      </Text>
      <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
          <Text className="font-semibold text-yellow-500"> Sign Up</Text>
      </TouchableOpacity>
  </View>
  
</View>


        </ImageBackground>
    
  </View>


   
  )
}

export default LoginScreen