// 1번째 코드
// import { StatusBar } from "expo-status-bar";
// import {
//   Pressable,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useEffect, useState } from "react";
// // import AsyncStorage from '@react-native-async-storage/async-storage';

// const onChangeText = (payload) => setDayData(payload);

// export default function App() {
//   const [screen, setScreen] = useState("1");
//   const [dataForAdd, setDataForAdd] = useState();
//   const [dayData, setDayData] = useState("");

//   const AddData = () => console.log([{dayData}, {mountData}, {pointData}, {nameData}]);
//   function InputDayData() {
//     return (
//     <View style={styles.SubMenuAdd}>
//       <Text>날짜</Text>
//       <TextInput
//         style={styles.AddDataPlace}
//         onChangeText={setDayData}
//         value={dayData}
//       />
//     </View>
//     );
//   }
//   function InputMountData() {
//     const [mountData, setMountData] = useState("");
//     return (
//       <View style={styles.SubMenuAdd}>
//       <Text>산</Text>
//       <TextInput
//         style={styles.AddDataPlace}
//         onChangeText={setMountData}
//         value={mountData}
//       />
//     </View>
//     );
//   }
//   function InputPointData() {
//     const [pointData, setPointData] = useState("");
//     return (
//       <View style={styles.SubMenuAdd}>
//       <Text>점수</Text>
//       <TextInput
//         style={styles.AddDataPlace}
//         onChangeText={setPointData}
//         value={pointData}
//       />
//     </View>
//     );
//   }
//   function InputNameData() {
//     const [nameData, setNameData] = useState("");
//     return (
//       <View style={styles.SubMenuAdd}>
//       <Text>이름</Text>
//       <TextInput
//         style={styles.AddDataPlace}
//         onChangeText={setNameData}
//         value={nameData}
//       />
//     </View>
//     );
//   }
//   const AddDataMenu = () => {
//     return (
//       <View>
//         <InputDayData />
//         <InputMountData />
//         <InputPointData />
//         <InputNameData />
//         <Pressable onPress={AddData}>
//           <Text style={styles.AddDataButton}>데이터 추가</Text>
//         </Pressable>
//       </View>
//     );
//   };
//   const CheckDataMenu1 = () => {
//     return (
//       <View>
//         <View style={styles.SubMenuAdd}>
//           <Text>이름</Text>
//           <TextInput style={styles.AddDataPlace} />
//           <Pressable>
//             <Text>선택</Text>
//           </Pressable>
//         </View>
//         <Pressable>
//           <Text style={styles.CheckDataButton}>조회</Text>
//         </Pressable>
//       </View>
//     );
//   };
//   const CheckDataMenu2 = () => {
//     return (
//       <View>
//         <View style={styles.SubMenuAdd}>
//           <Text>월</Text>
//           <TextInput style={styles.AddDataPlace} />
//           <Pressable>
//             <Text>선택</Text>
//           </Pressable>
//         </View>
//         <Pressable>
//           <Text style={styles.CheckDataButton}>조회</Text>
//         </Pressable>
//       </View>
//     );
//   };
//   return (
//     <View style={styles.container}>
//       <StatusBar style="auto" />
//       <View style={styles.MainMenu}>
//         <Pressable onPress={() => setScreen("1")}>
//           <Text style={styles.MainMenuButton}>데이터 추가</Text>
//         </Pressable>
//         <Pressable onPress={() => setScreen("2")}>
//           <Text style={styles.MainMenuButton}>데이터 조회 1</Text>
//         </Pressable>
//         <Pressable onPress={() => setScreen("3")}>
//           <Text style={styles.MainMenuButton}>데이터 조회 2</Text>
//         </Pressable>
//       </View>
//       {screen === "1" && <AddDataMenu />}
//       {screen === "2" && <CheckDataMenu1 />}
//       {screen === "3" && <CheckDataMenu2 />}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   MainMenu: {
//     flexDirection: "row",
//     backgroundColor: "tomato",
//     marginHorizontal: 10,
//     marginVertical: 10,
//   },
//   MainMenuButton: {
//     fontSize: 20,
//     marginHorizontal: 10,
//     marginVertical: 10,
//   },
//   SubMenuAdd: {
//     flexDirection: "row",
//     backgroundColor: "grey",
//   },
//   AddDataPlace: {
//     height: 20,
//     width: 40,
//     backgroundColor: "tomato",
//   },
//   AddDataButton: {
//     fontSize: 20,
//     backgroundColor: "#23d817",
//   },
//   CheckDataButton: {
//     fontSize: 20,
//     backgroundColor: "#23d817",
//   },
// });

