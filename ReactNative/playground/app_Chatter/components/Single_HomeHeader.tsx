import { StyleSheet, Text, SafeAreaView, View, Image } from "react-native";

export default function Single_HomeHeader() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          source={{ uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg" }}
          style={styles.avatar}
        />
        <Text style={{ textAlign: "center" }}>kkk</Text>
        <Image
          source={{ uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg" }}
          style={styles.avatar}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
