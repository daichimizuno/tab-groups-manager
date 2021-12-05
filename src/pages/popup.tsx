import React, { useEffect, useState } from "react";
import ChromeTabAccess from "../utils/chrome_tab_utils/chrome_tab";
import ReactDOM from "react-dom";
import ChromeStorageAccess, { TabGroup } from "../dao/chrome_storage_access";
import PopupTabView from "./components/popup_tabview";
import styled from "styled-components";

const Popup = () => {
  const chromeStorage = new ChromeStorageAccess();
  const chromeTabAccess = new ChromeTabAccess();

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
