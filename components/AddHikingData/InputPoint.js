import { StyleSheet, Text, View, Button } from "react-native";

export const InputPoint = ({ SetModal, pointData }) => {
  return (
    <View style={styles.SubMenuAdd}>
      <Text style={styles.AddData}>점수</Text>
      <View style={styles.AddDataPlace}>
        <Button
          onPress={() => SetModal("point")}
          title={pointData.toString()}
          color="#841584"
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
  AddData: {
    flex: 0.5,
    fontSize: "33%",
    textAlign: "center",
  },
  AddDataPlace: {
    flex: 1,
    fontSize: "25%",
    // fontSize: '1.2em',
    backgroundColor: "tomato",
  },
});
