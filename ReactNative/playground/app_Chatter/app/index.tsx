import { View } from "../components/Themed";
import { StyleSheet, FlatList, useWindowDimensions } from "react-native";
import { Stack } from "expo-router";

import Single_ChatRoomPreview from "../components/Single_ChatRoomPreview";
import ChatRooms from "../assets/dummy-data/ChatRooms";
import Single_HomeHeader from "../components/Single_HomeHeader";

export default function Home() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: Single_HomeHeader,
        }}
      />
      <FlatList
        data={ChatRooms}
        // horizontal // 控制 FlatList 滚动方向
        showsVerticalScrollIndicator={false} // 是否显示垂直滚动条
        renderItem={({ item }) => <Single_ChatRoomPreview data_roomPreview={item} />}
        // ListHeaderComponent={() => <Text>Hello</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 8,
    paddingTop: 0,
  },

  avatar: {
    marginLeft: 10,
    marginRight: 14,
    flexDirection: "row",
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },

  badgeCont: {
    position: "absolute",
    right: -10,
    backgroundColor: "yellowgreen",
    borderWidth: 1,
    borderColor: "white",
    height: 20,
    paddingHorizontal: 4.6,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: "white",
  },

  textContainer: {
    flex: 1,
    padding: 3,
    justifyContent: "center",
  },

  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  name: {
    fontSize: 18,
  },

  msgTime: {
    fontSize: 12,
    color: "gray",
  },

  messagePreview: {
    color: "gray",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
