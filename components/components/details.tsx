import React from "react";
import { View, Text, Image, StyleSheet, Button, Linking } from "react-native";

const stripHtmlTags = (html: string): string => {
  return html.replace(/<\/?[^>]+(>|$)/g, ""); // Simple regex to remove HTML tags
};
const Details = ({ route }: { route: any }) => {
  const { show } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: show.show?.image?.original }}
        style={styles.thumbnail}
      />
      <Text style={styles.title}>{show.show.name}</Text>
      <View style={styles.div}>
        <Text style={[styles.title, styles.card]}>{show.show.language}</Text>

        <Text style={[styles.title, styles.card]}>
          {show.score.toString().slice(2, 3)}/10
        </Text>
      </View>
      <View style={styles.div}>
        <Text style={[styles.title, styles.card, styles.genre]}>Genres :</Text>

        {show.show.genres?.map((gen: string, id: React.Key) => (
          <Text key={id} style={[styles.title, styles.card]}>
            {gen}
          </Text>
        ))}
      </View>
      {/* <View style={styles.div}>
        <Text style={[styles.title, styles.card]}>{show.show.averageRuntime} min</Text>

        <Text style={[styles.title, styles.card]}>
          {show.show.premiered}
        </Text>
      </View> */}

      <Text style={styles.summary}>{stripHtmlTags(show.show?.summary)}</Text>
      <Button
        title="Watch Now"
        onPress={() => Linking.openURL(show.show.url)}
      />
      <Button
        title="Visit Official Site"
        onPress={() => Linking.openURL(show.show.officialSite)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "black",
    gap: 3,
  },
  button: { marginTop: 5 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "crimson",
    textAlignVertical: "center",
    textAlign: "center",
  },
  div: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 2,
  },
  genre: {
    backgroundColor: "crimson",
  },
  card: {
    fontSize: 12,
    width: 70,
    height: 20,
    borderRadius: 5,
    backgroundColor: "yellow",
    color: "black",
    textAlignVertical: "center",
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 1,
  },
  thumbnail: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth:1,
    borderColor:'crimson'
  },
  summary: {
    fontSize: 16,
    color: "#555",
    textAlign: "justify",
  },
});

export default Details;
