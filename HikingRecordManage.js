// import {
//   StyleSheet,
//   Text,
//   View,
//   Button,
//   FlatList,
//   TextInput,
//   Pressable,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import { useState, useEffect } from "react";
// import * as SQLite from "expo-sqlite";
// // import { Feather } from '@expo/vector-icons';
// import Feather from "@expo/vector-icons/Feather";
// import { AntDesign } from "@expo/vector-icons";

// // AddDataMenu.js의 함수들
// const checkingData = (checkData) => {
//   // 만약 내용이 들어 있다면
//   if (checkData != "") {
//     return true;
//   } else return false;
// };
// // // AddDataMenu.js의 함수들

// export const CheckDataMenu1 = () => {
//   // 보여줄 메뉴를 정하는 state
//   const [subState, setSubState] = useState(false);
//   const [userInfo, setUserInfo] = useState({});

//   const subMenuOn = (item) => {
//     setSubState(true);
//     setUserInfo(item);
//   };
//   const subMenuOff = () => setSubState(false);

//   return (
//     <CheckDataMenuMain />
//   );
// };

// const CheckDataMenuMain = () => {
//   const [loadedData, setLoadedData] = useState([]);
//   const [loadData, setLoadData] = useState(false);
//   const [searchValue, setSearchValue] = useState("");

//   useEffect(() => {
//     loadingData();
//   }, [loadData]);

//   // DB에서 데이터를 불러온다.
//   async function loadingData() {
//     console.log("load data");
//     try {
//       const db = await SQLite.openDatabaseAsync("MountBedge.db");
//       const loadingData = await db.getAllAsync("SELECT * FROM HikingData");
//       setLoadedData(loadingData);
//       return loadingData;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   // 데이터를 화면에 띄우는 코드
//   const listItemViewReturn = (item) => {
//     return (
//       <View
//         key={item.id}
//         style={{
//           backgroundColor: "#EEE",
//           marginTop: "3%",
//           padding: "2%",
//           // borderRadius: 20,
//           flexDirection: "row",
//           justifyContent: "space-between",
//         }}
//       >
//         <View style={{ flexDirection: "row" }}>
//           <Text style={styles.textheader}>날짜:</Text>
//           <Text style={styles.textbottom}>{item.Date}</Text>

//           <Text style={styles.textheader}> 산:</Text>
//           <Text style={styles.textbottom}>{item.Mountain}</Text>

//           <Text style={styles.textheader}> 이름:</Text>
//           <Text style={styles.textbottom}>{item.Name}</Text>
//         </View>
//         <View style={{ flexDirection: "row", paddingRight: "1%" }}>
//           <TouchableOpacity onPress={() => setUpdateData(item)}>
//             <AntDesign name="filetext1" size={24} color="black" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => DeleteData(item)}>
//             <Feather name="delete" size={24} color="black" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };
//   // 데이터 업데이트
//   async function UpdateData(id) {
//     console.log("update data start");
//     console.log("load data", loadData);
//     const addData = [{ dayData }, { mountData }, { pointData }, { nameData }];
//     if (id == undefined) {
//       Alert.alert("수정 실패", "수정할 항목을 선택해 주세요");
//     } else {
//       for (const value of addData) {
//         inData = checkingData(Object.values(value)[0]);
//         if (inData != true) {
//           Alert.alert("내용 부족", "빈 내용이 없도록 해주세요");
//           return;
//         }
//       }
//       try {
//         const db = await SQLite.openDatabaseAsync("MountBedge.db");
//         await db.runAsync(
//           `
//           UPDATE HikingData
//           SET Date = ?,
//           Mountain = ?,
//           Point = ?,
//           Name = ?
//           WHERE id = ?`,
//           dayData,
//           mountData,
//           pointData,
//           nameData,
//           id
//         );
//         setLoadData((current) => !current);
//         Alert.alert("수정 완료");
//         setUpdateData("");
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   }

//   // 데이터 삭제
//   function DeleteData(item) {
//     console.log("dl item", item);
//     Alert.alert("", "삭제합니까?", [
//       { text: "취소" },
//       {
//         text: "삭제",
//         onPress: async () => {
//           try {
//             const db = await SQLite.openDatabaseAsync("MountBedge.db");
//             await db.runAsync(`DELETE FROM HikingData WHERE id = ${item.id}`);

//             loadingData();
//           } catch (error) {
//             console.log(error);
//           }
//         },
//       },
//     ]);
//   }

