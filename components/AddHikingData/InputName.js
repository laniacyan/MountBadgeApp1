import { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
// 이름 탭
export const InputName = ({ SetModal, buttonName, setModalPaste }) => {
  return (
    <View style={styles.SubMenuAdd}>
      <Text style={styles.AddData}>이름</Text>
      <View style={styles.AddDataPlace}>
        <View style={{ flex:'0.7' }}>
          <Button
            onPress={() => SetModal("name")}
            title={buttonName}
            color="#841584"
          />
        </View>
        <View style={{ flex:'0.5' }}>
          <Pressable
            onPress={() => setModalPaste(true)}
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20%",
            }}
          >
            <Text style={{ fontSize: "20%" }}>붙여넣기</Text>
          </Pressable>
        </View>
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
