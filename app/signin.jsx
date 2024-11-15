import { Text, TouchableOpacity, View, TextInput } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [hasAccount, setHasAccount] = useState(true);

  const handleChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigation.navigate('index');
    } catch (error) {
      dispatch(signInFailure(error));
      
    }
  };

  const handleSignIn = () => {
    navigation.navigate("signup");
  };

  return (
    <View className="flex-1 flex-col gap-4 items-center justify-center">
      <Text className="text-3xl font-semibold my-7 text-amber-600">
        Sign In
        <AntDesign name="user" size={30} color="#b45309" />
      </Text>

      <TextInput
        placeholder="Email"
        onChangeText={(value) => handleChange("email", value)}
        className="bg-slate-50 p-3 rounded-lg w-3/4 h-14"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(value) => handleChange("password", value)}
        className="bg-slate-50 p-3 rounded-lg w-3/4 h-14"
      />
      <TouchableOpacity
        className="flex w-3/4 rounded-lg"
        onPress={handleSubmit}
      >
        <LinearGradient
          colors={["#f59e0b", "#b45309"]}
          style={{ borderRadius: 8 }}
        >
          <Text className="text-white text-center text-lg font-semibold p-3 uppercase h-14">
            Sign In
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {error && <Text className="text-red-600 mt-4">{error.message || "User is not found"}</Text>}

      <Text className="mt-4">Do Not Have an Account?</Text>
      {hasAccount && (
        <TouchableOpacity onPress={handleSignIn}>
          <Text className="text-black text-1xl">Sign Up</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SignIn;
