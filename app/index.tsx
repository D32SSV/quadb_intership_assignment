import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  TextInput,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import ShowList from "@/components/components/List";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = {
  Home: undefined;
  Search: undefined;
};
export default function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<NavigationProp, "Home">>();
  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        await fetch("https://api.tvmaze.com/search/shows?q=all")
          .then((data) => data.json())
          .then((data) => {
            setData(data);
            setIsLoading(false);
          });
      } catch (err: any) {
        setError(err?.message);
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size={"large"} color={"green"} />
        <Text style={styles.nameText}>Fetching Data...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText]}>{error}</Text>
        </View>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Search here..."
            onPress={() => {
              navigation.navigate("Search");
            }}
            placeholderTextColor={"gray"}
          />
          <ShowList shows={data} />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "black",

    // alignItems: "center",
    // justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 16,
    marginHorizontal: 20,
    borderRadius: 5,
    color: "red",
  },
  errorContainer: {
    backgroundColor: "#FFC0CB",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    margin: 16,
    alignItems: "center",
  },
  errorText: {
    color: "#D8000C",
    fontSize: 16,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#333333",
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center", 
    alignItems: "center", 
  },
  nameText: {
    fontSize: 30,
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
