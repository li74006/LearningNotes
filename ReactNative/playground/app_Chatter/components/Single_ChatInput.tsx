import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

export default function Single_ChatInput() {
  const [input, setInput] = useState("");

  const sendText = () => {
    console.log("Sending:" + input);
  };

  const onPress = () => {
    if (input) {
      sendText();
    } else {
      console.log("empty");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput value={input} onChangeText={setInput} style={styles.input} placeholder="Shoot something..." />
      <Pressable onPress={onPress}>
        <View style={styles.plus}>
          <Text style={styles.text_plus}>+</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgray",
    borderRadius: 100,
    flexDirection: "row",
    alignSelf: "flex-end",
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 2,
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
