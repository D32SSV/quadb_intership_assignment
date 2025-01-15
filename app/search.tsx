import { StatusBar, StyleSheet, TextInput } from "react-native";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import ShowList from "@/components/components/List";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);

  const debounceSearch = async (term: string) => {
    if (!term) {
      setData([]);
      return;
    }

    setIsLoading(true);
    try {
      await fetch(`https://api.tvmaze.com/search/shows?q=${term}`)
        .then((res) => res.json())
        .then((data) => setData(data));
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!searchTerm) return;
    const debounceTimeout = setTimeout(() => {
      debounceSearch(searchTerm);
    }, 500); 

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);
  return (
    <View style={styles.container}>
      {!data && (
        <Text style={styles.nodata}>Enter Text to search for movies</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Search here..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholderTextColor={"gray"}
      />
      {data && data.length && <ShowList shows={data} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    paddingTop: StatusBar.currentHeight,
  },
  nodata: { color: "red", fontSize: 16, textAlign: "center" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    height: 40,
    width: 369,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 16,
    marginHorizontal: 18,
    borderRadius: 5,
    color: "red",
    // marginTop: 16,
  },
});
