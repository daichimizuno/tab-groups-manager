export interface TabGroup {
  id: number;
  tabGroupName: string;
}

export default class ChromeStorageAccess {
  
  syncUpdateLastIndex = (): Promise<number> => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(["tabGroupLastIndex"], async (value) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        }
        let index = Number(value.tabGroupLastIndex);
        console.log(`default value is ${index}`);
        if (isNaN(index)) {
          index = 1;
        } else {
          index = index + 1;
        }

        await this.setTabGroupLastIndex(index.toString());
        resolve(index as number);
      });
    });
  };

  setTabGroupLastIndex = (newIndex: string) => {
    console.log("setTabGroupLastIndex is called");
    chrome.storage.sync.set({ tabGroupLastIndex: newIndex }, () => {
      if (chrome.runtime.lastError) {
        console.log(`set tab group last index function is runtime error`);
      } else {
        console.log(`new index is set`);
      }
    });
  };

  getAllTabGroup = (): Promise<TabGroup[]> => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(["tabGroup"], (value) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        }

        resolve(value.tabGroup as TabGroup[]);
      });
    });
  };

  addNewGroup = async (tabName: string) => {
    const tabGroupLastIndex =
      ((await this.syncUpdateLastIndex()) as number) || 1;
    const tabGroupData = ((await this.getAllTabGroup()) as TabGroup[]) || [];

    const newTabGroup = {
      id: tabGroupLastIndex,
      tabGroupName: tabName,
    } as TabGroup;

    tabGroupData.push(newTabGroup);

    chrome.storage.sync.set({ tabGroup: tabGroupData }, async () => {
      console.log(`new tab group is set, name:${tabName}`);
    });
  };
}
