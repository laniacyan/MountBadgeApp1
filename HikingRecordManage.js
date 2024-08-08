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
import { useState, useEffect, useRef } from "react";
import * as SQLite from "expo-sqlite";
// import { Feather } from '@expo/vector-icons';
import { NameSearch } from "./components/HikingRecordManage/NameSearch";
import { DaySearch } from "./components/HikingRecordManage/DaySearch";
import { HikingRecord } from "./components/HikingRecordManage/HikingRecord";

// export const HikingRecordManage = () => {
//   // 보여줄 메뉴를 정하는 state
//   const [mainMenu, setMainMenu] = useState("NameSearch");
//   // const [hikingInfo, setHikingInfo] = useState({});
//   const [mountDB, setMountDB] = useState([]);
//   const [userDB, setUserDB] = useState([]);
//   const [userName, setUserName] = useState("");

//   const setMenu = (item, name = "") => {
//     setMainMenu(item);
//     setUserName(name);
//     // setHikingInfo(item);
//   };
//   // const subMenuOff = (item) => setMainMenu(item);
//   // DB에서 데이터를 불러온다.
//   useEffect(() => {
//     loadingData("MountInfo");
//     loadingData("UserInfo");
//   }, []);

//   async function loadingData(Info) {
//     console.log("load data");
//     try {
//       const db = await SQLite.openDatabaseAsync("MountBedge.db");
//       const data = await db.getAllAsync(`SELECT * FROM ${Info}`);
//       if (Info === "MountInfo") {
//         setMountDB(data);
//       } else if (Info === "UserInfo") {
//         setUserDB(data);
//       }
//       return;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   // const TestMenu = () => {
//   //   const [testNum, setTestNum] = useState(0);
//   //   const [testStatus, setTestStatus] = useState("test4");

//   //   const Testcalcu = (item = 0) => {
//   //     setTestNum(item);
//   //     console.log("2번 넘었다!");
//   //     console.log("testNum", testNum);
//   //   };
//   //   console.log("testNum", testNum);

//   //   const StateChange = (item) => {
//   //     setTestStatus(item);
//   //   };

//   //   const TestMenu2 = ({ Testcalcu }) => {
//   //     console.log("test2");
//   //     const TestMenu3 = ({ Testcalcu }) => {
//   //       console.log("test3");
//   //       return (
//   //         <View>
//   //           <Pressable onPress={() => Testcalcu(3)}>
//   //             <Text style={{ fontSize: "20%" }}>테스트 3</Text>
//   //           </Pressable>
//   //         </View>
//   //       );
//   //     };
//   //     return (
//   //       <View>
//   //         <Text>테스트 2</Text>
//   //         <TestMenu3 Testcalcu={Testcalcu} />
//   //       </View>
//   //     );
//   //   };
//   //   const TestMenu4 = ({ StateChange }) => {
//   //     console.log("test4");
//   //     const TestMenu6 = ({ StateChange }) => {
//   //       console.log("test6");
//   //       return (
//   //         <View>
//   //           <Pressable onPress={() => StateChange("test5")}>
//   //             <Text style={{ fontSize: "20%" }}>테스트 6</Text>
//   //             <Text style={{ fontSize: "20%" }}>5로 돌아간다</Text>
//   //           </Pressable>
//   //         </View>
//   //       );
//   //     };
//   //     const TestMenu7 = ({ StateChange }) => {
//   //       console.log("test7");
//   //       return (
//   //         <View>
//   //           <Pressable onPress={() => StateChange("test5")}>
//   //             <Text style={{ fontSize: "20%" }}>테스트 7</Text>
//   //             <Text style={{ fontSize: "20%" }}>5로 넘어간다</Text>
//   //           </Pressable>
//   //         </View>
//   //       );
//   //     };
//   //     return (
//   //       <View>
//   //         <Pressable onPress={() => StateChange("test5")}>
//   //           <Text style={{ fontSize: "20%" }}>테스트 4</Text>
//   //           <Text style={{ fontSize: "20%" }}>5으로 넘어간다.</Text>
//   //           {console.log("testStatus", testStatus)}
//   //         </Pressable>
//   //         <Pressable onPress={() => StateChange("test5")}>
//   //           <Text style={{ fontSize: "20%" }}>테스트 4</Text>
//   //           <Text style={{ fontSize: "20%" }}>5로 넘어간다.</Text>
//   //         </Pressable>
//   //         {testStatus == "test4" && <TestMenu6 StateChange={StateChange} />}
//   //         {testStatus == "test7" && <TestMenu7 StateChange={StateChange} />}
//   //       </View>
//   //     );
//   //   };
//   //   const TestMenu5 = ({ StateChange }) => {
//   //     console.log("test5");
//   //     return (
//   //       <View>
//   //         <Pressable onPress={() => StateChange("test4")}>
//   //           <Text style={{ fontSize: "20%" }}>테스트 5</Text>
//   //           <Text style={{ fontSize: "20%" }}>누르면 4로 넘어간다</Text>
//   //         </Pressable>
//   //       </View>
//   //     );
//   //   };
//   //   return (
//   //     <View>
//   //       <Text>테스트 1</Text>
//   //       <TestMenu2 Testcalcu={Testcalcu} />
//   //       {(testStatus == "test4" || testStatus == "test6") && (
//   //         <TestMenu4 StateChange={StateChange} />
//   //       )}
//   //       {testStatus == "test5" && <TestMenu5 StateChange={StateChange} />}
//   //     </View>
//   //   );
//   // };

