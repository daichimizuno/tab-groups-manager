import { ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ChromeStorageAccess, { TabGroup } from "../dao/chrome_storage_access";
import ChromeTabSendMessage from "../utils/chrome_tab_utils/chrome_tab_send_message";
import PopupTabView from "./components/popup_component/popup_tabview";
import { theme } from "./theme";

const Popup = () => {
  const chromeStorage = new ChromeStorageAccess();
  const chromeTabAccess = new ChromeTabSendMessage();

  // DB上のタブグループを保存するための変数
  const [tabGroups, setTabGroups] = useState<TabGroup[]>([]);

  useEffect(() => {
    getTabGroupData();
  }, []);

  const getTabGroupData = async () => {
    let returnTabGroup = await chromeStorage.getAllTabGroup();
    setTabGroups(returnTabGroup);
  };

  const openTabs = () => {
    chrome.runtime.sendMessage(tabGroups);
    // chromeTabAccess.createTabGroupsSendMessage(tabGroups);
  };

  return (
    <>
      <PopupTabView tabGroups={tabGroups} />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Popup />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
