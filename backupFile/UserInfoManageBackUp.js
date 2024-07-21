// import {
//   StyleSheet,
//   Text,
//   View,
//   Button,
//   FlatList,
//   TextInput,
//   Pressable,
//   Alert,
//   TouchableOpacity,
// } from "react-native";
// import { useState, useEffect } from "react";
// import * as SQLite from "expo-sqlite";
// import { CreateTable } from "./CreateTable";
// import Feather from "@expo/vector-icons/Feather";
// import { AntDesign } from "@expo/vector-icons";
// import { UserInfoSub } from './UserInfoSub.js';

// export const UserInfoManage = () => {
//   const [userInfoManage, setUserInfoManage] = useState(false);
//   const [loadedData, setLoadedData] = useState([]);
//   const [nameData, setNameData] = useState("");
//   const [birthData, setBirthData] = useState("");
//   const [genderData, setGenderData] = useState("");
//   const [addrData, setAddrData] = useState("");
//   const [pNData, setPNData] = useState("");

//   const [nameDataUpdate, setNameDataUpdate] = useState("");
//   const [birthDataUpdate, setBirthDataUpdate] = useState("");
//   const [genderDataUpdate, setGenderDataUpdate] = useState("");
//   const [addrDataUpdate, setAddrDataUpdate] = useState("");
//   const [pNDataUpdate, setPNDataUpdate] = useState("");
//   const [updateData, setUpdateData] = useState("");

//   useEffect(() => {
//     CreateTable();
//   }, []);
//   useEffect(() => {
//     LoadingUserInfo();
//   }, []);

//   const subMenuOn = () => setUserInfoManage(true);
//   const subMenuOff = () => setUserInfoManage(false);

//   // 유저 정보 불러오기
//   const LoadingUserInfo = async () => {
//     console.log("load data");
//     try {
//       const db = await SQLite.openDatabaseAsync("MountBedge.db");
//       const loadingData = await db.getAllAsync("SELECT * FROM UserInfo");
//       setLoadedData(loadingData);
//       return loadingData;
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   // 유저 검색
//   const SearchUserInfo = () => {
//     // 비어있지 않은 정보를 이용해 검색한다.
//     // 비어있는 정보는 명령문에 포함시키지 않는다.
//   };
//   // 유저 정보 추가
//   const InsertUserInfo = async () => {
//     // 이름이 적혀있는지 확인한다.
//     // 생년월일이 적혀있는지 확인한다. *숫자6자리
//     // 성별이 적혀있는지 확인한다.
//     // 위 조건이 충족되지 않았을 시 알람을 보낸다.

