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
import { HikingRecordSub } from "./components/HikingRecordManage/HikingRecordSub"
import { HikingRecordMain } from "./components/HikingRecordManage/HikingRecordMain"

export const HikingRecordManage = () => {
  // 보여줄 메뉴를 정하는 state
  const [subState, setSubState] = useState(false);
  const [hikingInfo, setHikingInfo] = useState({});
  const [mountDB, setMountDB] = useState([]);
  const [userDB, setUserDB] = useState([]);
  const subMenuOn = (item) => {
    setSubState(true);
    setHikingInfo(item);
  };
  const subMenuOff = () => setSubState(false);

  // DB에서 데이터를 불러온다.
  useEffect(() => {
    loadingData("MountInfo");
    loadingData("UserInfo");
  }, []);
  async function loadingData(Info) {
    console.log("load data");
    try {
      const db = await SQLite.openDatabaseAsync("MountBedge.db");
      const data = await db.getAllAsync(`SELECT * FROM ${Info}`);
      if (Info === "MountInfo") {
        setMountDB(data);
      } else if (Info === "UserInfo") {
        setUserDB(data);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{ flex: 1, width: "100%" }}>
      {subState == false && <HikingRecordMain subMenuOn={subMenuOn} />}
      {subState == true && (
        <HikingRecordSub
          subMenuOff={subMenuOff}
          hikingInfo={hikingInfo}
          mountDB={mountDB}
          userDB={userDB}
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
