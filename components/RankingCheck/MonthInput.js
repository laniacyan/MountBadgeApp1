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

export const MonthInput = ({ SearchMonth }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthly, setMonthly] = useState();
  const [yearModal, setYearModal] = useState(false);
  const [nowMonth, setNowMonth] = useState(false);
  const [yearRange, setYearRange] = useState([]);
  const calculateYearRange = () => {
    const startYear = year - 150;

    const Range = [];
    for (let i = startYear; i <= year; i++) {
      Range.push(i);
    }
    setYearRange(Range);
  };
  useEffect(() => {
    calculateYearRange();
  }, []);

  const YearPicker = (item) => {
    return (
      <View
        key={item}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => setYear(item)}>
          <Text style={{ fontSize: "20%" }}>{item}</Text>
        </Pressable>
      </View>
    );
  };
  // 월 버튼 누를 시 동작
  const onPress = async(item) => {
    console.log('item', item);
    setNowMonth(item);
    console.log('now month', nowMonth);
    // onChangeStart(undefined, `${year}-${item}-1`);
    // onChangeEnd(undefined, `${year}-${item}-31`);
    setMonthly();
    SearchMonth(year, nowMonth);
  };
  const MonthTable = () => {
    const months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    return (
      <View style={{ width: "100%" }}>
        {[1, 2, 3].map((row) => (
          <View key={row} style={{ flexDirection: "row" }}>
            {[...months].slice((row - 1) * 4, row * 4).map((month) => (
              <Pressable
                key={month}
                style={[
                  {
                    borderWidth: 1,
                    borderColor: "gray",
                    width: "20%",
                    height: "100%",
                    margin: "1%",
                  },
                  { backgroundColor: nowMonth == month ? "grey" : null },
                ]}
                onPress={() => onPress(month)}
              >
                <Text style={{ fontSize: "20%" }}>{month}월</Text>
              </Pressable>
            ))}
          </View>
        ))}
      </View>
    );
  };
  const createPickerItem = (label, value, key) => {
    return <Picker.Item key={key} label={label} value={value} />;
  };

  return (
    <View style={{ flexDirection: "row", flex: 1 }}>
      {/* 년 입력 */}
      <Pressable
        onPress={() => setYearModal(true)}
        style={{
          width: "25%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ borderRadius: 10, borderWidth: 1, padding: "5%" }}>
          {year}
        </Text>
      </Pressable>

      {/* 월 입력 */}
      <View style={{ alignItems: "center" }}>
        <MonthTable />
      </View>
      {/* 년도 modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={yearModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setYearModal(!yearModal);
        }}
      >
        <View style={styles.modalContent}>
          <View
            style={{
              backgroundColor: "#A9D0F5",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button
              title="선택"
              onPress={() => {
                setYearModal(!yearModal);
                SearchHikingRecord();
              }}
            />
          </View>
          <Picker
            selectedValue={year}
            onValueChange={(itemValue, itemIndex) => setYear(itemValue)}
          >
            {yearRange.map((value) =>
              createPickerItem(`${value}`, value, value)
            )}
          </Picker>
        </View>
      </Modal>
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