// import { StatusBar } from "expo-status-bar";
// import {
//   Pressable,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useEffect, useState } from "react";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const STORAGE_KEY = "@MainData"

// export default function App() {
//   const [screen, setScreen] = useState("1");
//   const [dataForAdd, setDataForAdd] = useState();
//   const [mainData, setMainData] = useState();

//   const saveData = async(MainData) => {
//     console.log("save data");
//     console.log(MainData);
//     await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(MainData));
//   };
//   const loadData = async() => {
//     console.log("load data");
//     const s = await AsyncStorage.getItem(STORAGE_KEY);
//     setMainData(JSON.parse(s));
//   };
//   useEffect(() => {loadData()}, []);
//   console.log(mainData);
//   console.log("Date.now()");
//   console.log(Date.now());
//   const DataBox = (Date.now());

//   const AddDataMenu = () => {
//     const [dayData, setDayData] = useState("");
//     const [mountData, setMountData] = useState("");
//     const [pointData, setPointData] = useState("");
//     const [nameData, setNameData] = useState("");

//     const AddData = () => {
//       const MainData = ([{ dayData }, { mountData }, { pointData }, { nameData }]);
//       saveData(MainData);
//     }

//     return (
//       <View>
//         <View style={styles.SubMenuAdd}>
//           <Text>날짜</Text>
//           <TextInput
//             style={styles.AddDataPlace}
//             onChangeText={setDayData}
//             value={dayData}
//           />
//         </View>
//         <View style={styles.SubMenuAdd}>
//           <Text>산</Text>
//           <TextInput
//             style={styles.AddDataPlace}
//             onChangeText={setMountData}
//             value={mountData}
//           />
//         </View>
//         <View style={styles.SubMenuAdd}>
//           <Text>점수</Text>
//           <TextInput
//             style={styles.AddDataPlace}
//             onChangeText={setPointData}
//             value={pointData}
//           />
//         </View>
//         <View style={styles.SubMenuAdd}>
//           <Text>이름</Text>
//           <TextInput
//             style={styles.AddDataPlace}
//             onChangeText={setNameData}
//             value={nameData}
//           />
//         </View>
//         <Pressable onPress={AddData}>
//           <Text style={styles.AddDataButton}>데이터 추가</Text>
//         </Pressable>
//       </View>
//     );
//   };
//   const CheckDataMenu1 = ({MainData1, tempdata}) => {
//     console.log("checkdatamenu1 start");
//     console.log(MainData1);
//     console.log("checkdatamenu1 end");

//     return (
//       <View>
//         <View style={styles.SubMenuAdd}>
//           <Text>이름</Text>
//           <TextInput style={styles.AddDataPlace} />
//           <Pressable>
//             <Text>선택</Text>
//           </Pressable>
//         </View>
//         <Pressable>
//           <Text onPress={() => console.log("Main data is ", MainData1)} style={styles.CheckDataButton}>조회</Text>
//         </Pressable>
//         <View>
//           {Object.keys(MainData1).map(key =>
//             <View>
//               <Text>{MainData1[key].dayData}</Text>
//             </View>
//           )}
//           <Text>{tempdata}</Text>
//         </View>
//       </View>
//     );
//   };
//   const CheckDataMenu2 = (mainData) => {
//     // console.log(mainData);

