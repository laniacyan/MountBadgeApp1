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
  } from "react-native";
  import { useState, useEffect } from "react";
  import * as SQLite from "expo-sqlite";
  // import { Feather } from '@expo/vector-icons';
  import Feather from "@expo/vector-icons/Feather";
  import { AntDesign } from "@expo/vector-icons";
  
  // AddDataMenu.js의 함수들
  const checkingData = (checkData) => {
    // 만약 내용이 들어 있다면
    if (checkData != "") {
      return true;
    } else return false;
  };
  // // AddDataMenu.js의 함수들
  
  export const CheckDataMenu1 = () => {
    const [loadedData, setLoadedData] = useState([]);
    const [loadData, setLoadData] = useState(false);
    const [dayData, setDayData] = useState("");
    const [mountData, setMountData] = useState("");
    const [pointData, setPointData] = useState("");
    const [nameData, setNameData] = useState("");
    const [updateData, setUpdateData] = useState("");
  
    useEffect(() => {
      loadingData();
    }, [loadData]);
  
    // DB에서 데이터를 불러온다.
    async function loadingData() {
      console.log("load data");
      try {
        const db = await SQLite.openDatabaseAsync("MountBedge.db");
        const loadingData = await db.getAllAsync("SELECT * FROM MountPoint");
        setLoadedData(loadingData);
        return loadingData;
      } catch (error) {
        console.log(error);
      }
    }
    // 데이터 검색을 위한 코드
    let listItemView = (item) => {
      // console.log('item', item);
      if (searchValue == item.Name) {
        return listItemViewReturn(item);
      } else if (searchValue == "") {
        // 아무것도 입력하지 않았을 시 모두 보여준다.
        return listItemViewReturn(item);
      }
    };
    // 데이터를 화면에 띄우는 코드
    const listItemViewReturn = (item) => {
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
            <Text style={styles.textbottom}>{item.Mountain}</Text>
  
            <Text style={styles.textheader}> 이름:</Text>
            <Text style={styles.textbottom}>{item.Name}</Text>
          </View>
          <View style={{ flexDirection: "row", paddingRight: "1%" }}>
            <TouchableOpacity onPress={() => setUpdateData(item)}>
              <AntDesign name="filetext1" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => DeleteData(item)}>
              <Feather name="delete" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      );
    };
    const [searchValue, setSearchValue] = useState("");
    // 데이터 업데이트
    async function UpdateData(id) {
      console.log("update data start");
      console.log("load data", loadData);
      const addData = [{ dayData }, { mountData }, { pointData }, { nameData }];
      if (id == undefined) {
        Alert.alert("수정 실패", "수정할 항목을 선택해 주세요");
      } else {
        for (const value of addData) {
          inData = checkingData(Object.values(value)[0]);
          if (inData != true) {
            Alert.alert("내용 부족", "빈 내용이 없도록 해주세요");
            return;
          }
        }
        try {
          const db = await SQLite.openDatabaseAsync("MountBedge.db");
          await db.runAsync(
            `
            UPDATE MountPoint
            SET Date = ?, 
            Mountain = ?, 
            Point = ?, 
            Name = ? 
            WHERE id = ?`,
            dayData,
            mountData,
            pointData,
            nameData,
            id
          );
          setLoadData((current) => !current);
          Alert.alert("수정 완료");
          setUpdateData("");
        } catch (error) {
          console.error(error);
        }
      }
    }
    // 데이터 삭제
    function DeleteData(item) {
      console.log("dl item", item);
      Alert.alert("", "삭제합니까?", [
        { text: "취소" },
        {
          text: "삭제",
          onPress: async () => {
            try {
              const db = await SQLite.openDatabaseAsync("MountBedge.db");
              await db.runAsync(`DELETE FROM MountPoint WHERE id = ${item.id}`);
  
              loadingData();
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]);
    }
    // 현재 수정하려는 데이터를 보여준다.
    function ViewUpdateData() {
      console.log("수정하려는 데이터");
      if (updateData != "") {
        return (
          <View style={{ flexDirection: "row" }}>
            <Text>날짜:{updateData.Date.toString()}</Text>
            <Text>산:{updateData.Mountain.toString()}</Text>
            <Text>점수:{updateData.Point.toString()}</Text>
            <Text>이름:{updateData.Name.toString()}</Text>
          </View>
        );
      }
    }
  
    return (
      <View style={{ flex: 0.7, width: "100%", marginTop: 10 }}>
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
            // keyExtractor={(item, index) => index.toString()}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
        {/* 데이터 수정 필드 */}
        <View key={updateData}>
          {/* 수정할 데이터를 보여준다. */}
          <ViewUpdateData />
          <View style={{ flexDirection: "row" }}>
            <Text>날짜:</Text>
            <TextInput
              style={styles.AddDataPlace2}
              onChangeText={setDayData}
              value={dayData}
            />
            <Text>산:</Text>
            <TextInput
              style={styles.AddDataPlace2}
              onChangeText={setMountData}
              value={mountData}
            />
            <Text>점수:</Text>
            <TextInput
              style={styles.AddDataPlace2}
              onChangeText={setPointData}
              value={pointData}
            />
            <Text>이름:</Text>
            <TextInput
              style={styles.AddDataPlace2}
              onChangeText={setNameData}
              value={nameData}
            />
            <Feather
              name="edit-3"
              size={24}
              color="black"
              onPress={() => UpdateData(updateData.id)}
            />
          </View>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    SubMenuAdd: {
      flexDirection: "row",
      backgroundColor: "grey",
    },
    AddDataPlace: {
      height: "7%",
      backgroundColor: "#CEF6F5",
    },
    AddDataPlace2: {
      height: "100%",
      width: "10%",
      backgroundColor: "#CEF6F5",
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
      fontSize: 14,
      fontWeight: "700",
    },
    textbottom: {
      color: "#111",
      fontSize: 14,
    },
  });
  