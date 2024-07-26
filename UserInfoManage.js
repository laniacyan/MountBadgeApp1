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
  SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import Feather from "@expo/vector-icons/Feather";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { UserInfoMain } from "./components/UserInfoManage/UserInfoMain"
import { UserInfoSub } from "./components/UserInfoManage/UserInfoSub"

// 부모 메뉴
export const UserInfoManage = () => {
  // 보여줄 메뉴를 정하는 state
  const [subState, setSubState] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const subMenuOn = (item) => {
    setSubState(true);
    setUserInfo(item);
  };
  const subMenuOff = () => setSubState(false);

  const setDayforSQL = (data) => {
    const Year = data.getFullYear();
    const Month = (data.getMonth()+1 < 10 ? '0' + (data.getMonth()+1) : (data.getMonth()+1));
    const Day = (data.getDate() < 10 ? '0' + data.getDate() : data.getDate());
    return Year + "-" + Month + "-" + Day;
  };

  return (
    <View style={styles.AddDataMenu}>
      {subState == false && (
        <UserInfoMain subMenuOn={subMenuOn} setDayforSQL={setDayforSQL} />
      )}
      {subState == true && (
        <UserInfoSub
          subMenuOff={subMenuOff}
          UserInfo={userInfo}
          setDayforSQL={setDayforSQL}
        />
      )}
    </View>
  );
};

// 스타일 모음
const styles = StyleSheet.create({
  AddDataMenu: {
    flex: 1,
    width: "100%",
  },
  SubMenuAdd: {
    flexDirection: "row",
    backgroundColor: "grey",
  },
  AddData: {
    fontSize: "33%",
    textAlign: "center",
  },
  AddDataPlace: {
    flex: 1,
    backgroundColor: "#CEF6F5",
  },
  AddMenuLine: {
    width: "100%",
    height: 5,
    backgroundColor: "#ccc",
    margin: "10px 0",
  },
  ButtonLine: {
    width: "100%",
    height: "2%",
    backgroundColor: "white",
  },
  AddDataButton: {
    alignItems: "center",
    width: "30%",
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
});