//     return (
//       <View>
//         <View style={styles.SubMenuAdd}>
//           <Text>월</Text>
//           <TextInput style={styles.AddDataPlace} />
//           <Pressable>
//             <Text>선택</Text>
//           </Pressable>
//         </View>
//         <Pressable>
//           <Text style={styles.CheckDataButton}>조회</Text>
//         </Pressable>
//       </View>
//     );
//   };
//   return (
//     <View style={styles.container}>
//       <StatusBar style="auto" />
//       <View style={styles.MainMenu}>
//         <Pressable onPress={() => setScreen("1")}>
//           <Text style={styles.MainMenuButton}>데이터 추가</Text>
//         </Pressable>
//         <Pressable onPress={() => setScreen("2")}>
//           <Text style={styles.MainMenuButton}>데이터 조회 1</Text>
//         </Pressable>
//         <Pressable onPress={() => setScreen("3")}>
//           <Text style={styles.MainMenuButton}>데이터 조회 2</Text>
//         </Pressable>
//       </View>
//       {screen === "1" && <AddDataMenu />}
//       {screen === "2" && <CheckDataMenu1 MainData1={mainData} tempdata="temp!" />}
//       {screen === "3" && <CheckDataMenu2 MainData={mainData} />}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   MainMenu: {
//     flexDirection: "row",
//     backgroundColor: "tomato",
//     marginHorizontal: 10,
//     marginVertical: 10,
//   },
//   MainMenuButton: {
//     fontSize: 20,
//     marginHorizontal: 10,
//     marginVertical: 10,
//   },
//   SubMenuAdd: {
//     flexDirection: "row",
//     backgroundColor: "grey",
//   },
//   AddDataPlace: {
//     height: 20,
//     width: 40,
//     backgroundColor: "tomato",
//   },
//   AddDataButton: {
//     fontSize: 20,
//     backgroundColor: "#23d817",
//   },
//   CheckDataButton: {
//     fontSize: 20,
//     backgroundColor: "#23d817",
//   },
// });

// 2번째 코드
// import { StatusBar } from "expo-status-bar";
// import {
//   Alert,
//   Pressable,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Button,
//   FlatList,
// } from "react-native";
// import { useEffect, useState } from "react";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as SQLite from 'expo-sqlite';
// import { all } from "list";

// const STORAGE_KEY = "@MainData"

// // 아마 실패한 코드
// async function getDatabase() {
//   const db = await SQLite.openDatabaseAsync('MountBedge.db');
//   // {"databaseName": "MountBedge.db", "nativeDatabase": {}, "options": {}}
//   try {
//     const allRows = await db.getAllAsync('SELECT * FROM test');
//     for (const row of allRows) {
//       console.log(row.id, row.value, row.intValue);
//     }
//   }
//   catch (error) {
//     console.log(error);
//   }
// }

// export default function App() {
//   const [screen, setScreen] = useState("2");
//   const [dataForAdd, setDataForAdd] = useState();
//   const [mainData, setMainData] = useState();

//   const saveData = async(MainData) => {
//     // 받은 값을 db에 저장한다.
//     const db = await SQLite.openDatabaseAsync('MountBedge.db');
//     console.log("save data");

//     try {
//       await db.execAsync(`
//         CREATE TABLE IF NOT EXISTS MountPoint (
//           id       INTEGER PRIMARY KEY,
//           Date     TEXT    NOT NULL,
//           Mountain TEXT    NOT NULL,
//           Point    INTEGER NOT NULL,
//           Name     TEXT    NOT NULL);
//         INSERT INTO MountPoint (Date, Mountain, Point, Name) VALUES (
//           '${MainData[0].dayData}',
//           '${MainData[1].mountData}',
//           '${MainData[2].pointData}',
//           '${MainData[3].nameData}');`
//       );
//       console.log('Database connection is working');
//     } catch (error) {
//       console.error('Error testing database connection:', error);
//     }
//   };
//   const checkingData = (checkData) => {
//     // 만약 내용이 들어 있다면
//     if (checkData != "") {
//       return true
//     } else return false
//   };
//   // 데이터 저장
//   const AddDataMenu = () => {
//     const [dayData, setDayData] = useState("");
//     const [mountData, setMountData] = useState("");
//     const [pointData, setPointData] = useState("");
//     const [nameData, setNameData] = useState("");

