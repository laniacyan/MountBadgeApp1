import { StyleSheet, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export const InputDay = ({ dayData, onChange }) => {
  return (
    <View style={[styles.SubMenuAdd, { justifyContent: "space-between" }]}>
      <View>
        <Text style={{ flex: 1, fontSize: "33%", textAlign: "center" }}>
          날짜
        </Text>
      </View>
      <View>
        <DateTimePicker
          style={{
            flex: 1,
            fontSize: "25%",
            backgroundColor: "tomato",
          }}
          value={dayData}
          mode={"date"}
          is24Hour={true}
          onChange={onChange}
          locale="ko-kr"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  SubMenuAdd: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "grey",
    fontSize: 20,
  },
});
