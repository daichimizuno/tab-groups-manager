export default class ChromeStorageAccess {

  getAllTabGroup = (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(["tabGroup"], (value) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        }

        resolve(value.tabGroup as string[]);
      });
    });
  };

  addNewGroup = async (tabName: string) => {
    const tabGroupData = (await this.getAllTabGroup()) as string[] || [];
    console.log(`tab group data: ${JSON.stringify(tabGroupData)}`);

    // 既存のタブグループに新しいタブグループを追加
    tabGroupData.push(tabName)

    chrome.storage.sync.set({ "tabGroup": tabGroupData }, async () => {
      console.log(`new tab group is set, name:${tabName}`);
    });
  };
}
