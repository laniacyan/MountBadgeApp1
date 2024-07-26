import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import DateTimePicker from "@react-native-community/datetimepicker";

export const UserInfoSub = ({ subMenuOff, UserInfo, setDayforSQL }) => {
  // 수정에 사용되는 state
  const [nameDataUpdate, setNameDataUpdate] = useState("");
  const [birthDataUpdate, setBirthDataUpdate] = useState(new Date());
  const [genderDataUpdate, setGenderDataUpdate] = useState("");
  const [addrDataUpdate, setAddrDataUpdate] = useState("");
  const [pNDataUpdate, setPNDataUpdate] = useState("");

  // useEffect(() => {console.log('sub user info1', UserInfo);}, []);
  useEffect(() => {
    console.log("sub user info1", UserInfo);
    setNameDataUpdate(UserInfo.Name);
    setBirthDataUpdate(new Date(UserInfo.Birth));
    setGenderDataUpdate(UserInfo.Gender);
    setAddrDataUpdate(UserInfo.Address);
    setPNDataUpdate(UserInfo.PhoneNumber);
  }, []);

  const onChange = (event, data) => {
    setBirthDataUpdate(new Date(data));
  };

  // 유저 정보 수정
  const UpdateUserInfo = async () => {
    // 받은 정보를 받은 id에 UPDATE 시킨다.
    console.log("update data start");
    try {
      const db = await SQLite.openDatabaseAsync("MountBedge.db");
      await db.runAsync(
        `
          UPDATE UserInfo
          SET Name = ?,
          Birth = ?,
          Gender = ?,
          Address = ?,
          PhoneNumber = ?
          WHERE id = ?`,
        nameDataUpdate,
        setDayforSQL(birthDataUpdate),
        genderDataUpdate,
        addrDataUpdate,
        pNDataUpdate,
        UserInfo.id
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
        {/* 이름 메뉴 */}
        <View style={{ flexDirection: "row" }}>
          <Text>이름:</Text>
          <TextInput
            style={{}}
            onChangeText={setNameDataUpdate}
            value={nameDataUpdate}
          />
        </View>
        {/* 생년월일 메뉴 */}
        <View style={{ flexDirection: "row" }}>
          <Text>생년월일:</Text>
          <DateTimePicker
            value={birthDataUpdate}
            mode={"date"}
            is24Hour={true}
            onChange={onChange}
            locale="ko-kr"
          />
        </View>
        {/* 성별 메뉴 */}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.AddData}>성별</Text>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor:
                genderDataUpdate == "남성" ? "#58FA82" : "#CEF6F5",
            }}
            activeOpacity={0}
            onPress={() => setGenderDataUpdate("남성")}
          >
            <Text>남성</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor:
                genderDataUpdate == "여성" ? "#58FA82" : "#CEF6F5",
            }}
            activeOpacity={0}
            onPress={() => setGenderDataUpdate("여성")}
          >
            <Text>여성</Text>
          </TouchableOpacity>
          {/* <TextInput
              style={{}}
              onChangeText={setGenderDataUpdate}
              value={genderDataUpdate}
            /> */}
        </View>
        {/* 주소 메뉴 */}
        <View style={{ flexDirection: "row" }}>
          <Text>주소:</Text>
          <TextInput
            style={{}}
            onChangeText={setAddrDataUpdate}
            value={addrDataUpdate}
          />
        </View>
        {/* 전화번호 메뉴 */}
        <View style={{ flexDirection: "row" }}>
          <Text>전화번호:</Text>
          <TextInput
            style={{}}
            onChangeText={setPNDataUpdate}
            value={pNDataUpdate}
          />
        </View>
      </View>
      <Text onPress={() => subMenuOff()}>메인 메뉴로 돌아가기</Text>
      <Text onPress={() => UpdateUserInfo()}>수정 완료</Text>
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
