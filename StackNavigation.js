import React from "react";
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import LoginScreen from "./screens/LoginScreen";
import ModalScreen from "./screens/ModalScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuth from "./hooks/useAuth";
import StartScreen from "./screens/StartScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MatchScreen from "./screens/MatchScreen";
import MessagesScreen from "./screens/MessagesScreen";

const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Message" component={MessagesScreen} />
          </Stack.Group>

          <Stack.Group
            screenOptions={{ presentation: "modal", headerShown: false }}
          >
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              presentation: "transparentModal",
              headerShown: false,
            }}
          >
            <Stack.Screen name="Match" component={MatchScreen} />
          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Screen
            name="Start"
            options={{ headerShown: false }}
            component={StartScreen}
          />
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={LoginScreen}
          />
          <Stack.Screen
            name="Register"
            options={{ headerShown: false }}
            component={RegisterScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;