//   return (
//     <View style={{ flex: 0.7, width: "100%", marginTop: 10 }}>
//       {/* 데이터 검색 */}
//       <TextInput
//         style={styles.AddDataPlace}
//         onChangeText={setSearchValue}
//         value={searchValue}
//         placeholder="검색할 이름을 입력해 주세요."
//         placeholderTextColor={"#000000"}
//         // onSubmitEditing={loadingData}
//         onSubmitEditing={() => loadingData()}
//       />
//       {/* 불러온 리스트 */}
//       <View style={{ flex: 1, backgroundColor: "white" }}>
//         <FlatList
//           style={{ marginTop: 30 }}
//           contentContainerStyle={{ paddingHorizontal: 20 }}
//           data={loadedData}
//           // keyExtractor={(item, index) => index.toString()}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => listItemViewReturn(item)}
//         />
//       </View>
//     </View>
//   );
// };

// // export const CheckDataMenu1 = () => {
// //   const [loadedData, setLoadedData] = useState([]);
// //   const [loadData, setLoadData] = useState(false);
// //   const [dayData, setDayData] = useState("");
// //   const [mountData, setMountData] = useState("");
// //   const [pointData, setPointData] = useState("");
// //   const [nameData, setNameData] = useState("");
// //   const [updateData, setUpdateData] = useState("");
// //   const [searchValue, setSearchValue] = useState("");

// //   useEffect(() => {
// //     loadingData();
// //   }, [loadData]);

// //   // DB에서 데이터를 불러온다.
// //   async function loadingData() {
// //     console.log("load data");
// //     try {
// //       const db = await SQLite.openDatabaseAsync("MountBedge.db");
// //       const loadingData = await db.getAllAsync("SELECT * FROM HikingData");
// //       setLoadedData(loadingData);
// //       return loadingData;
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   }

// //   // 데이터 검색을 위한 코드
// //   let listItemView = (item) => {
// //     // console.log('item', item);
// //     if (searchValue == item.Name) {
// //       return listItemViewReturn(item);
// //     } else if (searchValue == "") {
// //       // 아무것도 입력하지 않았을 시 모두 보여준다.
// //       return listItemViewReturn(item);
// //     }
// //   };
// //   // 데이터를 화면에 띄우는 코드
// //   const listItemViewReturn = (item) => {
// //     return (
// //       <View
// //         key={item.id}
// //         style={{
// //           backgroundColor: "#EEE",
// //           marginTop: "3%",
// //           padding: "2%",
// //           // borderRadius: 20,
// //           flexDirection: "row",
// //           justifyContent: "space-between",
// //         }}
// //       >
// //         <View style={{ flexDirection: "row" }}>
// //           <Text style={styles.textheader}>날짜:</Text>
// //           <Text style={styles.textbottom}>{item.Date}</Text>

// //           <Text style={styles.textheader}> 산:</Text>
// //           <Text style={styles.textbottom}>{item.Mountain}</Text>

// //           <Text style={styles.textheader}> 이름:</Text>
// //           <Text style={styles.textbottom}>{item.Name}</Text>
// //         </View>
// //         <View style={{ flexDirection: "row", paddingRight: "1%" }}>
// //           <TouchableOpacity onPress={() => setUpdateData(item)}>
// //             <AntDesign name="filetext1" size={24} color="black" />
// //           </TouchableOpacity>
// //           <TouchableOpacity onPress={() => DeleteData(item)}>
// //             <Feather name="delete" size={24} color="black" />
// //           </TouchableOpacity>
// //         </View>
// //       </View>
// //     );
// //   };
// //   // 데이터 업데이트
// //   async function UpdateData(id) {
// //     console.log("update data start");
// //     console.log("load data", loadData);
// //     const addData = [{ dayData }, { mountData }, { pointData }, { nameData }];
// //     if (id == undefined) {
// //       Alert.alert("수정 실패", "수정할 항목을 선택해 주세요");
// //     } else {
// //       for (const value of addData) {
// //         inData = checkingData(Object.values(value)[0]);
// //         if (inData != true) {
// //           Alert.alert("내용 부족", "빈 내용이 없도록 해주세요");
// //           return;
// //         }
// //       }
// //       try {
// //         const db = await SQLite.openDatabaseAsync("MountBedge.db");
// //         await db.runAsync(
// //           `
// //           UPDATE HikingData
// //           SET Date = ?,
// //           Mountain = ?,
// //           Point = ?,
// //           Name = ?
// //           WHERE id = ?`,
// //           dayData,
// //           mountData,
// //           pointData,
// //           nameData,
// //           id
// //         );
// //         setLoadData((current) => !current);
// //         Alert.alert("수정 완료");
// //         setUpdateData("");
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     }
// //   }

// //   // 데이터 삭제
// //   function DeleteData(item) {
// //     console.log("dl item", item);
// //     Alert.alert("", "삭제합니까?", [
// //       { text: "취소" },
// //       {
// //         text: "삭제",
// //         onPress: async () => {
// //           try {
// //             const db = await SQLite.openDatabaseAsync("MountBedge.db");
// //             await db.runAsync(`DELETE FROM HikingData WHERE id = ${item.id}`);

