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
  Modal,
  SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { Picker } from "@react-native-picker/picker";

export const DirectInput = ({ SearchDirect }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onChangeStart = (event, data) => {
    setStartDate(data);
  };
  const onChangeEnd = (event, data) => {
    setEndDate(data);
  };
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <DateTimePicker
          value={startDate}
          mode={"date"}
          is24Hour={true}
          onChange={onChangeStart}
          locale="ko-kr"
        />
        <Text>~</Text>
        <DateTimePicker
          value={endDate}
          mode={"date"}
          is24Hour={true}
          onChange={onChangeEnd}
          locale="ko-kr"
          style={{ marginRight: "5%" }}
        />
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Pressable
          style={{ backgroundColor: "white", margin: "5%", padding: "2%" }}
          onPress={() => SearchDirect(startDate, endDate)}
        >
          <Text>검색</Text>
        </Pressable>
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
  modalContent: {
    height: "25%",
    width: "100%",
    backgroundColor: "#fff",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
});