//     // 데이터 추가
//     try {
//       const db = await SQLite.openDatabaseAsync("MountBedge.db");
//       await db.execAsync(`
//         INSERT INTO UserInfo (Name, Birth, Gender, Address, PhoneNumber) VALUES (
//           '${nameData}', 
//           '${birthData}', 
//           '${genderData}', 
//           '${addrData}', 
//           '${pNData}');`);
//       // 데이터 입력 성공 시 출력
//       console.log("Database connection is working");
//       Alert.alert("데이터 입력 완료");
//       // 성공시 데이터를 다시 불러온다.
//       LoadingUserInfo();
//     } catch (error) {
//       console.error("error", error);
//     }
//   };
//   // 유저 정보 수정
//   const UpdateUserInfo = () => {
//     // 받은 정보를 받은 id에 UPDATE 시킨다.
//   };
//   // 유저 정보 삭제
//   const DeleteUserInfo = (item) => {
//     // 지울 정보를 받아 삭제 명령어를 넣는다.
//     console.log("dl item", item);
//     Alert.alert("", "삭제합니까?", [
//       { text: "취소" },
//       {
//         text: "삭제",
//         onPress: async () => {
//           try {
//             const db = await SQLite.openDatabaseAsync("MountBedge.db");
//             await db.runAsync(`DELETE FROM UserInfo WHERE id = ${item.id}`);
//             LoadingUserInfo();
//           } catch (error) {
//             console.log(error);
//           }
//         },
//       },
//     ]);
//   };
//   // 유저 정보 보여주기
//   const LoadedListView = (item) => {
//     console.log("loaded list view item", item);
//     // /* 유저 정보를 보여주는 list */
//     return (
//       <View
//         key={item.id}
//         style={{
//           // flex: 1,
//           // width: '100%',
//           backgroundColor: "#EEE",
//           marginTop: "3%",
//           padding: "2%",
//           flexDirection: "row",
//           justifyContent: "space-between",
//         }}
//       >
//         <View>
//           <View style={{ flexDirection: "row", marginLeft: "2%" }}>
//             <Text style={styles.textheader}>이름:</Text>
//             <Text style={styles.textbottom}>{item.Name}</Text>
//             <Text style={styles.textheader}> 성별:</Text>
//             <Text style={styles.textbottom}>{item.Gender}</Text>
//           </View>
//           <View style={{ flexDirection: "row", marginLeft: "2%" }}>
//             <Text style={styles.textheader}>전화번호:</Text>
//             <Text style={styles.textbottom}>{item.PhoneNumber}</Text>
//           </View>
//         </View>
//         {/* <Text style={styles.textheader}> 생년월일:</Text>
//           <Text style={styles.textbottom}>{item.Birth}</Text> */}
//         {/* <Text style={styles.textheader}> 주소:</Text>
//           <Text style={styles.textbottom}>{item.Address}</Text> */}
//         <View
//           style={{
//             flexDirection: "row",
//             paddingRight: "1%",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           {/* <TouchableOpacity onPress={() => setUpdateData(item)}> */}
//           <TouchableOpacity
//             onPress={() => {
//               setUpdateData(item);
//               subMenuOn();
//             }}
//           >
//             <AntDesign name="filetext1" size={24} color="black" />
//           </TouchableOpacity>
//           <Text> </Text>
//           <TouchableOpacity onPress={() => DeleteUserInfo(item)}>
//             <Feather name="delete" size={24} color="black" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };
//   // 수정할 유저 정보 보여주기
//   const ViewUpdateData = () => {
//     console.log("수정하려는 데이터");
//     setNameDataUpdate(updateData.Name);
//     setBirthDataUpdate(updateData.Birth.toString());
//     setGenderDataUpdate(updateData.Gender);
//     setAddrDataUpdate(updateData.Address);
//     setPNDataUpdate(updateData.PhoneNumber);

//     if (updateData != "") {
//       return (
//         <View style={{ alignItems: "center", }}>
//           <View style={{ flexDirection: "row", }}>
//             <Text>이름:</Text>
//             <TextInput style={{}} onChangeText={setNameDataUpdate} value={nameDataUpdate} />
//           </View>
//           <View style={{ flexDirection: "row", }}>
//             <Text>생년월일:</Text>
//             <TextInput style={{}} onChangeText={setBirthDataUpdate} value={birthDataUpdate} />
//           </View>
//           <View style={{ flexDirection: "row", }}>
//             <Text>성별:</Text>
//             <TextInput style={{}} onChangeText={setGenderDataUpdate} value={genderDataUpdate} />
//           </View>
//           <View style={{ flexDirection: "row", }}>
//             <Text>주소:</Text>
//             <TextInput style={{}} onChangeText={setAddrDataUpdate} value={addrDataUpdate} />
//           </View>
//           <View style={{ flexDirection: "row", }}>
//             <Text>전화번호:</Text>
//             <TextInput style={{}} onChangeText={setPNDataUpdate} value={pNDataUpdate} />
//           </View>
//         </View>
//       );
//     }
//   };

