import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";

import { AddHikingData } from "./AddHikingData.js";
import { HikingRecordManage } from "./HikingRecordManage.js";
import { RankingCheck } from "./RankingCheck.js";
import { UserInfoManage } from "./UserInfoManage";
import { MountInfoManage } from "./MountInfoManage.js";
import { CreateTable } from "./CreateTable";


export default function App() {
  const [screen, setScreen] = useState("1");

  useEffect(() => {
    CreateTable();
  }, []);
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.MainMenu}>
        <View style={{ flexDirection: "row" }}>
          <Pressable onPress={() => setScreen("1")}>
            <Text style={[styles.MainMenuButton, {backgroundColor: screen == 1 ? '#A9D0F5' : null}]}>산행 기록 추가</Text>
          </Pressable>
          <Text style={{ backgroundColor: "#A9D0F5" }}> </Text>
          <Pressable onPress={() => setScreen("2")}>
            <Text style={[styles.MainMenuButton, {backgroundColor: screen == 2 ? '#A9D0F5' : null}]}>산행 기록 조회</Text>
          </Pressable>
          <Text style={{ backgroundColor: "#A9D0F5" }}> </Text>
          <Pressable onPress={() => setScreen("3")}>
            <Text style={[styles.MainMenuButton, {backgroundColor: screen == 3 ? '#A9D0F5' : null}]}>순위 확인</Text>
          </Pressable>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Pressable onPress={() => setScreen("4")}>
            <Text style={[styles.MainMenuButton, {backgroundColor: screen == 4 ? '#A9D0F5' : null}]}>유저 정보</Text>
          </Pressable>
          <Text style={{ backgroundColor: "#A9D0F5" }}> </Text>
          <Pressable onPress={() => setScreen("5")}>
            <Text style={[styles.MainMenuButton, {backgroundColor: screen == 5 ? '#A9D0F5' : null}]}>산 정보</Text>
          </Pressable>
        </View>
      </View>
      {screen === "1" && <AddHikingData />}
      {screen === "2" && <HikingRecordManage />}
      {screen === "3" && <RankingCheck />}
      {screen === "4" && <UserInfoManage />}
      {screen === "5" && <MountInfoManage />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  MainMenu: {
    marginTop: "15%",
    position: "relative",
    backgroundColor: "tomato",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  MainMenuButton: {
    fontSize: 20,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  SubMenuAdd: {
    flexDirection: "row",
    backgroundColor: "grey",
  },
  AddDataPlace: {
    height: 20,
    width: 40,
    backgroundColor: "tomato",
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
    fontSize: 12,
    fontWeight: "700",
  },
  textbottom: {
    color: "#111",
    fontSize: 18,
  },
});