//     const AddData = () => {
//       // 필수 내용을 채웠는지 확인 후 saveData로 값을 넘긴다.
//       const addData = [{ dayData }, { mountData }, { pointData }, { nameData }];
//       for (const value of addData) {
//         inData = checkingData(Object.values(value)[0]);
//         if (inData != true) {
//           Alert.alert("내용 부족", "빈 내용이 없도록 해주세요");
//           return
//         }
//       }
//       saveData(addData);
//     }
//     return (
//       <View>
//         <View style={styles.SubMenuAdd}>
//           <Text>날짜</Text>
//           <TextInput
//             style={styles.AddDataPlace}
//             onChangeText={setDayData}
//             value={dayData}
//           />
//         </View>
//         <View style={styles.SubMenuAdd}>
//           <Text>산</Text>
//           <TextInput
//             style={styles.AddDataPlace}
//             onChangeText={setMountData}
//             value={mountData}
//           />
//         </View>
//         <View style={styles.SubMenuAdd}>
//           <Text>점수</Text>
//           <TextInput
//             style={styles.AddDataPlace}
//             onChangeText={setPointData}
//             value={pointData}
//           />
//         </View>
//         <View style={styles.SubMenuAdd}>
//           <Text>이름</Text>
//           <TextInput
//             style={styles.AddDataPlace}
//             onChangeText={setNameData}
//             value={nameData}
//           />
//         </View>
//         <Pressable onPress={AddData}>
//           <Text style={styles.AddDataButton}>데이터 추가</Text>
//         </Pressable>
//       </View>
//     );
//   };
//   const CheckDataMenu1 = () => {
//     // // 이전 코드
//       // let loadData = [];
//       // const [loadedData, setLoadedData] = useState();

//       // const loadingData = async() => {
//       //   const db = await SQLite.openDatabaseAsync('MountBedge.db');
//       //   console.log("1");
//       //   // const s = db.getAllAsync('SELECT * FROM MountPoint');
//       //   // setLoadedData(s);
//       //   // console.log(loadData);
//       //   // (async () => {
//       //   //   await setLoadedData(s);
//       //   //   console.log("2");
//       //   //   await console.log(loadData);
//       //   // })();

//       //   try {
//       //     const s = await db.getAllAsync('SELECT * FROM MountPoint');
//       //     setLoadedData(s);
//       //     console.log("2");
//       //     console.log(loadedData);
//       //   }
//       //   catch (error) {
//       //     console.log(error);
//       //     return
//       //   }
//       //   console.log("3");
//       //   for (const row of loadedData) {
//       //     console.log(row.Date, row.Mountain, row.Name, row.Point);
//       //   }
//       //   console.log("4");
//       // };
//       // setTimeout(loadingData,2000);
//       // // useEffect(() => {loadingData()}, []);

//     const [loadData, setLoadData] = useState([]);

//     const loadingData = async() => {
//       const db = await SQLite.openDatabaseAsync('MountBedge.db');
//       await setLoadData(db.getAllAsync('SELECT * FROM MountPoint'));
//       await console.log('loadData', loadData);
//     }
//     // useEffect(() => {loadingData()}, []);

//     // 불러오기 성공한 코드
//     async function tempDB() {
//       try{
//         const db = await SQLite.openDatabaseAsync('MountBedge.db');

//         // const firstRow = await db.getFirstAsync('SELECT * FROM test');
//         const firstRow = await db.getAllAsync('SELECT * FROM MountPoint');
//         console.log('firstRow', firstRow);
//         setLoadData(firstRow);
//         // console.log(firstRow.id, firstRow.value, firstRow.intValue);

//         return firstRow;
//       } catch(error) {
//         console.log(error);
//       }
//     }
//     // 데이터를 화면에 띄우는 코드
//     let listItemView = (item) => {
//       return (
//         <View
//           key={item.id}
//           style={{
//             backgroundColor: "#EEE",
//             marginTop: 20,
//             padding: 30,
//             borderRadius: 10,
//           }}
//         >
//           <Text style={styles.textheader}>아이디</Text>
//           <Text style={styles.textbottom}>{item.Date}</Text>

//           <Text style={styles.textheader}>숫자</Text>
//           <Text style={styles.textbottom}>{item.Mountain}</Text>

