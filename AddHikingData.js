// import {
//   Alert,
//   Pressable,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from "react-native";
// import { useState, useEffect } from "react";
// import * as SQLite from "expo-sqlite";
// import { CreateTable } from "./CreateTable";

// const InsertHikingData = async (MainData) => {
//   // 받은 값을 db에 저장한다.
//   const db = await SQLite.openDatabaseAsync("MountBedge.db");
//   console.log("save data");

//   try {
//     await db.execAsync(`
//         INSERT INTO HikingData (Date, Mountain, Point, Name) VALUES (
//           '${MainData[0].dayData}',
//           '${MainData[1].mountData}',
//           '${MainData[2].pointData}',
//           '${MainData[3].nameData}');`);
//     // 데이터 입력 성공 시 출력
//     console.log("Database connection is working");
//     Alert.alert("데이터 입력 완료");
//   } catch (error) {
//     // 실패 시 출력
//     console.error("Error testing database connection:", error);
//   }
// };
// const checkingData = (checkData) => {
//   // 만약 내용이 들어 있다면
//   if (checkData != "") {
//     return true;
//   } else return false;
// };

// // 데이터 저장
// export const AddDataMenu = () => {
//   const [dayData, setDayData] = useState("");
//   const [mountData, setMountData] = useState("");
//   const [pointData, setPointData] = useState("");
//   const [nameData, setNameData] = useState("");

//   const AddData = () => {
//     // 필수 내용을 채웠는지 확인 후 InsertHikingData로 값을 넘긴다.
//     const addData = [{ dayData }, { mountData }, { pointData }, { nameData }];
//     for (const value of addData) {
//       inData = checkingData(Object.values(value)[0]);
//       if (inData != true) {
//         Alert.alert("내용 부족", "빈 내용이 없도록 해주세요");
//         return;
//       }
//     }
//     InsertHikingData(addData);
//   };

//   const Clear = () => {
//     setDayData("");
//     setMountData("");
//     setPointData("");
//     setNameData("");
//   };

//   const DeleteTable = async () => {
//     const db = await SQLite.openDatabaseAsync("MountBedge.db");
//     console.log("delete table HikingData");
//     try {
//       await db.execAsync(`DROP TABLE HikingData`);
//       console.log("테이블 삭제 완료");
//     } catch (error) {
//       console.error("error", error);
//     }
//   };

//   // 코드 줄이기 목표 1
//   // const inputData = () => {
//   //   const inputList = ['날짜', '산', '점수', '이름']
//   //   const inputList2 = [setDayData, setMountData, setPointData, setNameData]
//   //   const inputList3 = [dayData, mountData, pointData, nameData]
//   // }

//   return (
//     <View style={styles.AddDataMenu}>
//       <View style={styles.SubMenuAdd}>
//         <Text style={styles.AddData}>날짜</Text>
//         <TextInput
//           style={styles.AddDataPlace}
//           onChangeText={setDayData}
//           value={dayData}
//         />
//       </View>
//       <View style={styles.AddMenuLine}></View>
//       <View style={styles.SubMenuAdd}>
//         <Text style={styles.AddData}>산</Text>
//         <TextInput
//           style={styles.AddDataPlace}
//           onChangeText={setMountData}
//           value={mountData}
//         />
//       </View>
//       <View style={styles.AddMenuLine}></View>
//       <View style={styles.SubMenuAdd}>
//         <Text style={styles.AddData}>점수</Text>
//         <TextInput
//           style={styles.AddDataPlace}
//           onChangeText={setPointData}
//           value={pointData}
//         />
//       </View>
//       <View style={styles.AddMenuLine}></View>
//       <View style={styles.SubMenuAdd}>
//         <Text style={styles.AddData}>이름</Text>
//         <TextInput
//           style={styles.AddDataPlace}
//           onChangeText={setNameData}
//           value={nameData}
//         />
//       </View>
//       <View style={styles.ButtonLine}></View>
//       <Pressable onPress={AddData}>
//         <Text style={styles.AddDataButton}>데이터 추가</Text>
//       </Pressable>
//       <View style={styles.ButtonLine}></View>
//       <Pressable onPress={Clear}>
//         <Text style={styles.AddDataButton}>내용 지우기</Text>
//       </Pressable>
//       {/* <View style={styles.ButtonLine}></View>
//       <Pressable onPress={DeleteTable}>
//         <Text style={styles.AddDataButton}>테이블 삭제</Text>
//       </Pressable>
//       <View style={styles.ButtonLine}></View>
//       <Pressable onPress={CreateTable}>
//         <Text style={styles.AddDataButton}>테이블 생성</Text>
//       </Pressable> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   AddDataMenu: {
//     flex: 0.7,
//     width: "50%",
//   },
//   SubMenuAdd: {
//     flex: 0.11,
//     flexDirection: "row",
//     backgroundColor: "grey",
//     fontSize: 20,
//   },
//   AddData: {
//     flex: 0.5,
//     fontSize: "33%",
//     textAlign: "center",
//   },
//   AddDataPlace: {
//     flex: 1,
//     fontSize: "25%",
//     // fontSize: '1.2em',
//     backgroundColor: "tomato",
//   },
//   AddDataButton: {
//     fontSize: "20%",
//     backgroundColor: "#23d817",
//     textAlign: "center",
//   },
//   AddMenuLine: {
//     width: "100%",
//     height: 5,
//     backgroundColor: "#ccc",
//     margin: "10px 0",
//   },
//   ButtonLine: {
//     width: "100%",
//     height: "2%",
//     backgroundColor: "white",
//   },
// });

