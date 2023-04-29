import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ChevronLeftIcon, PhoneIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'

const Header = ({title, callEnabled}) => {
    const navigation = useNavigation()
  return (
    <View className="p-2 flex-row items-center justify-between">
    <View className="flex flex-row items-center">
        <TouchableOpacity onPress={()=>navigation.goBack()} className="p-2">
            <ChevronLeftIcon size={34} color="#ff5864"/>
        </TouchableOpacity>
        <Text className="text-2xl font-bold pl-2">{title} </Text>
    </View>
    {
        callEnabled &&(
            <TouchableOpacity className="rounded-full mr-4 p-3 bg-red-200">
                <PhoneIcon size={20} color="red" />
            </TouchableOpacity>
        )
    }
      
    </View>
  )
}

export default Header