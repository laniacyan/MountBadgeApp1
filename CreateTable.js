import * as SQLite from "expo-sqlite";

export async function CreateTable() {
  console.log("create table");
  try {
    const db = await SQLite.openDatabaseAsync("MountBedge.db");
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS HikingData (
        id       INTEGER PRIMARY KEY,
        Date     DATE    NOT NULL,
        Mount    TEXT    NOT NULL,
        Point    INTEGER NOT NULL,
        Name     TEXT    NOT NULL);`);
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS UserInfo (
        id          INTEGER PRIMARY KEY,
        Name        TEXT    NOT NULL,
        Birth       DATE    NOT NULL,
        Gender      TEXT    NOT NULL,
        Address     TEXT,
        PhoneNumber TEXT,
        Checked     BOOL    DEFAULT FALSE);`);
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS MountInfo (
        id          INTEGER PRIMARY KEY,
        Name        TEXT    NOT NULL,
        Region      TEXT    NOT NULL,
        Difficulty  TEXT    NOT NULL);`);
    console.log("테이블 생성 완료");
  } catch (error) {
    console.error("error", error);
  }
}

const DeleteTable = async () => {
  const db = await SQLite.openDatabaseAsync("MountBedge.db");
  console.log("delete table HikingData");
  try {
    await db.execAsync(`DROP TABLE HikingData`);
    console.log("테이블 삭제 완료");
  } catch (error) {
    console.error("error", error);
  }
};