//   const UserInfoMain = () => {
//     return (
//       <View style={styles.AddDataMenu}>
//         {/* 유저 정보 검색 및 추가 */}
//         <View>
//           <View style={styles.SubMenuAdd}>
//             <Text style={styles.AddData}>이름</Text>
//             <TextInput
//               style={styles.AddDataPlace}
//               onChangeText={setNameData}
//               value={nameData}
//             />
//           </View>
//           <View style={styles.AddMenuLine}></View>
//           <View style={styles.SubMenuAdd}>
//             <Text style={styles.AddData}>생년월일</Text>
//             <TextInput
//               style={styles.AddDataPlace}
//               onChangeText={setBirthData}
//               value={birthData}
//             />
//           </View>
//           <View style={styles.AddMenuLine}></View>
//           <View style={styles.SubMenuAdd}>
//             <Text style={styles.AddData}>성별</Text>
//             <TextInput
//               style={styles.AddDataPlace}
//               onChangeText={setGenderData}
//               value={genderData}
//             />
//           </View>
//           <View style={styles.AddMenuLine}></View>
//           <View style={styles.SubMenuAdd}>
//             <Text style={styles.AddData}>주소</Text>
//             <TextInput
//               style={styles.AddDataPlace}
//               onChangeText={setAddrData}
//               value={addrData}
//             />
//           </View>
//           <View style={styles.AddMenuLine}></View>
//           <View style={styles.SubMenuAdd}>
//             <Text style={styles.AddData}>전화번호</Text>
//             <TextInput
//               style={styles.AddDataPlace}
//               onChangeText={setPNData}
//               value={pNData}
//             />
//           </View>
//           <View style={{ alignItems: "center" }}>
//             <View style={styles.ButtonLine}></View>
//             <Pressable onPress={InsertUserInfo}>
//               <Text style={styles.AddDataButton}>유저 추가</Text>
//             </Pressable>
//             <View style={styles.ButtonLine}></View>
//             <Pressable onPress={SearchUserInfo}>
//               <Text style={styles.AddDataButton}>유저 검색</Text>
//             </Pressable>
//             <View style={styles.ButtonLine}></View>
//           </View>
//         </View>
//         {/* 유저 목록 */}
//         <View style={{ flex: 1, backgroundColor: "white", width: "100%" }}>
//           <FlatList
//             style={{ flex: 1, marginTop: 30, width: "100%" }}
//             contentContainerStyle={{ paddingHorizontal: 20 }}
//             data={loadedData}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => LoadedListView(item)}
//           />
//         </View>
//         {/* 유저 정보 수정 */}
//         <View key={updateData}>
//           {/* 수정할 데이터를 보여준다. */}
//           {/* <ViewUpdateData />
//         <View style={{ flexDirection: "row" }}>
//           <Text>이름:</Text>
//           <TextInput
//             style={styles.AddDataPlace2}
//             onChangeText={setNameDataUpdate}
//             value={nameDataUpdate}
//           />
//           <Text>생년월일:</Text>
//           <TextInput
//             style={styles.AddDataPlace2}
//             onChangeText={setBirthDataUpdate}
//             value={birthDataUpdate}
//           />
//           <Text>성별:</Text>
//           <TextInput
//             style={styles.AddDataPlace2}
//             onChangeText={setGenderDataUpdate}
//             value={genderDataUpdate}
//           />
//           <Text>주소:</Text>
//           <TextInput
//             style={styles.AddDataPlace2}
//             onChangeText={setAddrDataUpdate}
//             value={addrDataUpdate}
//           />
//           <Text>전화번호:</Text>
//           <TextInput
//             style={styles.AddDataPlace2}
//             onChangeText={setPNDataUpdate}
//             value={pNDataUpdate}
//           />
//           <Feather
//             name="edit-3"
//             size={24}
//             color="black"
//             onPress={() => UpdateUserInfo(updateData.id)}
//           />
//         </View> */}
//         </View>
//       </View>
//     );
//   };



