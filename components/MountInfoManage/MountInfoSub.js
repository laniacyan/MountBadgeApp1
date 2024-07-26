import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";

export const MountInfoSub = ({ subMenuOff, MountInfo }) => {
  const [nameDataUpdate, setNameDataUpdate] = useState("");
  const [regionDataUpdate, setRegionDataUpdate] = useState("");
  const [difDataUpdate, setDifDataUpdate] = useState("");

  useEffect(() => {
    console.log("sub Mount info", MountInfo);
    setNameDataUpdate(MountInfo.Name);
    setRegionDataUpdate(MountInfo.Region);
    setDifDataUpdate(MountInfo.Difficulty);
  }, []);
  // 산 정보 수정
  const UpdateMountInfo = async () => {
    // 받은 정보를 받은 id에 UPDATE 시킨다.
    console.log("update data start");
    try {
      const db = await SQLite.openDatabaseAsync("MountBedge.db");
      await db.runAsync(
        `
          UPDATE MountInfo
          SET Name = ?,
          Region = ?,
          Difficulty = ?
          WHERE id = ?`,
        nameDataUpdate,
        regionDataUpdate,
        difDataUpdate,
        MountInfo.id
      );
      Alert.alert("데이터 수정 완료");
      subMenuOff();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <View style={{ alignItems: "center" }}>
        <View style={{ flexDirection: "row" }}>
          <Text>이름:</Text>
          <TextInput
            style={{}}
            onChangeText={setNameDataUpdate}
            value={nameDataUpdate}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>지역:</Text>
          <TextInput
            style={{}}
            onChangeText={setRegionDataUpdate}
            value={regionDataUpdate}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>난이도:</Text>
          <TextInput
            style={{}}
            onChangeText={setDifDataUpdate}
            value={difDataUpdate}
          />
        </View>
      </View>
      <Text onPress={() => subMenuOff()}>메인 메뉴로 돌아가기</Text>
      <Text onPress={() => UpdateMountInfo()}>수정 완료</Text>
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
