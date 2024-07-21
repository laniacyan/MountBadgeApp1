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
  SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import Feather from "@expo/vector-icons/Feather";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

// 부모 메뉴
export const UserInfoManage = () => {
  // 보여줄 메뉴를 정하는 state
  const [subState, setSubState] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const subMenuOn = (item) => {
    setSubState(true);
    setUserInfo(item);
  };
  const subMenuOff = () => setSubState(false);

  const setDayforSQL = (data) => {
    const Year = data.getFullYear();
    const Month = (data.getMonth()+1 < 10 ? '0' + (data.getMonth()+1) : (data.getMonth()+1));
    const Day = (data.getDate() < 10 ? '0' + data.getDate() : data.getDate());
    return Year + "-" + Month + "-" + Day;
  };

  return (
    <View style={styles.AddDataMenu}>
      {subState == false && (
        <UserInfoMain subMenuOn={subMenuOn} setDayforSQL={setDayforSQL} />
      )}
      {subState == true && (
        <UserInfoSub
          subMenuOff={subMenuOff}
          UserInfo={userInfo}
          setDayforSQL={setDayforSQL}
        />
      )}
    </View>
  );
};

// 메인 메뉴(유저 정보 추가 및 검색)
const UserInfoMain = ({ subMenuOn, setDayforSQL }) => {
  // 불러온 데이터를 담는 state
  const [loadedData, setLoadedData] = useState([]);
  // 검색 및 추가에 사용되는 state
  const [nameData, setNameData] = useState("");
  const [birthData, setBirthData] = useState(new Date(2000, 0, 1));
  const [genderData, setGenderData] = useState("남성");
  const [addrData, setAddrData] = useState("");
  const [pNData, setPNData] = useState("");

  // 데이터 불러오기
  useEffect(() => {
    LoadingUserInfo();
  }, []);

  const onChange = (event, data) => {
    setBirthData(data);
  };

  // 유저 검색
  const SearchUserInfo = async () => {
    // 비어있지 않은 정보를 이용해 검색한다.
    // 비어있는 정보는 명령문에 포함시키지 않는다.

    try {
      const db = await SQLite.openDatabaseAsync("MountBedge.db");
      
    } catch (error) {
      console.log(error);
    }
  };
  // 유저 정보 불러오기
  const LoadingUserInfo = async () => {
    console.log("load data");
    try {
      const db = await SQLite.openDatabaseAsync("MountBedge.db");
      const loadingData = await db.getAllAsync("SELECT * FROM UserInfo");
      setLoadedData(loadingData);
      return
    } catch (error) {
      console.log(error);
    }
  };
  // 유저 정보 보여주기
  const LoadedListView = (item) => {
    console.log("loaded list view item", item);
    // 정보를 보여주는 list
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
  // 유저 정보 추가
  const InsertUserInfo = async () => {
    // 이름이 적혀있는지 확인한다.
    if (nameData == "") {
      Alert.alert("이름을 적어주세요!", "error!");
      return;
    }

    // 데이터 추가
    try {
      const db = await SQLite.openDatabaseAsync("MountBedge.db");
      await db.execAsync(`
            INSERT INTO UserInfo (Name, Birth, Gender, Address, PhoneNumber) VALUES (
              '${nameData}', 
              '${setDayforSQL(birthData)}', 
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
    console.log("delete item", item);
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
          <Text style={styles.AddData}>생년월일</Text>
          <DateTimePicker
            value={birthData}
            mode={"date"}
            is24Hour={true}
            onChange={onChange}
            locale="ko-kr"
          />
        </View>
        <View style={styles.AddMenuLine}></View>
        <View style={styles.SubMenuAdd}>
          <Text style={styles.AddData}>성별</Text>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: genderData == "남성" ? "#58FA82" : "#CEF6F5",
            }}
            activeOpacity={0}
            onPress={() => setGenderData("남성")}
          >
            <Text>남성</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: genderData == "여성" ? "#58FA82" : "#CEF6F5",
            }}
            activeOpacity={0}
            onPress={() => setGenderData("여성")}
          >
            <Text>여성</Text>
          </TouchableOpacity>
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
const UserInfoSub = ({ subMenuOff, UserInfo, setDayforSQL }) => {
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