// {/* 점수 modal */}
// <Modal
//   animationType="slide"
//   transparent={true}
//   visible={modalPVisible}
//   onRequestClose={() => {
//     Alert.alert("Modal has been closed.");
//     setModalPVisible(!modalPVisible);
//   }}
// >
//   <View style={styles.modalContent}>
//     <View
//       style={{
//         backgroundColor: "#A9D0F5",
//         flexDirection: "row",
//         justifyContent: "center",
//       }}
//     >
//       <Button
//         title="선택"
//         onPress={() => setModalPVisible(!modalPVisible)}
//       />
//     </View>
//     <Picker
//       selectedValue={pointData}
//       onValueChange={(itemValue, itemIndex) => setPointData(itemValue)}
//     >
//       {items.map((value) => createPickerItem(`${value}`, value, value))}
//     </Picker>
//   </View>
// </Modal>
// const createPickerItem = (label, value, key) => {
//   return <Picker.Item key={key} label={label} value={value} />;
// };

import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import * as SQLite from "expo-sqlite";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";

export const AddHikingData = () => {
  const [dayData, setDayData] = useState(new Date());
  const [mountData, setMountData] = useState("산 선택");
  const [pointData, setPointData] = useState("0");
  const [modalMVisible, setModalMVisible] = useState(false);
  const [modalPVisible, setModalPVisible] = useState(false);
  const [modalNVisible, setModalNVisible] = useState(false);
  const [mountDB, setMountDB] = useState([]);
  const [userDB, setUserDB] = useState([]);

  const pointList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // 데이터를 지운다.(Todo)
  const Clear = () => {
    setDayData(new Date());
    setMountData("산 선택");
    setPointData("0");
    UserDBClear();
  };
  const UserDBClear = () => {
    setChecks([]);
    userDB.map((item) =>
      item.Checked == 1 ? (item.Checked = !item.Checked) : null
    );
  };
  const onChange = (event, data) => {
    setDayData(data);
  };
  const setDayforSQL = (data) => {
    const Year = data.getFullYear();
    const Month = (data.getMonth()+1 < 10 ? '0' + (data.getMonth()+1) : (data.getMonth()+1));
    const Day = (data.getDate() < 10 ? '0' + data.getDate() : data.getDate());
    return Year + "-" + Month + "-" + Day;
  };
  useEffect(() => {
    loadingData("MountInfo");
    loadingData("UserInfo");
  }, []);
  // DB에서 데이터를 불러온다.
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

  const DeleteTable = async () => {
    const db = await SQLite.openDatabaseAsync("MountBedge.db");
    console.log("delete table UserInfo");
    try {
      await db.execAsync(`DROP TABLE HikingData`);
      console.log("테이블 삭제 완료");
    } catch (error) {
      console.error("error", error);
    }
  };
  // DeleteTable();

  const InsertHikingData = async () => {
    // 올바른 데이터가 들어왔는지 확인한다.
    // 받은 값을 db에 저장한다.

    // 산 정보가 산 선택일 경우 산을 입력해달라는 안내 메시지를 출력.
    // checks에 정보가 없을 경우 정보를 추가하지 않는다.
    if (mountData == "산 선택") {
      Alert.alert("어느 산을 올랐는지 알려주세요");
      return;
    } else if (checks.length == 0) {
      Alert.alert("누가 갔는지 한명 이상 알려주세요.");
      return;
    } else if (pointData == 0) {
      Alert.alert("점수를 입력해 주세요.");
      return;
    }
    try {
      const db = await SQLite.openDatabaseAsync("MountBedge.db");
      console.log(
        "insert data",
        ` INSERT INTO HikingData (Date, Mount, Point, Name) VALUES ${checks.map(
          (name) =>
            `('${setDayforSQL(
              dayData
            )}', '${mountData}', '${pointData}', '${name}')`
        )};`
      );
      await db.execAsync(
        ` INSERT INTO HikingData (Date, Mount, Point, Name) VALUES ${checks.map(
          (name) =>
            `('${setDayforSQL(
              dayData
            )}', '${mountData}', '${pointData}', '${name}')`
        )};`
      );
      // 데이터 입력 성공 시 출력
      console.log("Database connection is working");
      Alert.alert("데이터 입력 완료");
      Clear();
    } catch (error) {
      // 실패 시 출력
      console.error("Error testing database connection:", error);
    }
  };

  const [searchValue, setSearchValue] = useState(false);

  const [checks, setChecks] = useState([]);

  const setButtonName = () => {
    let names = "";
    if (checks.length == 0) {
      return "이름을 선택해주세요";
    } else return checks.join("\n");
  };
  const buttonName = setButtonName();

  const closeModal = () => {
    setModalMVisible(false);
    setModalPVisible(false);
    setModalNVisible(false);
  };
  const onPressModalOpen = () => {
    console.log("팝업을 여는 중입니다.");
    setIsModalVisible(true);
  };
  const onPressModalClose = () => {
    setIsModalVisible(false);
  };
  const setMount = (item) => {
    setMountData(item);
    closeModal();
  };
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

  const listItemViewUser = (item) => {
    // 체크박스 누를 시
    const change_item = () => {
      if (item.Checked == false) add_check();
      else if (item.Checked == true) del_check();
      item.Checked = !item.Checked;
    };
    // 체크박스 추가
    const add_check = () => {
      const newChecks = [...checks, item.Name];
      setChecks(newChecks);
    };
    // 체크박스 제외
    const del_check = () => {
      const newChecks = [...checks].filter((value) => value != item.Name);
      setChecks(newChecks);
    };

    if (item.Name.includes(searchValue) == true || searchValue == "") {
      return (
        // onPress시 체크리스트를 변경한다.
        <Pressable onPress={() => change_item()}>
          <View
            key={item.id}
            style={{
              backgroundColor: "#EEE",
              marginTop: "3%",
              padding: "2%",
              borderRadius: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 24, marginLeft: "5%" }}>{item.Name}</Text>
            <View>
              {/* <AntDesign name={iconName[i]} size={24} color={iconColor[i]} /> */}
              {item.Checked == 0 && (
                <AntDesign
                  name="checksquareo"
                  size={24}
                  color="black"
                  style={{ marginRight: "5%" }}
                />
              )}
              {item.Checked == 1 && (
                <AntDesign
                  name="checksquare"
                  size={24}
                  color="green"
                  style={{ marginRight: "5%" }}
                />
              )}
            </View>
          </View>
        </Pressable>
      );
    }
    return;
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
    <View style={styles.AddDataMenu}>
      {/* 날짜 메뉴 */}
      <View style={[styles.SubMenuAdd, { justifyContent: "space-between" }]}>
        <View>
          <Text style={{ flex: 1, fontSize: "33%", textAlign: "center" }}>
            날짜
          </Text>
        </View>
        <View>
          <DateTimePicker
            style={{
              flex: 1,
              fontSize: "25%",
              backgroundColor: "tomato",
            }}
            value={dayData}
            mode={"date"}
            is24Hour={true}
            onChange={onChange}
            locale="ko-kr"
          />
        </View>
      </View>
      <View style={styles.AddMenuLine}></View>
      {/* 산 메뉴 */}
      <View style={styles.SubMenuAdd}>
        <Text style={styles.AddData}>산</Text>
        <View style={styles.AddDataPlace}>
          <Button
            onPress={() => setModalMVisible(!modalMVisible)}
            title={mountData}
            color="#841584"
          />
        </View>
      </View>
      <View style={styles.AddMenuLine}></View>
      {/* 점수 메뉴 */}
      <View style={styles.SubMenuAdd}>
        <Text style={styles.AddData}>점수</Text>
        <View style={styles.AddDataPlace}>
          <Button
            onPress={() => setModalPVisible(!modalPVisible)}
            title={pointData.toString()}
            color="#841584"
          />
        </View>
      </View>
      <View style={styles.AddMenuLine}></View>
      {/* 이름 메뉴 */}
      <View style={styles.SubMenuAdd}>
        <Text style={styles.AddData}>이름</Text>
        <View style={styles.AddDataPlace}>
          <Button
            onPress={() => setModalNVisible(!modalNVisible)}
            title={buttonName}
            color="#841584"
          />
        </View>
      </View>
      <View style={styles.ButtonLine}></View>
      {/* 데이터 추가 버튼 */}
      <Pressable onPress={InsertHikingData}>
        <Text style={styles.AddDataButton}>데이터 추가</Text>
      </Pressable>
      <View style={styles.ButtonLine}></View>
      {/* 내용 지우기 버튼 */}
      <Pressable onPress={Clear}>
        <Text style={styles.AddDataButton}>내용 지우기</Text>
      </Pressable>
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
              // keyExtractor={(item, index) => index.toString()}
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
          <Pressable
            style={{ alignItems: "center", margin: "3%" }}
            onPress={() => setModalPVisible(!modalPVisible)}
          >
            <Text style={{ fontSize: "20%", color: "#EFF8FB" }}>선택</Text>
          </Pressable>
          <FlatList
            style={{}}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={pointList}
            keyExtractor={(item) => item}
            renderItem={({ item }) => listPointView(item)}
          />
          <Pressable
            style={{ color: "#81F7F3", alignItems: "center", margin: "3%" }}
            onPress={() => setModalPVisible(!modalPVisible)}
          >
            <Text style={{ fontSize: "20%", color: "#CEF6CE" }}>선택</Text>
          </Pressable>
        </SafeAreaView>
      </Modal>
      {/* 이름 modal */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 22,
        }}
      >
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalNVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalNVisible(!modalNVisible);
          }}
        >
          <View
            style={{
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
              flex: 0.7,
            }}
          >
            {/* 검색창 */}
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TextInput
                style={{ backgroundColor: "#CEF6D8", flex: 1, fontSize: "17%" }}
                onChangeText={setSearchValue}
                value={searchValue}
                placeholder="찾으시는 이름을 입력해 주세요."
                placeholderTextColor={"#000"}
              />
              <AntDesign
                name="close"
                size={30}
                color="black"
                onPress={() => closeModal()}
              />
            </View>
            {/* 결과창 */}
            <View style={{ flex: 1 }}>
              <FlatList
                contentContainerStyle={{ paddingHorizontal: 20 }}
                data={userDB}
                // keyExtractor={(item, index) => index.toString()}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => listItemViewUser(item)}
              />
            </View>
            <Pressable
              style={{
                backgroundColor: "#E1F5A9",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "4%",
                flex: 0.1,
              }}
              onPress={() => closeModal()}
            >
              <Text style={{ fontSize: "17%" }}>선택 완료</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  AddDataMenu: {
    flex: 1,
    width: "50%",
  },
  SubMenuAdd: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "grey",
    fontSize: 20,
  },
  AddData: {
    flex: 0.5,
    fontSize: "33%",
    textAlign: "center",
  },
  AddDataPlace: {
    flex: 1,
    fontSize: "25%",
    // fontSize: '1.2em',
    backgroundColor: "tomato",
  },
  AddDataButton: {
    fontSize: "20%",
    backgroundColor: "#23d817",
    textAlign: "center",
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
  modalContent: {
    height: "25%",
    width: "100%",
    backgroundColor: "#fff",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },

  modalView: {
    marginTop: 230,
    margin: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTextStyle: {
    color: "#17191c",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
  },
});
