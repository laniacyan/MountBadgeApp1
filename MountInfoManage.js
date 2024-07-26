import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { MountInfoMain } from "./components/MountInfoManage/MountInfoMain";
import { MountInfoSub } from "./components/MountInfoManage/MountInfoSub";

// 부모 메뉴
export const MountInfoManage = () => {
  // 보여줄 메뉴를 정하는 state
  const [subState, setSubState] = useState(false);
  const [mountInfo, setMountInfo] = useState({});

  const subMenuOn = (item) => {
    setSubState(true);
    setMountInfo(item);
  };
  const subMenuOff = () => setSubState(false);

  return (
    <View style={styles.AddDataMenu}>
      {subState == false && <MountInfoMain subMenuOn={subMenuOn} />}
      {subState == true && (
        <MountInfoSub subMenuOff={subMenuOff} MountInfo={mountInfo} />
      )}
    </View>
  );
};

// 스타일 모음
const styles = StyleSheet.create({
  AddDataMenu: {
    flex: 1,
    width: "100%",
  },
});
