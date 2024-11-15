import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const navigation = useNavigation();
  const [hasAccount, setHasAccount] = useState(false);

  const handleSignup = () => {
    navigation.navigate("signup");
  };

  return (
    <>
      <View className="flex-1 items-center justify-center">
      <Image
          source={{ uri: 'https://i.pinimg.com/originals/e5/3f/e4/e53fe41f011cd69dcebdb669bc07756d.gif' }} // Buraya gif'in URL'sini ekle
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.5 }} // İsteğe bağlı stil ayarları
          resizeMode="50%"
        />
        <Text className="text-4xl text-amber-600 font-semibold text-center mb-9">Authentication</Text>
        
        <Text className="text-2xl text-gray-800  text-center mb-3">🪹 This is a Basic Authentication App with React-Native. This is a fullstack app and for this project I used many projects. Here are some of the technologies used ...</Text>
        <Text className="text-2xl text-gray-800  text-center mb-3">🍁 Frontend : React | Redux | Tailwind </Text>
        <Text className="text-2xl text-gray-800  text-center mb-3">🍂 Backend : Nodemon | Express | MongoDB </Text>

        {!hasAccount && (
          <TouchableOpacity onPress={handleSignup}>
            <LinearGradient
              colors={["#d97706", "#fcd34d"]}
              style={{ borderRadius: 8, marginTop: 50 }}
            >
              <Text className="text-white text-center text-lg font-semibold p-3 uppercase h-14">
                Start Now
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
        <StatusBar style="auto" />
      </View>
    </>
  );
}
