import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import { CreateTable } from "./CreateTable";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { Picker } from "@react-native-picker/picker";
import { MonthInput } from "./components/RankingCheck/MonthInput";
import { DirectInput } from "./components/RankingCheck/DirectInput";

export const RankingCheck = () => {
  const [dateInput, setDateInput] = useState(true);
  const [searchValue, setSearchValue] = useState([]);

  const setDayforSQL = (data) => {
    const Year = data.getFullYear();
    const Month =
      data.getMonth() + 1 < 10
        ? "0" + (data.getMonth() + 1)
        : data.getMonth() + 1;
    const Day = data.getDate() < 10 ? "0" + data.getDate() : data.getDate();
    console.log("return for sql data");
    return Year + "-" + Month + "-" + Day;
  };

  const SearchMonth = async (year, month) => {
    try {
      const db = await SQLite.openDatabaseAsync("MountBedge.db");
      const data = await db.getAllAsync(
        `SELECT * FROM HikingData WHERE Date BETWEEN '${year}-${month}-01' AND '${year}-${month}-31';`
      );
      setSearchValue(data);
      console.log(
        "sql search code",
        `SELECT * FROM HikingData WHERE Date BETWEEN '${year}-${month}-01' AND '${year}-${month}-31';`
      );
      Alert.alert("산행 기록 조회 완료.");
      return;
    } catch (error) {
      console.error("Error testing database connection:", error);
    }
  };
  const SearchDirect = async (startDate, endDate) => {
    try {
      const db = await SQLite.openDatabaseAsync("MountBedge.db");
      const data = await db.getAllAsync(
        `SELECT * FROM HikingData WHERE Date BETWEEN '${setDayforSQL(
          startDate
        )}' AND '${setDayforSQL(endDate)}';`
      );
      setSearchValue(data);
      console.log(
        "sql search code",
        `SELECT * FROM HikingData WHERE Date BETWEEN '${setDayforSQL(
          startDate
        )}' AND '${setDayforSQL(endDate)}';`
      );
      Alert.alert("산행 기록 조회 완료.");
      return;
    } catch (error) {
      console.error("Error testing database connection:", error);
    }
  };
  console.log("searchValue", searchValue);
  // 날짜를 이용해 DB에서 산행 기록을 검색한다.
  const SearchValueList = (item) => {
    // console.log("item", item);
    return (
      <View
        key={item.id}
        style={{
          backgroundColor: "#EEE",
          marginTop: "3%",
          padding: "2%", // borderRadius: 20,
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
            onPress={() => console.log(item)}
          >
            <AntDesign name="filetext1" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log(item)}>
            <Feather name="delete" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ width: "100%", height: "100%", flex: 1 }}>
      {/* 날짜 입력 메뉴 */}
      <View
        style={{
          backgroundColor: "#E0E0F8",
          height: "20%",
          width: "100%",
        }}
      >
        <View
          style={{
            // flex: 1,
            height: "30%",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Pressable
            onPress={() => {
              setDateInput(true);
              setSearchValue([]);
            }}
            style={({ pressed }) => [
              {
                width: "30%",
                height: "50%",
                borderRadius: 10,
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "10%",
                marginTop: "3%",
              },
              {
                opacity: pressed ? 0.5 : 1,
                backgroundColor: pressed ? "#CEECF5" : null,
              },
            ]}
          >
            <Text>월별 입력</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setDateInput(false);
              setSearchValue([]);
            }}
            style={({ pressed }) => [
              {
                width: "30%",
                height: "50%",
                borderRadius: 10,
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                marginRight: "10%",
                marginTop: "3%",
              },
              {
                opacity: pressed ? 0.5 : 1,
                backgroundColor: pressed ? "#CEECF5" : null,
              },
            ]}
          >
            <Text>직접 입력</Text>
          </Pressable>
        </View>
        <View style={{ width: "100%", height: "80%", backgroundColor: "red" }}>
          {dateInput == true && <MonthInput SearchMonth={SearchMonth} />}
          {dateInput == false && <DirectInput SearchDirect={SearchDirect} />}
        </View>
      </View>
      {/* 산행 목록 */}
      <View style={{ flex: 1 }}>
        {searchValue.length == 0 ? (
          <Text style={{ fontSize:20, textAlign:'center', marginTop:'50%' }}>검색된 정보가 없습니다.</Text>
        ) : (
          <View>
            {/* <Text>
              검색 기간 : {searchDate[0]} ~ {searchDate[1]}
            </Text> */}
            <FlatList
              style={{ marginTop: 30 }}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              data={searchValue}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => SearchValueList(item)}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  SubMenuAdd: {
    flexDirection: "row",
    backgroundColor: "grey",
  },
  AddDataPlace: {
    height: "7%",
    backgroundColor: "#CEF6F5",
  },
  AddDataButton: {
    fontSize: 20,
    backgroundColor: "#23d817",
  },
  CheckDataButton: {
    fontSize: 20,
    backgroundColor: "#23d817",
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
  modalContent: {
    height: "25%",
    width: "100%",
    backgroundColor: "#fff",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
});
