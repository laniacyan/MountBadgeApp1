import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const ModalMount = ({
  modalMVisible,
  setModalMVisible,
  setSearchValue,
  searchValue,
  closeModal,
  mountDB,
  listItemViewMount,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalMVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalMVisible(!modalMVisible);
      }}
    >
      <View
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
        {/* 검색창 */}
        <View style={{ flexDirection: "row" }}>
          <TextInput
            onChangeText={setSearchValue}
            value={searchValue}
            placeholder="찾으시는 산 이름을 입력해 주세요."
            placeholderTextColor={"#000"}
            style={{ flex: 1 }}
          />
          <AntDesign
            name="close"
            size={24}
            color="black"
            onPress={() => closeModal()}
          />
        </View>
        {/* 결과창 */}
        <Text> </Text>
        <View>
          <FlatList
            style={{}}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={mountDB}
            // keyExtractor={(item, index) => index.toString()}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => listItemViewMount(item)}
          />
        </View>
      </View>
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
