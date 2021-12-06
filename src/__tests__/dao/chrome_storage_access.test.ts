import { chrome } from "jest-chrome";
import ChromeStorageAccess from "../../dao/chrome_storage_access";
import { AssertIsDefinedError } from "../../utils/validations";

let store = {} as any;
const storage = new ChromeStorageAccess();

const mockGetSync = chrome.storage.sync.get;
const mockSetSync = chrome.storage.sync.set;

const mockGet = (objToGet: any, callback: any) => {
  let defaultValue: any;
  switch (String(Object)) {
    case "tabGroupLastIndex":
      defaultValue = NaN;
    case "tabGroup":
      defaultValue = [];
  }

  let res =
    store[objToGet] === undefined
      ? { [objToGet]: defaultValue }
      : { [objToGet]: store[objToGet] };

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
  describe("正常系", () => {
    describe("addNewGroup", () => {
      test("addNewTabGroup関数を呼ぶと、storageに何もない場合、新しくデータが作成されること", async () => {
        await storage.addNewTabGroup("test", "red");

        const expcetStorageData = {
          tabGroup: [
            { id: 1, tabColor: "red", tabGroupName: "test", urls: [] },
          ],
          tabGroupLastIndex: "1",
        };
        expect(store).toEqual(expcetStorageData);
      });

      test("addNewTabGroup関数を呼ぶと、既にstorageにデータがある場合、新しくデータが作成されること", async () => {
        await storage.addNewTabGroup("test", "red");

        expect(store).toEqual({
          tabGroup: [
            { id: 1, tabColor: "red", tabGroupName: "test", urls: [] },
          ],
          tabGroupLastIndex: "1",
        });
        await storage.addNewTabGroup("test2", "grey");

        const expcetStorageData = {
          tabGroup: [
            { id: 1, tabColor: "red", tabGroupName: "test", urls: [] },
            { id: 2, tabColor: "grey", tabGroupName: "test2", urls: [] },
          ],
          tabGroupLastIndex: "2",
        };
        expect(store).toEqual(expcetStorageData);
      });
    });
    describe("addUrlToTabGroup", () => {
      test("既存のTabGroupにurlを１つ追加できる", async () => {
        await storage.addNewTabGroup("test", "red");
        await storage.addUrlToTabGroup("https://google.com", 1);

        expect(store).toEqual({
          tabGroup: [
            {
              id: 1,
              tabColor: "red",
              tabGroupName: "test",
              urls: ["https://google.com"],
            },
          ],
          tabGroupLastIndex: "1",
        });
      });

      test("既存のTabGroupにurlを5つ追加できる", async () => {
        await storage.addNewTabGroup("test", "red");
        await storage.addUrlToTabGroup("https://google.com", 1);
        await storage.addUrlToTabGroup("https://google.com", 1);
        await storage.addUrlToTabGroup("https://google.com", 1);
        await storage.addUrlToTabGroup("https://google.com", 1);
        await storage.addUrlToTabGroup("https://google.com", 1);

        expect(store).toEqual({
          tabGroup: [
            {
              id: 1,
              tabColor: "red",
              tabGroupName: "test",
              urls: [
                "https://google.com",
                "https://google.com",
                "https://google.com",
                "https://google.com",
                "https://google.com",
              ],
            },
          ],
          tabGroupLastIndex: "1",
        });
      });
    });

    describe("deleteTabGroop", () => {
      test("既存のタブグループが2つ入っている状態で１つ削除ができる", async () => {
        await storage.addNewTabGroup("test", "red");
        await storage.addNewTabGroup("test2", "blue");

        expect(store).toEqual({
          tabGroup: [
            { id: 1, tabColor: "red", tabGroupName: "test", urls: [] },
            { id: 2, tabColor: "blue", tabGroupName: "test2", urls: [] },
          ],
          tabGroupLastIndex: "2",
        });

        await storage.deleteTabGroup(["test"]);
        expect(store).toEqual({
          tabGroup: [
            { id: 2, tabColor: "blue", tabGroupName: "test2", urls: [] },
          ],
          tabGroupLastIndex: "2",
        });
      });

      test("既存のタブグループがない状態で削除が走っても何も起こらない", async () => {
        await storage.deleteTabGroup(["test"]);
        expect(store).toEqual({
          tabGroup: [],
        });
      });

      test("既存のタブグループ3つある状態で２つ削除ができる", async () => {
        await storage.addNewTabGroup("test", "red");
        await storage.addNewTabGroup("test2", "blue");
        await storage.addNewTabGroup("test3", "grey");

        await storage.deleteTabGroup(["test", "test3"]);
        expect(store).toEqual({
          tabGroup: [
            { id: 2, tabColor: "blue", tabGroupName: "test2", urls: [] },
          ],
          tabGroupLastIndex: "3",
        });
      });
    });
  });

  describe("準正常系", () => {
    describe("addNewTabGroup", () => {
      test("addNewTabGroup関数を呼ぶと、既に同じ名前のTabGroupがあると、新しいデータは作成されないこと", async () => {
        await storage.addNewTabGroup("test", "red");

        expect(store).toEqual({
          tabGroup: [
            { id: 1, tabColor: "red", tabGroupName: "test", urls: [] },
          ],
          tabGroupLastIndex: "1",
        });
        await storage.addNewTabGroup("test", "grey");

        const expcetStorageData = {
          tabGroup: [
            { id: 1, tabColor: "red", tabGroupName: "test", urls: [] },
          ],
          tabGroupLastIndex: "1",
        };
        expect(store).toEqual(expcetStorageData);
      });

      test("既存のタブグループ4つある状態で存在しないタブ名が来ても削除されない", async () => {
        await storage.addNewTabGroup("test", "red");
        await storage.addNewTabGroup("test2", "blue");
        await storage.addNewTabGroup("test3", "grey");
        await storage.addNewTabGroup("test4", "cyan");

        await storage.deleteTabGroup(["test5", "test6"]);
        expect(store).toEqual({
          tabGroup: [
            { id: 1, tabColor: "red", tabGroupName: "test", urls: [] },
            { id: 2, tabColor: "blue", tabGroupName: "test2", urls: [] },
            { id: 3, tabColor: "grey", tabGroupName: "test3", urls: [] },
            { id: 4, tabColor: "cyan", tabGroupName: "test4", urls: [] },
          ],
          tabGroupLastIndex: "4",
        });
      });
    });
  });
  describe("異常系", () => {
    describe("addUrlToTabGroup", () => {
      test("引数のTabIdでfindしても見つからない場合は、AssertIsDefinedErrorが返される", async () => {
        await storage.addNewTabGroup("test", "red");

        expect(async () => {
          await storage.addUrlToTabGroup("https://google.com", 2);
        }).rejects.toThrow("不明なエラー");

        expect(async () => {
          await storage.addUrlToTabGroup("https://google.com", 2);
        }).rejects.toThrow(AssertIsDefinedError);
      });
    });
  });
});
