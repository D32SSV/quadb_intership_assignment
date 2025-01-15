import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

type Show = {
  score: number;
  show: {
    id: number;
    url: string;
    name: string;
    image: { original: string };
    summary: string;
    language: string;
    genres: string[];
    averageRuntime: number;
    premiered: string;
    officialSite: string;
  };
};

type RootStackParamList = {
  Home?: undefined;
  Details: { show: Show };
};

type ShowItemProps = {
  item: Show;
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const stripHtmlTags = (html: string): string => {
  if(!html)return "No Description Available";
  return html.replace(/<\/?[^>]+(>|$)/g, ""); // Simple regex to remove HTML tags
};

const ShowItem: React.FC<ShowItemProps> = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate("Details", { show: item })}
    >
      <Image
        source={{ uri: item.show.image?.original }}
        style={styles.thumbnail}
      />
      <Text style={styles.title}>{item.show.name}</Text>
      <Text style={styles.summary}>{stripHtmlTags(item.show?.summary)}</Text>
    </TouchableOpacity>
  );
};

const ShowList: React.FC<{ shows: Show[] }> = ({ shows }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Home">>();

  return (
    <FlatList
      data={shows}
      renderItem={({ item }) => (
        <ShowItem item={item} navigation={navigation} />
      )}
      keyExtractor={(item) => item.show.id.toString()}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      ListEmptyComponent={() => <Text>No Data Found</Text>}
      ListHeaderComponent={<Text style={styles.headerText}>Movies List</Text>}
      ListFooterComponent={<Text style={styles.footerText}>End of List</Text>}
    />
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 12,
    color: "crimson",
  },
  footerText: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 12,
    color: "crimson",
  },
  thumbnail: {
    width: 100,
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "crimson",
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: "crimson",
  },
  summary: {
    marginLeft: 10,
    fontSize: 14,
    color: "#555",
    flex: 2,
  },
});

export default ShowList;
