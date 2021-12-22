import { TabGroup } from "../../dao/chrome_storage_access";

export default class ChromeTabSendMessage {
  createTabGroup = (tabGroup: TabGroup[]) => {
    chrome.runtime.sendMessage(tabGroup);
  };
}
