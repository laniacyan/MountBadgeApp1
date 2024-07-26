import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const ModalName = ({
  modalNVisible,
  setModalNVisible,
  setSearchValue,
  searchValue,
  closeModal,
  userDB,
  listItemViewUser
}) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      }}
    >
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalNVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalNVisible(!modalNVisible);
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
          {/* 검색창 */}
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
            <AntDesign
              name="close"
              size={30}
              color="black"
              onPress={() => closeModal()}
            />
          </View>
          {/* 결과창 */}
          <View style={{ flex: 1 }}>
            <FlatList
              contentContainerStyle={{ paddingHorizontal: 20 }}
              data={userDB}
              // keyExtractor={(item, index) => index.toString()}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => listItemViewUser(item)}
            />
          </View>
          <Pressable
            style={{
              backgroundColor: "#E1F5A9",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "4%",
              flex: 0.1,
            }}
            onPress={() => closeModal()}
          >
            <Text style={{ fontSize: "17%" }}>선택 완료</Text>
          </Pressable>
        </View>
      </Modal>
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
