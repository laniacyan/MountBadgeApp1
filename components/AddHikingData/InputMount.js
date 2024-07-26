import { StyleSheet, Text, View, Button } from "react-native";

export const InputMount = ({ SetModal, mountData }) => {
  return (
    <View style={styles.SubMenuAdd}>
      <Text style={styles.AddData}>산</Text>
      <View style={styles.AddDataPlace}>
        <Button
          onPress={() => SetModal('mount')}
          title={mountData}
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
