import ChromeStorageAccess, { TabGroup } from "../chrome_storage_access";

describe("ChromeStorageAccessのテスト", () => {
  describe('addNewGroup', () => {
    test("新しいグループが追加できる関数を呼ぶと、syncUpdateLastIndexとgetAllTabGroupが１度ずつ呼ばれること", async () => {
      const storage = new ChromeStorageAccess();
      const existTabGruop = [{ id: 1, tabGroupName: "test" }] as TabGroup[];
      const newTabGruop = { id: 2, tabGroupName: "test2" } as TabGroup;
      
      const mockSyncUpdateLastIndex = jest.spyOn(storage, "syncUpdateLastIndex");
      const mockGetAllTabGroup = jest.spyOn(storage, "getAllTabGroup");
      
      mockSyncUpdateLastIndex.mockImplementation((): Promise<number> => {
        return new Promise((resolve, reject) => {
          resolve(1);
        });
      });
  
      mockGetAllTabGroup.mockImplementation((): Promise<TabGroup[]> => {
        return new Promise((resolve, reject) => {
          resolve(existTabGruop);
        });
      });
  
      await storage.addNewGroup(newTabGruop["tabGroupName"] as string);
     
      expect(mockSyncUpdateLastIndex).toBeCalledTimes(1);
      expect(mockGetAllTabGroup).toBeCalledTimes(1);
      
    });
  });
});
