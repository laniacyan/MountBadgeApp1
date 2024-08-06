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
import { AntDesign } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";

export const NameList = ({ userDB, setMenu }) => {
  // 보여줄 메뉴를 정하는 state
  const [searchValue, setSearchValue] = useState("");
  const [opacityBT, setOpacityBT] = useState(false);

  const listItemViewReturn = (item) => {
    if (item.Name.includes(searchValue) == true || searchValue == "") {
      return (
        <Pressable
          key={item.id}
          style={{
            backgroundColor: "#EEE",
            marginTop: "3%",
            padding: "2%",
            // borderRadius: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            opacity: opacityBT == item.id ? 0.5 : 1,
          }}
          onPressIn={() => setOpacityBT(item.id)}
          onPressOut={() => setOpacityBT(false)}
          onPress={() => setMenu("main", item.Name)}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textheader}>이름:</Text>
            <Text style={styles.textbottom}>{item.Name}</Text>

            <Text style={styles.textheader}> 성별:</Text>
            <Text style={styles.textbottom}>{item.Gender}</Text>

            <Text style={styles.textheader}> 전화번호:</Text>
            <Text style={styles.textbottom}>{item.PhoneNumber}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: "2%",
            }}
          ></View>
        </Pressable>
      );
    }
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      {/* 데이터 검색 */}
      <TextInput
        style={styles.AddDataPlace}
        onChangeText={setSearchValue}
        value={searchValue}
        placeholder="검색할 이름을 입력해 주세요."
        placeholderTextColor={"#000000"}
        // onSubmitEditing={loadingData}
        // onSubmitEditing={() => {}}
      />
      {/* 불러온 리스트 */}
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 20 }}
        data={userDB}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => listItemViewReturn(item)}
      />
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
