import { StyleSheet, Text, View } from "react-native";

const isSelf = true;

export default function Single_Dialogue() {
  return (
    <View style={[styles.container]}>
      <Text style={styles.message}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga velit
        repellat sequi illo perspiciatis similique aut nam, voluptatibus sunt
        modi est harum veniam blanditiis vel maxime quos iusto dolorum dolore
        omnis in aliquam architecto adipisci ipsam? Ad, molestiae adipisci?
        Facere possimus placeat aut? Provident dolore sunt debitis est facere
        nisi.
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: isSelf ? "yellowgreen" : "pink",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    maxWidth: "75%",
    alignSelf: isSelf ? "flex-end" : "auto",
  },

  message: {},
});
