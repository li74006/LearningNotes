import { StyleSheet, Text, View, Image, useWindowDimensions } from "react-native";

export default function Single_HomeHeader() {
  const { width } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      width,
      flexDirection: "row",
      justifyContent: "space-between",
      margin: -16, // 左右默认 16px 的 margin 无法取消，只能手动清除
      alignItems: "center",
      paddingHorizontal: 18,
    },
    avatar: {
      width: 30,
      height: 30,
      borderRadius: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg" }}
        style={styles.avatar}
      />
      <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "500" }}>Home</Text>
      <Text style={{ fontSize: 26, width: 30, textAlign: "center" }}>+</Text>
    </View>
  );
}
