import { TabGroup } from "../../dao/chrome_storage_access";

export default class ChromeTabAccess {
  createTabGroup = (tabGroup: TabGroup[]) => {
    chrome.runtime.sendMessage(tabGroup);
  };
}
