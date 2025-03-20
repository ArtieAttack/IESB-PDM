import React from 'react'
import { View, Text } from 'react-native'

const Header = () => {
  return (
    <View
      className="w-full pb-6 flex flex-row"
      style={{
        justifyContent: "space-between",
        padding: 4,
      }}
    >
      <Text className="text-3xl font-bold">Padaria</Text>
      <Text
        className="border"
        style={{
          borderRadius: 5,
          borderColor: "#2E8B57",
          padding: 8,
          backgroundColor: "#2E8B57",
          color: "#FFF",
          width: 95,
          textAlign: "center",
        }}
      >
        Login
      </Text>
    </View>
  );
}

export default Header