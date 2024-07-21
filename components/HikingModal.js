import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";

export function HikingModal() {

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalMVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalMVisible(!modalMVisible);
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
              onPress={() => setModalMVisible(!modalMVisible)}
            />
          </View>
          <Picker
            selectedValue={pointData}
            onValueChange={(itemValue, itemIndex) => setPointData(itemValue)}
          >
            {hikingData.map((value) => createPickerItem(`${value}`, value))}
          </Picker>
        </View>
      </Modal>
    </View>
  );
}
