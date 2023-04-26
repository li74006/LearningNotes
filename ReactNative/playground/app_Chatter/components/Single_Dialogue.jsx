import { StyleSheet, Text, View } from "react-native";

const selfId = "u1";

export default function Single_Dialogue({ data_Dialogue }) {
  const isSelf = data_Dialogue.user.id === selfId;
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

  return (
    <View style={[styles.container]}>
      <Text style={styles.message}>{data_Dialogue.content}</Text>
    </View>
  );
}
