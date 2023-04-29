import { StyleSheet, Text, View, Image, useWindowDimensions } from "react-native";

export default function Single_HomeHeader() {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      margin: -16, // 左右默认 16px 的 margin 无法取消，只能手动清除
      alignItems: "center",
      paddingHorizontal: 18,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
  });

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg" }}
        style={styles.avatar}
      />
      <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "500" }}>Home</Text>
    </View>
  );
}
