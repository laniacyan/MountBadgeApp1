import {
  StyleSheet,
  Text,
  View,
  Modal,
  SafeAreaView,
  Pressable,
  FlatList,
} from "react-native";

export const ModalPoint = ({
  modalPVisible,
  setModalPVisible,
  pointList,
  listPointView,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalPVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalPVisible(!modalPVisible);
      }}
    >
      {/* 스타일 수정 필요 */}
      <SafeAreaView
        style={{
          flex: 0.7,
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
        }}
      >
        <Pressable
          style={{ alignItems: "center", margin: "3%" }}
          onPress={() => setModalPVisible(!modalPVisible)}
        >
          <Text style={{ fontSize: "20%", color: "#EFF8FB" }}>선택</Text>
        </Pressable>
        <FlatList
          style={{}}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={pointList}
          keyExtractor={(item) => item}
          renderItem={({ item }) => listPointView(item)}
        />
        <Pressable
          style={{ color: "#81F7F3", alignItems: "center", margin: "3%" }}
          onPress={() => setModalPVisible(!modalPVisible)}
        >
          <Text style={{ fontSize: "20%", color: "#CEF6CE" }}>선택</Text>
        </Pressable>
      </SafeAreaView>
    </Modal>
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
