import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
  Modal,
  SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
// import { Feather } from '@expo/vector-icons';
import { HikingRecordMain } from "./HikingRecordMain";
import { HikingRecordSub } from "./HikingRecordSub";

export const HikingRecord = ({ mountDB, subState, setMenu, userName }) => {
  // 보여줄 메뉴를 정하는 state
  const [hikingInfo, setHikingInfo] = useState({});

  const HikingInfoSet = (item) => {
    setHikingInfo(item);
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      {subState == "main" && (
        <HikingRecordMain setMenu={setMenu} userName={userName} HikingInfoSet={HikingInfoSet} />
      )}
      {subState == 'sub' && (
        <HikingRecordSub
          setMenu={setMenu}
          hikingInfo={hikingInfo}
          mountDB={mountDB}
        />
      )}
    </View>
  );
};