//           <Text style={styles.textheader}>값</Text>
//           <Text style={styles.textbottom}>{item.Name}</Text>
//         </View>
//       );
//     };

//     return (
//       <View style={{ flex: 0.5, width: "80%", marginTop: 10 }}>
//         <Button title="List" onPress={() => tempDB()} />
//         <View style={{ flex: 1, backgroundColor: "white" }}>
//           <View style={{ flex: 1 }}>
//             <FlatList
//               style={{ marginTop: 30 }}
//               contentContainerStyle={{ paddingHorizontal: 20 }}
//               data={loadData}
//               keyExtractor={(item, index) => index.toString()}
//               renderItem={({ item }) => listItemView(item)}
//             />
//           </View>
//         </View>
//       </View>
//     );

//     // return (
//     //   <View>
//     //     <View style={styles.SubMenuAdd}>
//     //       <Text>이름</Text>
//     //       <TextInput style={styles.AddDataPlace} />
//     //       <Pressable>
//     //         <Text>선택</Text>
//     //       </Pressable>
//     //     </View>
//     //     <Pressable>
//     //       {/* <Text onPress={() => console.log("Main data is ", MainData1)} style={styles.CheckDataButton}>조회</Text> */}
//     //       {/* <Text onPress={loadingData} style={styles.CheckDataButton}>조회</Text>

//     //       <Text>불러온 데이터 1줄</Text> */}
//     //     </Pressable>
//     //     <View>
//     //       <Text>조회된 내용 출력</Text>
//     //     </View>
//     //   </View>
//     // );
//   };
//   const CheckDataMenu2 = (mainData) => {
//     // console.log(mainData);

//     return (
//       <View>
//         <View style={styles.SubMenuAdd}>
//           <Text>월</Text>
//           <TextInput style={styles.AddDataPlace} />
//           <Pressable>
//             <Text>선택</Text>
//           </Pressable>
//         </View>
//         <Pressable>
//           <Text style={styles.CheckDataButton}>조회</Text>
//         </Pressable>
//       </View>
//     );
//   };
//   return (
//     <View style={styles.container}>
//       <StatusBar style="auto" />
//       <View style={styles.MainMenu}>
//         <Pressable onPress={() => setScreen("1")}>
//           <Text style={styles.MainMenuButton}>데이터 추가</Text>
//         </Pressable>
//         <Pressable onPress={() => setScreen("2")}>
//           <Text style={styles.MainMenuButton}>데이터 조회 1</Text>
//         </Pressable>
//         <Pressable onPress={() => setScreen("3")}>
//           <Text style={styles.MainMenuButton}>데이터 조회 2</Text>
//         </Pressable>
//       </View>
//       {screen === "1" && <AddDataMenu />}
//       {screen === "2" && <CheckDataMenu1 />}
//       {screen === "3" && <CheckDataMenu2 MainData={mainData} />}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   MainMenu: {
//     flexDirection: "row",
//     backgroundColor: "tomato",
//     marginHorizontal: 10,
//     marginVertical: 10,
//   },
//   MainMenuButton: {
//     fontSize: 20,
//     marginHorizontal: 10,
//     marginVertical: 10,
//   },
//   SubMenuAdd: {
//     flexDirection: "row",
//     backgroundColor: "grey",
//   },
//   AddDataPlace: {
//     height: 20,
//     width: 40,
//     backgroundColor: "tomato",
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
//     fontSize: 12,
//     fontWeight: "700",
//   },
//   textbottom: {
//     color: "#111",
//     fontSize: 18,
//   },
// });

// 현재 코드
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";

import { AddHikingData } from "./AddHikingData.js";
import { HikingRecordManage } from "./HikingRecordManage.js";
import { CheckDataMenu2 } from "./CheckDataMenu2.js";
import { UserInfoManage } from "./UserInfoManage";
import { MountInfoManage } from "./MountInfoManage.js";
import { CreateTable } from "./CreateTable";


export default function App() {
  const [screen, setScreen] = useState("3");

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
      {screen === "3" && <CheckDataMenu2 />}
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
