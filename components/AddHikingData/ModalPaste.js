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
// 붙여넣기를 누르면 나오는 모달 창
export const ModalPaste = ({
  modalPaste,
  setModalPaste,
  setSearchValue,
  searchValue,
  PasteUserCheck,
  closeModal,
  pasteUserList,
  dupNum,
}) => {
  // 아직 미정. user를 검색한 후 check하지 못한 이름? 같은걸 넣고 싶다.
  const [searchedResult, setsearchedResult] = useState("");

  const SearchPasteUser = () => {
    // 붙여넣은 값에 UserData와 같은 이름이 있는지 검색한다.
  };

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalPaste}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalPaste(!modalPaste);
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
            <Pressable
              onPress={() => {
                // 모름. 미정?
                SearchPasteUser();
                // 받은 값을 list로 바꿔준다.
                PasteUserCheck();
              }}
            >
              <Text style={{ fontSize: "20%" }}>검색</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setModalPaste(false);
                closeModal();
              }}
            >
              <Text style={{ fontSize: "20%" }}>나가기</Text>
            </Pressable>
          </View>
          {/* 검색된 값과 명수, 찾지 못한 사람의 수와 이름을 보여준다. */}
          <View>
            {!searchValue == "" && (
              <>
                <Text>{pasteUserList.length}명의 사람을 찾았습니다.</Text>
                <Text>이미 추가된 사람이 {dupNum}명 있습니다.</Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};
