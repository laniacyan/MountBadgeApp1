import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  Modal,
  TextInput,
  FlatList,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import DateTimePicker from "@react-native-community/datetimepicker";
import Feather from "@expo/vector-icons/Feather";

export const HikingRecordMain = ({ subMenuOn }) => {
  const [loadedData, setLoadedData] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    loadingData();
  }, [loadData]);

  // 산행 검색
  // 산행 정보 불러오기
  async function loadingData() {
    console.log("load data");
    try {
      const db = await SQLite.openDatabaseAsync("MountBedge.db");
      const loadingData = await db.getAllAsync("SELECT * FROM HikingData");
      setLoadedData(loadingData);
      return;
    } catch (error) {
      console.log(error);
    }
  }
  // 산행 정보 보여주기
  const listItemViewReturn = (item) => {
    // console.log("item", item);

    if (item.Name.includes(searchValue) == true || searchValue == "") {
      return (
        <View
          key={item.id}
          style={{
            backgroundColor: "#EEE",
            marginTop: "3%",
            padding: "2%",
            // borderRadius: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textheader}>날짜:</Text>
            <Text style={styles.textbottom}>{item.Date}</Text>

            <Text style={styles.textheader}> 산:</Text>
            <Text style={styles.textbottom}>{item.Mount}</Text>

            <Text style={styles.textheader}> 이름:</Text>
            <Text style={styles.textbottom}>{item.Name}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: "2%",
            }}
          >
            <TouchableOpacity
              style={{ marginRight: "2%" }}
              onPress={() => subMenuOn(item)}
            >
              <AntDesign name="filetext1" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => DeleteData(item)}>
              <Feather name="delete" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };
  // 산행 정보 삭제
  function DeleteData(item) {
    // console.log("dl item", item);
    Alert.alert("", "삭제합니까?", [
      { text: "취소" },
      {
        text: "삭제",
        onPress: async () => {
          try {
            const db = await SQLite.openDatabaseAsync("MountBedge.db");
            await db.runAsync(`DELETE FROM HikingData WHERE id = ${item.id}`);

            loadingData();
          } catch (error) {
            console.log(error);
          }
        },
      },
    ]);
  }
  // console.log('loadedData', loadedData);
  return (
    <View style={{ flex: 1, width: "100%", marginTop: 10 }}>
      {/* 데이터 검색 */}
      <TextInput
        style={styles.AddDataPlace}
        onChangeText={setSearchValue}
        value={searchValue}
        placeholder="검색할 이름을 입력해 주세요."
        placeholderTextColor={"#000000"}
        // onSubmitEditing={loadingData}
        onSubmitEditing={() => loadingData()}
      />
      {/* 불러온 리스트 */}
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <FlatList
          style={{ marginTop: 30 }}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={loadedData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => listItemViewReturn(item)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  UpdateMainMenu: {
    flexDirection: "row",
    backgroundColor: "#A9D0F5",
    justifyContent: "center",
    width: "40%",
    height: "15%",
  },
  UpdateSubMenu1: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#81F7D8",
    width: "30%",
  },
  UpdateSubMenu2: {
    width: "80%",
    backgroundColor: "#F6CEF5",
    justifyContent: "center",
    alignItems: "center",
  },
  AddDataPlace: {
    height: "7%",
    backgroundColor: "#CEF6F5",
  },
  AddDataButton: {
    fontSize: "20%",
    backgroundColor: "#23d817",
    textAlign: "center",
  },
  ButtonLine: {
    width: "100%",
    height: "4%",
    backgroundColor: "white",
  },
  textheader: {
    color: "#111",
    fontSize: 14,
    fontWeight: "700",
  },
  textbottom: {
    color: "#111",
    fontSize: 14,
  },
});
