import { useState } from "react";
import { SafeAreaView, View, Text, TextInput, InputAccessoryView, StyleSheet } from "react-native";

export default function Single_ChatInput() {
  const [input, setInput] = useState("");

  return (
    <View style={styles.container}>
      <TextInput value={input} onChangeText={setInput} style={styles.input} placeholder="Shoot something..." />
      <View style={styles.plus}>
        <Text style={styles.text_plus}>+</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgray",
    borderRadius: 100,
    flexDirection: "row",
    alignSelf: "flex-end",
  },

  input: {
    flex: 1,
    paddingLeft: 20,
  },

  plus: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "dodgerblue",
    marginVertical: 6,
    marginRight: 8,
    borderRadius: 20,
  },

  text_plus: {
    color: "white",
  },
});
