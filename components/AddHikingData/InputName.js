import { StyleSheet, Text, View, Button } from "react-native";

export const InputName = ({ SetModal, buttonName }) => {
  return (
    <View style={styles.SubMenuAdd}>
      <Text style={styles.AddData}>이름</Text>
      <View style={styles.AddDataPlace}>
        <Button
          onPress={() => SetModal("name")}
          title={buttonName}
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
