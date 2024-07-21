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
} from "react-native";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import Feather from "@expo/vector-icons/Feather";
import { AntDesign } from "@expo/vector-icons";

// 부모 메뉴
export const MountInfoManage = () => {
  // 보여줄 메뉴를 정하는 state
  const [subState, setSubState] = useState(false);
  const [mountInfo, setMountInfo] = useState({});

  const subMenuOn = (item) => {
    setSubState(true);
    setMountInfo(item);
  };
  const subMenuOff = () => setSubState(false);

  return (
    <View style={styles.AddDataMenu}>
      {subState == false && <MountInfoMain subMenuOn={subMenuOn} />}
      {subState == true && (
        <MountInfoSub subMenuOff={subMenuOff} MountInfo={mountInfo} />
      )}
    </View>
  );
};
// 메인 메뉴
const MountInfoMain = ({ subMenuOn }) => {
  // 불러온 데이터를 담는 state
  const [loadedData, setLoadedData] = useState([]);
  // 검색 및 추가에 사용되는 state
  const [nameData, setNameData] = useState("");
  const [regionData, setRegionData] = useState("");
  const [difData, setDifData] = useState("");

  // 데이터 불러오기
  useEffect(() => {
    LoadingMountInfo();
  }, []);

  // 산 정보 불러오기
  const LoadingMountInfo = async () => {
    console.log("load data");
    try {
      const db = await SQLite.openDatabaseAsync("MountBedge.db");
      const loadingData = await db.getAllAsync("SELECT * FROM MountInfo");
      setLoadedData(loadingData);
      return
    } catch (error) {
      console.log(error);
    }
  };
  // 산 정보 보여주기
  const LoadedListView = (item) => {
    console.log("loaded list view item", item);
    console.log("loaded list view item Name", item.Name);
    // 정보를 보여주는 list
    return (
      <View
        key={item.id}
        style={{
          backgroundColor: "#EEE",
          marginTop: "3%",
          padding: "2%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <View style={{ flexDirection: "row", marginLeft: "2%" }}>
            <Text style={styles.textheader}>이름:</Text>
            <Text style={styles.textbottom}>{item.Name}</Text>
            <Text style={styles.textheader}> 지역:</Text>
            <Text style={styles.textbottom}>{item.Region}</Text>
          </View>
          <View style={{ flexDirection: "row", marginLeft: "2%" }}>
            <Text style={styles.textheader}> 난이도:</Text>
            <Text style={styles.textbottom}>{item.Difficulty}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingRight: "1%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              subMenuOn(item);
              console.log("데이터 이동");
            }}
          >
            <AntDesign name="filetext1" size={24} color="black" />
          </TouchableOpacity>
          <Text> </Text>
          <TouchableOpacity onPress={() => DeleteMountInfo(item)}>
            <Feather name="delete" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  // 산 검색
  const SearchMountInfo = async () => {};
  // 산 정보 추가
  const InsertMountInfo = async () => {
    // 이름이 적혀있는지 확인한다.
    if (nameData == "") {
      Alert.alert("이름을 적어주세요!", "error!");
      return;
    }
    // 데이터 추가
    try {
      const db = await SQLite.openDatabaseAsync("MountBedge.db");
      await db.execAsync(`
            INSERT INTO MountInfo (Name, Region, Difficulty) VALUES (
              '${nameData}', 
              '${regionData}', 
              '${difData}');`);
      // 데이터 입력 성공 시 출력
      console.log("Database connection is working");
      Alert.alert("데이터 입력 완료");
      // 성공시 데이터를 다시 불러온다.
      LoadingMountInfo();
    } catch (error) {
      console.error("error", error);
    }
  };
  // 산 정보 삭제
  const DeleteMountInfo = (item) => {
    // 지울 정보를 받아 삭제 명령어를 넣는다.
    console.log("delete item", item);
    Alert.alert("", "삭제합니까?", [
      { text: "취소" },
      {
        text: "삭제",
        onPress: async () => {
          try {
            const db = await SQLite.openDatabaseAsync("MountBedge.db");
            await db.runAsync(`DELETE FROM MountInfo WHERE id = ${item.id}`);
            LoadingMountInfo();
          } catch (error) {
            console.log(error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.AddDataMenu}>
      {/* 정보 검색 및 추가 */}
      <View>
        <View style={styles.SubMenuAdd}>
          <Text style={styles.AddData}>이름</Text>
          <TextInput
            style={styles.AddDataPlace}
            onChangeText={setNameData}
            value={nameData}
          />
        </View>
        <View style={styles.AddMenuLine}></View>
        <View style={styles.SubMenuAdd}>
          <Text style={styles.AddData}>지역</Text>
          <TextInput
            style={styles.AddDataPlace}
            onChangeText={setRegionData}
            value={regionData}
          />
        </View>
        <View style={styles.AddMenuLine}></View>
        <View style={styles.SubMenuAdd}>
          <Text style={styles.AddData}>난이도</Text>
          <TextInput
            style={styles.AddDataPlace}
            onChangeText={setDifData}
            value={difData}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <View style={styles.ButtonLine}></View>
          <Pressable onPress={InsertMountInfo}>
            <Text style={styles.AddDataButton}>산 추가</Text>
          </Pressable>
          <View style={styles.ButtonLine}></View>
          <Pressable onPress={SearchMountInfo}>
            <Text style={styles.AddDataButton}>산 검색</Text>
          </Pressable>
          <View style={styles.ButtonLine}></View>
        </View>
      </View>
      {/* 산 목록 */}
      <View style={{ flex: 1, backgroundColor: "white", width: "100%" }}>
        <FlatList
          style={{ flex: 1, marginTop: 30, width: "100%" }}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={loadedData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => LoadedListView(item)}
        />
      </View>
    </View>
  );
};
// 수정 메뉴
const MountInfoSub = ({ subMenuOff, MountInfo }) => {
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