//   return (
//     <View style={styles.AddDataMenu}>
//       {userInfoManage == false && <UserInfoMain />}
//       {userInfoManage == true && <UserInfoSub />}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   AddDataMenu: {
//     flex: 1,
//     width: "100%",
//   },
//   SubMenuAdd: {
//     flexDirection: "row",
//     backgroundColor: "grey",
//   },
//   AddData: {
//     fontSize: "33%",
//     textAlign: "center",
//   },
//   AddDataPlace: {
//     flex: 1,
//     backgroundColor: "#CEF6F5",
//   },
//   AddDataPlace2: {
//     height: "100%",
//     width: "10%",
//     backgroundColor: "#CEF6F5",
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

//   AddDataButton: {
//     alignItems: "center",
//     width: "30%",
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
  Alert,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import Feather from "@expo/vector-icons/Feather";
import { AntDesign } from "@expo/vector-icons";

// 메인 메뉴(유저 정보 추가 및 검색)
const UserInfoMain = ({subMenuOn}) => {
  // 불러온 데이터를 담는 state
  const [loadedData, setLoadedData] = useState([]);
  // 검색 및 추가에 사용되는 state
  const [nameData, setNameData] = useState("");
  const [birthData, setBirthData] = useState("");
  const [genderData, setGenderData] = useState("");
  const [addrData, setAddrData] = useState("");
  const [pNData, setPNData] = useState("");

  useEffect(() => {
    LoadingUserInfo();
  }, []);

  // 유저 정보 불러오기
  const LoadingUserInfo = async () => {
    console.log("load data");
    try {
      const db = await SQLite.openDatabaseAsync("MountBedge.db");
      const loadingData = await db.getAllAsync("SELECT * FROM UserInfo");
      setLoadedData(loadingData);
      return loadingData;
    } catch (error) {
      console.log(error);
    }
  };
  // 유저 검색
  const SearchUserInfo = () => {
    // 비어있지 않은 정보를 이용해 검색한다.
    // 비어있는 정보는 명령문에 포함시키지 않는다.
  };
  // 유저 정보 추가
  const InsertUserInfo = async () => {
    // 이름이 적혀있는지 확인한다.
    // 생년월일이 적혀있는지 확인한다. *숫자6자리
    // 성별이 적혀있는지 확인한다.
    // 위 조건이 충족되지 않았을 시 알람을 보낸다.

    // 데이터 추가
    try {
      const db = await SQLite.openDatabaseAsync("MountBedge.db");
      await db.execAsync(`
            INSERT INTO UserInfo (Name, Birth, Gender, Address, PhoneNumber) VALUES (
              '${nameData}', 
              '${birthData}', 
              '${genderData}', 
              '${addrData}', 
              '${pNData}');`);
      // 데이터 입력 성공 시 출력
      console.log("Database connection is working");
      Alert.alert("데이터 입력 완료");
      // 성공시 데이터를 다시 불러온다.
      LoadingUserInfo();
    } catch (error) {
      console.error("error", error);
    }
  };
  // 유저 정보 삭제
  const DeleteUserInfo = (item) => {
    // 지울 정보를 받아 삭제 명령어를 넣는다.
    console.log("dl item", item);
    Alert.alert("", "삭제합니까?", [
      { text: "취소" },
      {
        text: "삭제",
        onPress: async () => {
          try {
            const db = await SQLite.openDatabaseAsync("MountBedge.db");
            await db.runAsync(`DELETE FROM UserInfo WHERE id = ${item.id}`);
            LoadingUserInfo();
          } catch (error) {
            console.log(error);
          }
        },
      },
    ]);
  };
  // 유저 정보 보여주기
  const LoadedListView = (item) => {
    console.log("loaded list view item", item);
    // /* 유저 정보를 보여주는 list */
    return (
      <View
        key={item.id}
        style={{
          // flex: 1,
          // width: '100%',
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
            <Text style={styles.textheader}> 성별:</Text>
            <Text style={styles.textbottom}>{item.Gender}</Text>
          </View>
          <View style={{ flexDirection: "row", marginLeft: "2%" }}>
            <Text style={styles.textheader}>전화번호:</Text>
            <Text style={styles.textbottom}>{item.PhoneNumber}</Text>
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
          <TouchableOpacity onPress={() => DeleteUserInfo(item)}>
            <Feather name="delete" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.AddDataMenu}>
      {/* 유저 정보 검색 및 추가 */}
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
          <Text style={styles.AddData}>생년월일</Text>
          <TextInput
            style={styles.AddDataPlace}
            onChangeText={setBirthData}
            value={birthData}
          />
        </View>
        <View style={styles.AddMenuLine}></View>
        <View style={styles.SubMenuAdd}>
          <Text style={styles.AddData}>성별</Text>
          <TextInput
            style={styles.AddDataPlace}
            onChangeText={setGenderData}
            value={genderData}
          />
        </View>
        <View style={styles.AddMenuLine}></View>
        <View style={styles.SubMenuAdd}>
          <Text style={styles.AddData}>주소</Text>
          <TextInput
            style={styles.AddDataPlace}
            onChangeText={setAddrData}
            value={addrData}
          />
        </View>
        <View style={styles.AddMenuLine}></View>
        <View style={styles.SubMenuAdd}>
          <Text style={styles.AddData}>전화번호</Text>
          <TextInput
            style={styles.AddDataPlace}
            onChangeText={setPNData}
            value={pNData}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <View style={styles.ButtonLine}></View>
          <Pressable onPress={InsertUserInfo}>
            <Text style={styles.AddDataButton}>유저 추가</Text>
          </Pressable>
          <View style={styles.ButtonLine}></View>
          <Pressable onPress={SearchUserInfo}>
            <Text style={styles.AddDataButton}>유저 검색</Text>
          </Pressable>
          <View style={styles.ButtonLine}></View>
        </View>
      </View>
      {/* 유저 목록 */}
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

// 서브 메뉴(유저 정보 수정)
const UserInfoSub = ({subMenuOff, UserInfo}) => {
  const [nameDataUpdate, setNameDataUpdate] = useState("");
  const [birthDataUpdate, setBirthDataUpdate] = useState("");
  const [genderDataUpdate, setGenderDataUpdate] = useState("");
  const [addrDataUpdate, setAddrDataUpdate] = useState("");
  const [pNDataUpdate, setPNDataUpdate] = useState("");

  // useEffect(() => {console.log('sub user info1', UserInfo);}, []);
  useEffect(() => {
    console.log('sub user info1', UserInfo);
    setNameDataUpdate(UserInfo.Name);
    setBirthDataUpdate(UserInfo.Birth.toString());
    setGenderDataUpdate(UserInfo.Gender);
    setAddrDataUpdate(UserInfo.Address);
    setPNDataUpdate(UserInfo.PhoneNumber);
  }, []);


  // console.log('sub user info2', UserInfo);
  console.log("서브 메뉴 실행");
  // 수정에 사용되는 state

  // 유저 정보 수정
  const UpdateUserInfo = async() => {
    // 받은 정보를 받은 id에 UPDATE 시킨다.
    console.log("update data start");
    // const userInfo = [{nameDataUpdate}, {birthDataUpdate}, {genderDataUpdate}, {addrDataUpdate}, {pNDataUpdate}];
    try {
      const db = await SQLite.openDatabaseAsync("MountBedge.db");
      await db.runAsync(`
        UPDATE UserInfo
        SET Name = ?,
        Birth = ?,
        Gender = ?,
        Address = ?,
        PhoneNumber = ?
        WHERE id = ?`,
        nameDataUpdate,
        birthDataUpdate,
        genderDataUpdate,
        addrDataUpdate,
        pNDataUpdate,
        UserInfo.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      {/* <ViewUpdateData /> */}
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
          <Text>생년월일:</Text>
          <TextInput
            style={{}}
            onChangeText={setBirthDataUpdate}
            value={birthDataUpdate}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>성별:</Text>
          <TextInput
            style={{}}
            onChangeText={setGenderDataUpdate}
            value={genderDataUpdate}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>주소:</Text>
          <TextInput
            style={{}}
            onChangeText={setAddrDataUpdate}
            value={addrDataUpdate}
          />
        </View>
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
// 부모 메뉴
export const UserInfoManage = () => {
  // 보여줄 메뉴를 정하는 state
  const [subState, setSubState] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const subMenuOn = (item) => {setSubState(true); setUserInfo(item);};
  const subMenuOff = () => setSubState(false);
  // const UserInfo = (userInfo) => {};
  // const UserInfoItem = (item) => setUserInfo(item);
  console.log('userInfo', userInfo);

  return (
    <View style={styles.AddDataMenu}>
      {subState == false && <UserInfoMain subMenuOn={subMenuOn} />}
      {subState == true && <UserInfoSub subMenuOff={subMenuOff} UserInfo={userInfo} />}
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
  AddDataPlace2: {
    height: "100%",
    width: "10%",
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
  CheckDataButton: {
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


const setA = new Date("Tue Feb 01 2000 00:00:00 GMT+0900");
console.log('setA', setA);

let birthday = new Date('2000. 2. 1.');
console.log('birthday', birthday);

console.log('birthData1', birthData);
console.log('birthData2', birthData.toString());
console.log('birthData3', birthData.toLocaleDateString('ko'));
console.log('birthData4', birthData.toLocaleString());

try {
  const Year = birthData.getFullYear();
  const Month = birthData.getMonth()+1;
  const Date = birthData.getDate();
  const Day = birthData.getDay();

  console.log('Year', Year);
  console.log('Month', Month);
  console.log('Date', Date);
  console.log('Day', Day);

  // let a = birthData.toLocaleDateString('ko')
  // console.log('a', a);

  // const b = new Date(0);
  // console.log('b', b);
  // console.log('c', c);


  // let birthday = new Date(1995, 11, 17, 3, 24, 0);
  // console.log('birthday', birthday);
  const [a, setA] = useState(new Date());
  setA(new Date("Tue Feb 01 2000 00:00:00 GMT+0900"));
  console.log('a', a);

  // const db = await SQLite.openDatabaseAsync("MountBedge.db");
  // const a = await db.runAsync("SELECT NOW()");
  // console.log('a' ,a);

  // const statement = await db.prepareAsync(`SELECT * FROM UserInfo WHERE ? ? ?`);
  // const result = await statement.executeAsync(SearchInfo, a, b);
  // const firstRow = await result.getFirstAsync();
  // await db.runAsync("DROP TABLE UserInfo");

  // const statement = await db.getAllAsync(`
  //   SELECT * FROM 
  //   UserInfo WHERE 
  //   Name LIKE ? AND 
  //   Birth LIKE ? AND
  //   Gender LIKE ? AND
  //   Address LIKE ? AND
  //   PhoneNumber LIKE ?`, `%${nameData}%`, `%${birthData}%`, `%${genderData}%`, `%${addrData}%`, `%${pNData}%`);

  // const result = await statement.executeAsync(SearchInfo, a, b);
  // const firstRow = await result.getFirstAsync();
    // const statement2 = await db.prepareAsync('SELECT * FROM UserInfo WHERE BETWEEN ? and ? ');
    // const result = await statement.executeAsync('2000-01-01', '2002-06-12');
    // const result = await db.executeAsync(`SELECT * FROM UserInfo WHERE BETWEEN '2000-01-01' and '2002-06-12' `);
    // const firstRow = await result.getFirstAsync();

} catch (error) {
  console.log(error);
}
