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
import { CreateTable } from "./CreateTable";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { Picker } from "@react-native-picker/picker";

export const CheckDataMenu2 = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthly, setMonthly] = useState();
  const [dateInput, setDateInput] = useState(true);
  const [searchValue, setSearchValue] = useState([]);

  console.log("searchValue", searchValue);

  const onChangeStart = (event, data) => {
    setStartDate(data);
  };
  const onChangeEnd = (event, data) => {
    setEndDate(data);
  };
  const setDayforSQL = (data) => {
    if (typeof data != "object") {
      console.log("return data");
      return data;
    } else {
      const Year = data.getFullYear();
      const Month = (data.getMonth()+1 < 10 ? '0' + (data.getMonth()+1) : (data.getMonth()+1));
      const Day = (data.getDate() < 10 ? '0' + data.getDate() : data.getDate());
      console.log("return for sql data");
      return Year + "-" + Month + "-" + Day;
    }
  };
  // 날짜를 이용해 DB에서 산행 기록을 검색한다.
  const SearchHikingRecord = async () => {
    // console.log('setDayforSQL', setDayforSQL(startDate), setDayforSQL(endDate));
    try {
      const db = await SQLite.openDatabaseAsync("MountBedge.db");
      const data = await db.getAllAsync(
        `SELECT * FROM HikingData WHERE Date BETWEEN '${setDayforSQL(
          startDate
        )}' AND '${setDayforSQL(endDate)}';`
      );
      // const data = await db.getAllAsync(
      //   `SELECT * FROM HikingData WHERE Date BETWEEN '2024-7-9' AND '2024-7-20';`
      // );
      setSearchValue(data);
      console.log(
        "sql search code",
        `SELECT * FROM HikingData WHERE Date BETWEEN '${setDayforSQL(
          startDate
        )}' AND '${setDayforSQL(endDate)}';`
      );
      // Alert.alert("산행 기록 조회 완료.");
      return;
    } catch (error) {
      // 실패 시 출력
      console.error("Error testing database connection:", error);
    }
  };
  const SearchDirect = async () => {
    // setStartDate();
    // setEndDate();
    SearchHikingRecord();
  };
  const SearchValueList = (item) => {
    // console.log("item", item);
    return (
      <View
        key={item.id}
        style={{
          backgroundColor: "#EEE",
          marginTop: "3%",
          padding: "2%", // borderRadius: 20,
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
            onPress={() => console.log(item)}
          >
            <AntDesign name="filetext1" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log(item)}>
            <Feather name="delete" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  useEffect(() => {
    // SearchHikingRecord();
  }, []);

  // 월별 입력 칸
  const MonthInput = () => {
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
    const onPress = (item) => {
      setNowMonth(item);
      // onChangeStart(undefined, `${year}-${item}-1`);
      // onChangeEnd(undefined, `${year}-${item}-31`);
      setMonthly();
      SearchHikingRecord();
    };
    const MonthTable = () => {
      const months = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ];
      return (
        <View style={{}}>
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
      <View style={{ flexDirection: "row" }}>
        {/* 년 입력 */}
        <View style={{ margin: "7%" }}>
          <Pressable
            onPress={() => setYearModal(true)}
            style={{ marginTop: "50%" }}
          >
            <Text>{year}</Text>
          </Pressable>
        </View>
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
  // 직접 입력 칸
  const DirectInput = () => {
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
            onPress={() => SearchDirect()}
          >
            <Text>검색</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={{ width: "100%", height: "100%" }}>
      {/* 날짜 입력 메뉴 */}
      <View
        style={{
          backgroundColor: "#E0E0F8",
          height: "20%",
          width: "100%",
        }}
      >
        <View
          style={{
            // flex: 1,
            height: "30%",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Pressable
            onPress={() => setDateInput(true)}
            style={({ pressed }) => [
              {
                width: "30%",
                height: "50%",
                borderRadius: 10,
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "10%",
                marginTop: "3%",
              },
              {
                opacity: pressed ? 0.5 : 1,
                backgroundColor: pressed ? "#CEECF5" : null,
              },
            ]}
          >
            <Text>월별 입력</Text>
          </Pressable>
          <Pressable
            onPress={() => setDateInput(false)}
            style={({ pressed }) => [
              {
                width: "30%",
                height: "50%",
                borderRadius: 10,
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                marginRight: "10%",
                marginTop: "3%",
              },
              {
                opacity: pressed ? 0.5 : 1,
                backgroundColor: pressed ? "#CEECF5" : null,
              },
            ]}
          >
            <Text>직접 입력</Text>
          </Pressable>
        </View>
        <View style={{ width: "100%", height: "70%", backgroundColor: "red" }}>
          {dateInput == true && <MonthInput />}
          {dateInput == false && <DirectInput />}
        </View>
      </View>
      {/* 산행 목록 */}
      <View style={{}}>
        <FlatList
          style={{ marginTop: 30 }}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={searchValue}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => SearchValueList(item)}
        />
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
