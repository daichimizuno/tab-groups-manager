import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ChromeStorageAccess, { TabGroup } from "../dao/chrome_storage_access";
import { getAllInWindow } from "../utils/chrome_tab_utils/chrome_tab_background_worker";
import ChromeTabSendMessage from "../utils/chrome_tab_utils/chrome_tab_send_message";
import PopupTabView from "./components/popup_tabview";

const Popup = () => {
  const chromeStorage = new ChromeStorageAccess();
  const chromeTabAccess = new ChromeTabSendMessage();

  // DB上のタブグループを保存するための変数
  const [tabGroup, setTabGroup] = useState<TabGroup[]>();

  useEffect(() => {
    getTabGroupData();
  }, [tabGroup]);

  const getTabGroupData = async () => {
    let returnTabGroup = await chromeStorage.getAllTabGroup();
    if (JSON.stringify(tabGroup) !== JSON.stringify(returnTabGroup)) {
      setTabGroup(returnTabGroup);
    }
  };

  const openTabs = () => {
    if (tabGroup !== undefined && tabGroup.length > 0) {
      chromeTabAccess.createTabGroup(tabGroup);
    }
  };

  return (
    <>
      <button onClick={openTabs}>open TabGroup</button>
      <PopupTabView />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
