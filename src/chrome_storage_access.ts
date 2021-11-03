export interface TabGroup {
  id: number;
  tabGroupName: string;
  tabColor: Color;
}

const Color = {
  Grey: "grey",
  Blue: "blue",
  Red: "red",
  Yellow: "yellow",
  Green: "green",
  Pink: "pink",
  Purple: "purple",
  Cyan: "cyan",
} as const;
export type Color = typeof Color[keyof typeof Color];

export default class ChromeStorageAccess {
  addNewTabGroup = async (tabName: string, tabColor: Color) => {
    const tabGroupLastIndex = ((await this.syncUpdateLastIndex()) as number) || 1;
    const tabGroupData = ((await this.getAllTabGroup()) as TabGroup[]) || [];

    const newTabGroup = {
      id: tabGroupLastIndex,
      tabGroupName: tabName,
      tabColor: tabColor,
    } as TabGroup;

    tabGroupData.push(newTabGroup);

    await chrome.storage.sync.set({ tabGroup: tabGroupData }, async () => {
      console.log(`new tab group is set, name:${tabName}`);
    });
  };

  syncUpdateLastIndex = async (): Promise<number> => {
    let index = await this.getTabGroupLastIndex();
    if (isNaN(index)) {
      index = 1;
    } else {
      index = index + 1;
    }

    await this.setTabGroupLastIndex(index.toString());
    return index;
  };

  getTabGroupLastIndex = (): Promise<number> => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(["tabGroupLastIndex"], (value) => {
        if (chrome.runtime.lastError) {
          throw chrome.runtime.lastError;
        }

        const index = value.tabGroupLastIndex === undefined ? NaN : Number(value.tabGroupLastIndex);
        resolve(index);
      });
    });
  };

  setTabGroupLastIndex = (newIndex: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set({ tabGroupLastIndex: newIndex }, () => {
        if (chrome.runtime.lastError) {
          throw chrome.runtime.lastError;
        }

        resolve();
      });
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
}
