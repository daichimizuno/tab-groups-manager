import { Color, TabGroup } from "../../dao/chrome_storage_access";

chrome.runtime.onMessage.addListener((tabGroup: TabGroup[]) => {
  console.log(`message request: ${JSON.stringify(tabGroup)}`);
  tabGroup.forEach((tab) => {
    openTab(tab.tabColor, tab.tabGroupName, tab.urls);
  });
  return Promise.resolve();
});

const openTab = (color: Color, title: string, urls: string[]) => {
  // groupIdを取得するために、１つ目のurlだけopenさせる
  chrome.tabs.create({ url: urls[0] }, (tab) => {
    chrome.tabs.group({ tabIds: tab.id }, (gid: number) => {
      chrome.tabGroups.update(
        gid,
        { color: color, title: title },
        (group) => {}
      );

      // 残りのurlを取得したopenして、groupIdに紐付けさせる
      // グループの色、タイトルはupdateで完了しているので、ここでは行わない
      urls.forEach((url, index) => {
        if (index !== 0) {
          chrome.tabs.create({ url: url }, (tab) => {
            chrome.tabs.group(
              { tabIds: tab.id, groupId: gid },
              (gid: number) => {}
            );
          });
        }
      });
    });
  });
};