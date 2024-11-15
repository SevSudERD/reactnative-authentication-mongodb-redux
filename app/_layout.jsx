import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import "../global.css";
import { store } from "../redux/store";
import {Provider} from "react-redux";

const RootLayout = () => {
  return (
    <Provider store={store}>
    <Stack>
    <Stack.Screen name="signup" options={{headerShown: false}} />
     <Stack.Screen name="index" options={{headerShown: false}} />
     <Stack.Screen name="signin" options={{headerShown: false}} />
    </Stack>
    </Provider>
  )
}

export default RootLayout

const styles = StyleSheet.create({})