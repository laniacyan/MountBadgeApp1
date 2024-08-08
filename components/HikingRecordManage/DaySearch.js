import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
  Modal,
  SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import * as SQLite from "expo-sqlite";
import DateTimePicker from "@react-native-community/datetimepicker";

export const DaySearch = ({ userDB, setMenu }) => {
  // 보여줄 메뉴를 정하는 state
  const [opacityBT, setOpacityBT] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchResult, setSearchResult] = useState([]);
  console.log('a');

  const onChangeStart = (event, data) => {
    setStartDate(data);
    setEndDate(data);
  };
  const onChangeEnd = (event, data) => {
    setEndDate(data);
  };
  const listItemViewReturn = (item) => {
    return (
      <Pressable
        key={item.id}
        style={{
          backgroundColor: "#EEE",
          marginTop: "3%",
          padding: "2%",
          flexDirection: "row",
          justifyContent: "space-between",
          opacity: opacityBT == item.id ? 0.5 : 1,
        }}
        onPressIn={() => setOpacityBT(item.id)}
        onPressOut={() => setOpacityBT(false)}
        onPress={() => setMenu("main", item.Name)}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textheader}> 이름:</Text>
          <Text style={styles.textbottom}>{item.Name}</Text>

          <Text style={styles.textheader}> 산:</Text>
          <Text style={styles.textbottom}>{item.Mount}</Text>

          <Text style={styles.textheader}>날짜:</Text>
          <Text style={styles.textbottom}>{item.Date}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: "2%",
          }}
        ></View>
      </Pressable>
    );
  };
  const setDayforSQL = (data) => {
    console.log("data", data);
    const Year = data.getFullYear();
    const Month =
      data.getMonth() + 1 < 10
        ? "0" + (data.getMonth() + 1)
        : data.getMonth() + 1;
    const Day = data.getDate() < 10 ? "0" + data.getDate() : data.getDate();
    console.log("return for sql data");
    return Year + "-" + Month + "-" + Day;
  };
  const SearchDate = async () => {
    try {
      const db = await SQLite.openDatabaseAsync("MountBedge.db");
      const data = await db.getAllAsync(
        `SELECT * FROM HikingData WHERE Date BETWEEN '${setDayforSQL(
          startDate
        )}' AND '${setDayforSQL(endDate)}';`
      );
      setSearchResult(data);
      // Alert.alert("산행 기록 조회 완료.");
      return;
    } catch (error) {
      console.error("Error testing database connection:", error);
    }
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <View
        style={[
          styles.AddDataPlace,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        <DateTimePicker
          value={startDate}
          mode={"date"}
          is24Hour={true}
          onChange={onChangeStart}
          locale="ko-kr"
        />
        <Text>~</Text>
        <DateTimePicker
          value={endDate}
          mode={"date"}
          is24Hour={true}
          onChange={onChangeEnd}
          locale="ko-kr"
          style={{ marginRight: "5%" }}
        />
        <Pressable
          style={{
            marginRight: "5%",
            padding: "3%",
            backgroundColor: "#CEF611",
          }}
          onPress={() => SearchDate()}
        >
          <Text style={{ fontSize: "20%" }}>검색</Text>
        </Pressable>
      </View>
      {/* 불러온 리스트 */}
      <Text style={{}}></Text>
      {searchResult.length == 0 ? (
        <Text style={{ fontSize: 20, textAlign: "center", marginTop: "50%" }}>
          검색된 정보가 없습니다.
        </Text>
      ) : (
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={searchResult}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => listItemViewReturn(item)}
        />
      )}

      <Text style={{ padding: "2%" }}></Text>
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