//   return (
//     <View style={{ flex: 1, width: "100%" }}>
//       <View style={{flexDirection:'row', justifyContent:'space-between', marginLeft:'5%', marginRight:'5%'}}>
//         <Pressable style={{backgroundColor:'#81BEF7', padding:'2%'}} onPress={() => {setMenu("NameSearch")}}>
//           <Text style={{fontSize:'20%'}}>이름으로 조회하기</Text>
//         </Pressable>
//         <Pressable style={{backgroundColor:'#81BE11', padding:'2%'}} onPress={() => {setMenu('DaySearch')}}>
//           <Text style={{fontSize:'20%'}}>날짜로 조회하기</Text>
//         </Pressable>
//       </View>
//         <Text style={{width:'100%'}}></Text>
//       {/* <TestMenu /> */}
//       {mainMenu == "NameSearch" && <NameSearch userDB={userDB} setMenu={setMenu} />}
//       {mainMenu == "DaySearch" && <DaySearch />}
//       {mainMenu == "Record" && (
//         <HikingRecord
//           mountDB={mountDB}
//           mainMenu={mainMenu}
//           setMenu={setMenu}
//           userName={userName}
//         />
//       )}
//     </View>
//   );
// };

// export const HikingRecordManage = () => {
//   const [data, setData] = useState(0);

//   function plusHandler() {
//     setData(data + 1);
//     console.log("clicked!", data);
//   }

//   function minusHandler() {
//     setData(data - 1);
//     console.log("clicked!", data);
//   }

//   return (
//     <View>
//       <Text>{data}</Text>
//       <View style={{justifyContent:'space-between', flexDirection:'row'}}>
//         <Pressable onPress={() => plusHandler()}>
//           <Text style={{ fontSize: "20%" }}>+1해주기</Text>
//         </Pressable>
//         <Pressable onPress={() => minusHandler()}>
//           <Text style={{ fontSize: "20%" }}>-해주기</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// };

// export const HikingRecordManage = () => {
//   const data = useRef(0);

//   function plusHandler() {
//     // setData(data + 1);
//     data.current = data.current + 1;
//     console.log("clicked!", data.current);
//   }

//   function minusHandler() {
//     // setData(data - 1);
//     data.current = data.current - 1;
//     console.log("clicked!", data.current);
//   }

//   return (
//     <View>
//       <Text>{data.current}</Text>
//       <View style={{justifyContent:'space-between', flexDirection:'row'}}>
//         <Pressable onPress={() => plusHandler()}>
//           <Text style={{ fontSize: "20%" }}>+1해주기</Text>
//         </Pressable>
//         <Pressable onPress={() => minusHandler()}>
//           <Text style={{ fontSize: "20%" }}>-해주기</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// };

export const HikingRecordManage = () => {
  // 보여줄 메뉴를 정하는 state
  const [mainMenu, setMainMenu] = useState("NameSearch");
  // const [hikingInfo, setHikingInfo] = useState({});
  const [mountDB, setMountDB] = useState([]);
  const [userDB, setUserDB] = useState([]);
  // const userDB = useRef([]);
  const [userName, setUserName] = useState("");

  const setMenu = (item, name = "") => {
    setMainMenu(item);
    setUserName(name);
    // setHikingInfo(item);
  };
  // const subMenuOff = (item) => setMainMenu(item);
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
        // userDB.current = data;
      }
      return;
    } catch (error) {
      console.log(error);
    }
  }
  console.log('a');

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <View style={{flexDirection:'row', justifyContent:'space-between', marginLeft:'5%', marginRight:'5%'}}>
        <Pressable style={{backgroundColor:'#81BEF7', padding:'2%'}} onPress={() => {setMenu("NameSearch")}}>
          <Text style={{fontSize:'20%'}}>이름으로 조회하기</Text>
        </Pressable>
        <Pressable style={{backgroundColor:'#81BE11', padding:'2%'}} onPress={() => {setMenu('DaySearch')}}>
          <Text style={{fontSize:'20%'}}>날짜로 조회하기</Text>
        </Pressable>
      </View>
        <Text style={{width:'100%'}}></Text>
      {/* <TestMenu /> */}
      {mainMenu == "NameSearch" && <NameSearch userDB={userDB} setMenu={setMenu} />}
      {mainMenu == "DaySearch" && <DaySearch />}
      {mainMenu == "Record" && (
        <HikingRecord
          mountDB={mountDB}
          mainMenu={mainMenu}
          setMenu={setMenu}
          userName={userName}
        />
      )}
    </View>
  );
};