// //             loadingData();
// //           } catch (error) {
// //             console.log(error);
// //           }
// //         },
// //       },
// //     ]);
// //   }

// //   return (
// //     <View style={{ flex: 0.7, width: "100%", marginTop: 10 }}>
// //       {/* 데이터 검색 */}
// //       <TextInput
// //         style={styles.AddDataPlace}
// //         onChangeText={setSearchValue}
// //         value={searchValue}
// //         placeholder="검색할 이름을 입력해 주세요."
// //         placeholderTextColor={"#000000"}
// //         // onSubmitEditing={loadingData}
// //         onSubmitEditing={() => loadingData()}
// //       />
// //       {/* 불러온 리스트 */}
// //       <View style={{ flex: 1, backgroundColor: "white" }}>
// //         <FlatList
// //           style={{ marginTop: 30 }}
// //           contentContainerStyle={{ paddingHorizontal: 20 }}
// //           data={loadedData}
// //           // keyExtractor={(item, index) => index.toString()}
// //           keyExtractor={(item) => item.id}
// //           renderItem={({ item }) => listItemView(item)}
// //         />
// //       </View>
// //     </View>
// //   );
// // };

// const styles = StyleSheet.create({
//   SubMenuAdd: {
//     flexDirection: "row",
//     backgroundColor: "grey",
//   },
//   AddDataPlace: {
//     height: "7%",
//     backgroundColor: "#CEF6F5",
//   },
//   AddDataPlace2: {
//     height: "100%",
//     width: "10%",
//     backgroundColor: "#CEF6F5",
//   },
//   AddDataButton: {
//     fontSize: 20,
//     backgroundColor: "#23d817",
//   },
//   CheckDataButton: {
//     fontSize: 20,
//     backgroundColor: "#23d817",
//   },
//   textheader: {
//     color: "#111",
//     fontSize: 14,
//     fontWeight: "700",
//   },
//   textbottom: {
//     color: "#111",
//     fontSize: 14,
//   },
// });

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
import Feather from "@expo/vector-icons/Feather";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

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

const HikingRecordMain = ({ subMenuOn }) => {
  const [loadedData, setLoadedData] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    loadingData();
  }, [loadData]);

  // 산행 검색
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
    console.log("item", item);

    if (item.Name.includes(searchValue) == true || searchValue == "") {
      return (
        <View
          key={item.id}
          style={{
            backgroundColor: "#EEE",
            marginTop: "3%",
            padding: "2%",
            // borderRadius: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textheader}>날짜:</Text>
            <Text style={styles.textbottom}>{item.Date}</Text>

            <Text style={styles.textheader}> 산:</Text>
            <Text style={styles.textbottom}>{item.Mount}</Text>

            <Text style={styles.textheader}> 이름:</Text>
            <Text style={styles.textbottom}>{item.Name}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: "2%",
            }}
          >
            <TouchableOpacity
              style={{ marginRight: "2%" }}
              onPress={() => subMenuOn(item)}
            >
              <AntDesign name="filetext1" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => DeleteData(item)}>
              <Feather name="delete" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };
  // 산행 정보 삭제
  function DeleteData(item) {
    console.log("dl item", item);
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
  // console.log('loadedData', loadedData);
  return (
    <View style={{ flex: 1, width: "100%", marginTop: 10 }}>
      {/* 데이터 검색 */}
      <TextInput
        style={styles.AddDataPlace}
        onChangeText={setSearchValue}
        value={searchValue}
        placeholder="검색할 이름을 입력해 주세요."
        placeholderTextColor={"#000000"}
        // onSubmitEditing={loadingData}
        onSubmitEditing={() => loadingData()}
      />
      {/* 불러온 리스트 */}
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <FlatList
          style={{ marginTop: 30 }}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={loadedData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => listItemViewReturn(item)}
        />
      </View>
    </View>
  );
};

