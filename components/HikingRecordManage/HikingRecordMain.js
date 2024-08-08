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

export const HikingRecordMain = ({ setMenu2, userName, HikingInfoSet, DeleteData }) => {
  const [loadedData, setLoadedData] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [opacityBT, setOpacityBT] = useState(false);

  useEffect(() => {
    loadingData();
  }, [loadData]);

  const MoveSub = (menu, info) => {
    setMenu2(menu);
    HikingInfoSet(info);
  };
  console.log("a");

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
    if (item.Name == userName) {
      return (
        <Pressable
          key={item.id}
          style={{
            backgroundColor: "#EEE",
            marginTop: "3%",
            // paddingHorizontal: '2%',
            paddingLeft: "2%",
            flexDirection: "row",
            justifyContent: "space-between",
            opacity: opacityBT == item.id ? 0.5 : 1,
          }}
          onPressIn={() => setOpacityBT(item.id)}
          onPressOut={() => setOpacityBT(false)}
          onPress={() => MoveSub("sub", item)}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.textheader}>날짜:</Text>
            <Text style={styles.textbottom}>{item.Date}</Text>

            <Text style={styles.textheader}> 산:</Text>
            <Text style={styles.textbottom}>{item.Mount}</Text>

            <Text style={styles.textheader}> 이름:</Text>
            <Text style={styles.textbottom}>{item.Name}</Text>
          </View>
          <Pressable
            onPress={() => DeleteData(item)}
            style={{
              height: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingRight: "2%",
            }}
          >
            <Feather name="delete" size={30} color="black" />
          </Pressable>
        </Pressable>
      );
    }
  };

  // console.log('loadedData', loadedData);
  return (
    <View style={{ flex: 1, width: "100%", marginTop: 10 }}>
      <View
        style={[
          styles.AddDataPlace,
          {
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            paddingLeft: "10%",
            paddingRight: "10%",
          },
        ]}
      >
        <Text style={{ fontSize: "20%" }}>{userName}</Text>
      </View>
      {/* 불러온 리스트 */}
      <FlatList
        contentContainerStyle={{ paddingHorizontal: "2%" }}
        data={loadedData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => listItemViewReturn(item)}
      />
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
