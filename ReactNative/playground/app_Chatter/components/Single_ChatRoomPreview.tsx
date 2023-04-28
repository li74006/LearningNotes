import { StyleSheet } from "react-native";

import EditScreenInfo from "./EditScreenInfo";
import { Text, View } from "./Themed";
import { Image, Pressable } from "react-native";
import { useNavigation, useRouter } from "expo-router";

export default function Single_ChatPreview({ data_roomPreview }) {
  const user = data_roomPreview.users[1];
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        router.push({ pathname: "/Single_ChatRoom", params: { id: data_roomPreview.id } });
      }}
    >
      <View style={styles.avatar}>
        <Image
          source={{
            uri: user.imageUri,
          }}
          style={styles.image}
        />

        {data_roomPreview.newMessage && (
          <View style={styles.badgeCont}>
            <Text style={styles.badgeText}>{data_roomPreview.newMessage}</Text>
          </View>
        )}
      </View>

      <View style={styles.textContainer}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.msgTime}>{data_roomPreview.lastMessage.createdAt}</Text>
        </View>
        <Text numberOfLines={1} style={styles.messagePreview}>
          {data_roomPreview.lastMessage.content}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
  },

  avatar: {
    marginLeft: 0,
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
