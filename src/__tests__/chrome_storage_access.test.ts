import ChromeStorageAccess, { TabGroup } from "../chrome_storage_access";
import { chrome } from "jest-chrome";

let store = {} as any;
const storage = new ChromeStorageAccess();

const mockGetSync = chrome.storage.sync.get;
const mockSetSync = chrome.storage.sync.set;

const mockGet = (objToGet: any, callback: any) => {
  console.log(`before objToGET : ${objToGet} , store : ${JSON.stringify(JSON.stringify(store))}`)

  let defaultValue: any
  switch(String(Object)){
    case "tabGroupLastIndex":
      defaultValue = NaN
    case "tabGroup":
      defaultValue = []
  }

  let res = store[objToGet] === undefined ? { [objToGet]: defaultValue } : { [objToGet]: store[objToGet] };

  callback(res);
};
const mockSet = (objToSet: any, callback: any) => {
  store = {
    ...store,
    ...objToSet,
  };
  callback();
};

mockGetSync.mockImplementation(mockGet);
mockSetSync.mockImplementation(mockSet);

beforeEach(() => {
  store = {};
  mockGetSync.mockClear();
  mockSetSync.mockClear();
});

describe("ChromeStorageAccessのテスト", () => {
  describe("addNewGroup", () => {
    test("addNewTabGroup関数を呼ぶと、既にstorageに何もない場合、新しくデータが作成されること", async () => {
      await storage.addNewTabGroup("test", "red");

      const expcetStorageData = {
        tabGroup: [{ id: 1, tabColor: "red", tabGroupName: "test" }],
        tabGroupLastIndex: "1",
      };
      expect(store).toEqual(expcetStorageData);
    });

    test("addNewTabGroup関数を呼ぶと、既にstorageにデータがある場合、新しくデータが作成されること", async () => {
      await storage.addNewTabGroup("test", "red");

      expect(store).toEqual({ tabGroup: [{ id: 1, tabColor: "red", tabGroupName: "test" }], tabGroupLastIndex: "1" });
      await storage.addNewTabGroup("test2", "grey");

      const expcetStorageData = {
        tabGroup: [
          { id: 1, tabColor: "red", tabGroupName: "test" },
          { id: 2, tabColor: "grey", tabGroupName: "test2" },
        ],
        tabGroupLastIndex: "2",
      };
      expect(store).toEqual(expcetStorageData);
    });
  });
});
