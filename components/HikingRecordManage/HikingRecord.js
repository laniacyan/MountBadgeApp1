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
import * as SQLite from "expo-sqlite";
// import { Feather } from '@expo/vector-icons';
import { HikingRecordMain } from "./HikingRecordMain";
import { HikingRecordSub } from "./HikingRecordSub";
import { UpdateUserInfo } from "./HikingRecordSub";

export const HikingRecord = ({ mountDB, mainMenu, setMenu, userName }) => {
  // 보여줄 메뉴를 정하는 state
  const [hikingInfo, setHikingInfo] = useState({});
  const [subMenu, setSubMenu] = useState("main");

  const HikingInfoSet = (item) => {
    setHikingInfo(item);
  };
  const setMenu2 = (item) => {
    setSubMenu(item);
  };
  
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

  console.log("a");

  return (
    <View style={{ flex: 1, width: "100%" }}>
      {subMenu == "main" && (
        <HikingRecordMain
          setMenu2={setMenu2}
          userName={userName}
          HikingInfoSet={HikingInfoSet}
          DeleteData={DeleteData}
        />
      )}
      {subMenu == "sub" && (
        <HikingRecordSub
          setMenu2={setMenu2}
          hikingInfo={hikingInfo}
          mountDB={mountDB}
          userName={userName}
          DeleteData={DeleteData}
        />
      )}
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
