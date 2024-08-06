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
} from "react-native";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import DateTimePicker from "@react-native-community/datetimepicker";

export const HikingRecordSub = ({
  setMenu,
  hikingInfo,
  mountDB,
}) => {
  // 수정에 사용되는 state
  const [dateData, setDateData] = useState(new Date());
  const [mountData, setMountData] = useState("");
  const [pointData, setPointData] = useState("");
  const [nameData, setNameData] = useState("");
  // modal state
  const [modalMVisible, setModalMVisible] = useState(false);
  const [modalPVisible, setModalPVisible] = useState(false);
  const [modalNVisible, setModalNVisible] = useState(false);

  const [searchValue, setSearchValue] = useState(false);
  const pointList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // const [selectPoint, setSelectPoint] = useState(1);

  // 받은 데이터를 넣어준다.
  useEffect(() => {
    // console.log("sub user info1", hikingInfo);
    setDateData(new Date(hikingInfo.Date));
    setMountData(hikingInfo.Mount);
    setPointData(hikingInfo.Point.toString());
    setNameData(hikingInfo.Name);
  }, []);
  // 모달 닫기
  const closeModal = () => {
    setModalMVisible(false);
    setModalPVisible(false);
    setModalNVisible(false);
  };
  // 날짜 데이터 구조 변경
  const setDayforSQL = (data) => {
    const Year = data.getFullYear();
    const Month =
      data.getMonth() + 1 < 10
        ? "0" + (data.getMonth() + 1)
        : data.getMonth() + 1;
    const Day = data.getDate() < 10 ? "0" + data.getDate() : data.getDate();
    return Year + "-" + Month + "-" + Day;
  };
  // 날짜 변경
  const onChange = (event, data) => {
    setDateData(new Date(data));
  };
  // 산행 정보 수정
  const UpdateUserInfo = async () => {
    // 받은 정보를 받은 id에 UPDATE 시킨다.
    console.log("update data start");
    try {
      const db = await SQLite.openDatabaseAsync("MountBedge.db");
      await db.runAsync(
        `
        UPDATE HikingData
        SET Date = ?,
        Mount = ?,
        Point = ?,
        Name = ?
        WHERE id = ?`,
        setDayforSQL(dateData),
        mountData,
        pointData,
        nameData,
        hikingInfo.id
      );
      Alert.alert("데이터 수정 완료");
      setMenu('main', nameData);
    } catch (error) {
      console.error(error);
    }
  };
  // 산 리스트
  const listItemViewMount = (item) => {
    if (item.Name.includes(searchValue) == true || searchValue == "") {
      return (
        <Pressable onPress={() => setMount(item.Name)} style={{}}>
          <View
            key={item.id}
            style={{
              backgroundColor: "#EEE",
              marginTop: "3%",
              padding: "2%",
              borderRadius: 20,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text>{item.Name}</Text>
          </View>
        </Pressable>
      );
    }
  };
  const setMount = (item) => {
    setMountData(item);
    closeModal();
  };

  const listPointView = (item) => {
    return (
      <View>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: pointData == item ? "#58FA82" : "#CEF6F5",
            alignItems: "center",
          }}
          activeOpacity={0}
          onPress={() => setPointData(item)}
        >
          <Text style={{ fontSize: "30" }}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      {/* 수정 메뉴 */}
      <View style={{ alignItems: "center" }}>
        {/* 날짜 */}
        <View style={styles.UpdateMainMenu}>
          <View style={styles.UpdateSubMenu1}>
            <Text>날짜</Text>
          </View>
          <View style={styles.UpdateSubMenu2}>
            <DateTimePicker
              value={dateData}
              mode={"date"}
              is24Hour={true}
              onChange={onChange}
              locale="ko-kr"
            />
          </View>
        </View>
        <View style={styles.ButtonLine}></View>
        {/* 산 */}
        <View style={styles.UpdateMainMenu}>
          <View style={styles.UpdateSubMenu1}>
            <Text>산</Text>
          </View>
          <View style={styles.UpdateSubMenu2}>
            <Button
              onPress={() => setModalMVisible(!modalMVisible)}
              title={mountData}
              color="#841584"
            />
          </View>
        </View>
        <View style={styles.ButtonLine}></View>
        {/* 점수 */}
        <View style={styles.UpdateMainMenu}>
          <View style={styles.UpdateSubMenu1}>
            <Text>점수</Text>
          </View>
          <Pressable
            style={styles.UpdateSubMenu2}
            onPress={() => setModalPVisible(!modalPVisible)}
          >
            <Text>{pointData.toString()}</Text>
          </Pressable>
        </View>
        <View style={styles.ButtonLine}></View>
        {/* 이름 */}
        <View style={styles.UpdateMainMenu}>
          <View style={styles.UpdateSubMenu1}>
            <Text>이름</Text>
          </View>
          <Pressable
            style={styles.UpdateSubMenu2}
            onPress={() => Alert.alert("이름은 변경하실 수 없습니다.")}
          >
            <Text> {nameData}</Text>
          </Pressable>
        </View>
      </View>
      {/* 버튼 메뉴 */}
      {/* Todo 눌렀을때 정말 돌아갈건지 물어보기. */}
      <Text
        style={styles.AddDataButton}
        onPress={() => {
          setMenu('main', nameData);
        }}
      >
        메인 메뉴로 돌아가기
      </Text>
      <View style={styles.ButtonLine}></View>
      <Text style={styles.AddDataButton} onPress={() => UpdateUserInfo()}>
        수정 완료
      </Text>
      {/* 모달 메뉴 */}
      {/* 산 modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalMVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalMVisible(!modalMVisible);
        }}
      >
        <View
          style={{
            flex: 0.7,
            marginTop: "50%",
            margin: "10%",
            backgroundColor: "#519C77",
            borderRadius: 20,
            padding: 30,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          {/* 검색창 */}
          <View style={{ flexDirection: "row" }}>
            <TextInput
              onChangeText={setSearchValue}
              value={searchValue}
              placeholder="찾으시는 산 이름을 입력해 주세요."
              placeholderTextColor={"#000"}
              style={{ flex: 1 }}
            />
            <AntDesign
              name="close"
              size={24}
              color="black"
              onPress={() => closeModal()}
            />
          </View>
          {/* 결과창 */}
          <Text> </Text>
          <View>
            <FlatList
              style={{}}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              data={mountDB}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => listItemViewMount(item)}
            />
          </View>
        </View>
      </Modal>
      {/* 점수 modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalPVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalPVisible(!modalPVisible);
        }}
      >
        {/* 스타일 수정 필요 */}
        <SafeAreaView
          style={{
            flex: 0.7,
            marginTop: "50%",
            margin: "10%",
            backgroundColor: "#519C77",
            borderRadius: 20,
            padding: 30,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Button
            title="선택"
            onPress={() => setModalPVisible(!modalPVisible)}
          />
          <FlatList
            style={{}}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={pointList}
            keyExtractor={(item) => item}
            renderItem={({ item }) => listPointView(item)}
          />
          <Button
            title="선택"
            onPress={() => setModalPVisible(!modalPVisible)}
          />
        </SafeAreaView>
      </Modal>
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
