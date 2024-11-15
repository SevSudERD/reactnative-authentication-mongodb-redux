import { Text, TouchableOpacity, View, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "expo-router";
import AntDesign from "react-native-vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const navigation = useNavigation();
  const [hasAccount, setHasAccount] = useState(true);


  const handleChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      console.log(data);
      // Başarılı bir yanıt geldiyse yönlendirme yapabilirsin
      navigation.navigate("index"); // Burayı uygun bir yere yönlendirin
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const handleSignIn = () => {
    navigation.navigate("signin");
  };

  return (
    <View className="flex-1 flex-col gap-4 items-center justify-center">
      <Image
          source={{ uri: 'https://img1.picmix.com/output/stamp/normal/4/2/8/9/1739824_4f929.gif' }} // Buraya gif'in URL'sini ekle
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.5 }} // İsteğe bağlı stil ayarları
          resizeMode="cover"
        />
      <Text className="text-3xl font-semibold text-amber-600 my-8">
        Sign Up
        <AntDesign name="adduser" size={30} color="#d97706" />
      </Text>
      <TextInput
        placeholder="Username"
        onChangeText={(value) => handleChange("username", value)}
        className="bg-slate-50 p-3 rounded-lg w-3/4 h-14"
      />
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
      <TouchableOpacity onPress={handleSubmit} style={{ width: "75%" }}>
        <LinearGradient
          colors={["#f59e0b", "#b45309"]} // Gradyan renkleri
          style={{ borderRadius: 8 }}
        >
          <Text className="text-white text-center text-lg font-semibold p-3 uppercase h-14">
            Sign Up
          </Text>
        </LinearGradient>
      </TouchableOpacity>


      <Text className="mt-4">Already Have an Account?</Text>

      {hasAccount && (
        <TouchableOpacity onPress={handleSignIn}>
          <Text className="text-slate-800 text-1xl">Sign In</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SignUp;