const HikingRecordSub = ({ subMenuOff, hikingInfo, mountDB, userDB }) => {
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
    console.log("sub user info1", hikingInfo);
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
    const Month = (data.getMonth()+1 < 10 ? '0' + (data.getMonth()+1) : (data.getMonth()+1));
    const Day = (data.getDate() < 10 ? '0' + data.getDate() : data.getDate());
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
      subMenuOff();
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
          {/* <TextInput style={{}} onChangeText={setNameData} value={nameData} />
          <Button
            onPress={() => setModalNVisible(!modalNVisible)}
            title={nameData}
            color="#841584"
          /> */}
        </View>
      </View>
      {/* 버튼 메뉴 */}
      {/* Todo 눌렀을때 정말 돌아갈건지 물어보기. */}
      <Text style={styles.AddDataButton} onPress={() => {subMenuOff();}}>
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

// export const CheckDataMenu1 = () => {
//   const [loadedData, setLoadedData] = useState([]);
//   const [loadData, setLoadData] = useState(false);
//   const [dayData, setDayData] = useState("");
//   const [mountData, setMountData] = useState("");
//   const [pointData, setPointData] = useState("");
//   const [nameData, setNameData] = useState("");
//   const [updateData, setUpdateData] = useState("");
//   const [searchValue, setSearchValue] = useState("");

//   useEffect(() => {
//     loadingData();
//   }, [loadData]);

//   // DB에서 데이터를 불러온다.
//   async function loadingData() {
//     console.log("load data");
//     try {
//       const db = await SQLite.openDatabaseAsync("MountBedge.db");
//       const loadingData = await db.getAllAsync("SELECT * FROM HikingData");
//       setLoadedData(loadingData);
//       return loadingData;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   // 데이터 검색을 위한 코드
//   let listItemView = (item) => {
//     // console.log('item', item);
//     if (searchValue == item.Name) {
//       return listItemViewReturn(item);
//     } else if (searchValue == "") {
//       // 아무것도 입력하지 않았을 시 모두 보여준다.
//       return listItemViewReturn(item);
//     }
//   };
//   // 데이터를 화면에 띄우는 코드
//   const listItemViewReturn = (item) => {
//     return (
//       <View
//         key={item.id}
//         style={{
//           backgroundColor: "#EEE",
//           marginTop: "3%",
//           padding: "2%",
//           // borderRadius: 20,
//           flexDirection: "row",
//           justifyContent: "space-between",
//         }}
//       >
//         <View style={{ flexDirection: "row" }}>
//           <Text style={styles.textheader}>날짜:</Text>
//           <Text style={styles.textbottom}>{item.Date}</Text>

//           <Text style={styles.textheader}> 산:</Text>
//           <Text style={styles.textbottom}>{item.Mountain}</Text>

//           <Text style={styles.textheader}> 이름:</Text>
//           <Text style={styles.textbottom}>{item.Name}</Text>
//         </View>
//         <View style={{ flexDirection: "row", paddingRight: "1%" }}>
//           <TouchableOpacity onPress={() => setUpdateData(item)}>
//             <AntDesign name="filetext1" size={24} color="black" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => DeleteData(item)}>
//             <Feather name="delete" size={24} color="black" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };
//   // 데이터 업데이트
//   async function UpdateData(id) {
//     console.log("update data start");
//     console.log("load data", loadData);
//     const addData = [{ dayData }, { mountData }, { pointData }, { nameData }];
//     if (id == undefined) {
//       Alert.alert("수정 실패", "수정할 항목을 선택해 주세요");
//     } else {
//       for (const value of addData) {
//         inData = checkingData(Object.values(value)[0]);
//         if (inData != true) {
//           Alert.alert("내용 부족", "빈 내용이 없도록 해주세요");
//           return;
//         }
//       }
//       try {
//         const db = await SQLite.openDatabaseAsync("MountBedge.db");
//         await db.runAsync(
//           `
//           UPDATE HikingData
//           SET Date = ?,
//           Mountain = ?,
//           Point = ?,
//           Name = ?
//           WHERE id = ?`,
//           dayData,
//           mountData,
//           pointData,
//           nameData,
//           id
//         );
//         setLoadData((current) => !current);
//         Alert.alert("수정 완료");
//         setUpdateData("");
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   }

//   // 데이터 삭제
//   function DeleteData(item) {
//     console.log("dl item", item);
//     Alert.alert("", "삭제합니까?", [
//       { text: "취소" },
//       {
//         text: "삭제",
//         onPress: async () => {
//           try {
//             const db = await SQLite.openDatabaseAsync("MountBedge.db");
//             await db.runAsync(`DELETE FROM HikingData WHERE id = ${item.id}`);

//             loadingData();
//           } catch (error) {
//             console.log(error);
//           }
//         },
//       },
//     ]);
//   }

//   return (
//     <View style={{ flex: 0.7, width: "100%", marginTop: 10 }}>
//       {/* 데이터 검색 */}
//       <TextInput
//         style={styles.AddDataPlace}
//         onChangeText={setSearchValue}
//         value={searchValue}
//         placeholder="검색할 이름을 입력해 주세요."
//         placeholderTextColor={"#000000"}
//         // onSubmitEditing={loadingData}
//         onSubmitEditing={() => loadingData()}
//       />
//       {/* 불러온 리스트 */}
//       <View style={{ flex: 1, backgroundColor: "white" }}>
//         <FlatList
//           style={{ marginTop: 30 }}
//           contentContainerStyle={{ paddingHorizontal: 20 }}
//           data={loadedData}
//           // keyExtractor={(item, index) => index.toString()}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => listItemView(item)}
//         />
//       </View>
//     </View>
//   );
// };

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
