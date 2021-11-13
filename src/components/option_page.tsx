import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ChromeStorageAccess, { Color, TabGroup } from "../chrome_storage_access";
import { TabGroupComponent } from "./tab_group";
const Options: React.FC = () => {
  const chromeStorage = new ChromeStorageAccess();

  // DB上のタブグループを保存するための変数
  const [tabGroup, setTabGroup] = useState<TabGroup[]>();

  // タブグループを作成する時の変数
  const [inputGroupName, setInputGroupName] = useState<string>("");
  const [selectedGroupColor, setSelectedTabGroupColor] =
    useState<string>("grey");

  // URLをグループに追加するための変数
  const [inputUrl, setInputUrl] = useState<string>("");
  const [selectedTabGroupNumber, setSelectedTabGroupNumber] =
    useState<number>(1);

  // DB上のTabGroupデータにView側のリストを依存させる
  useEffect(() => {
    getTabGroupData();
  }, [tabGroup]);

  // useEffectのためにDBとのTabGroupデータを動悸させる
  const syncTabGroup = () => {
    getTabGroupData();
  };

  const getTabGroupData = async () => {
    let returnTabGroup = await chromeStorage.getAllTabGroup();
    if (JSON.stringify(tabGroup) !== JSON.stringify(returnTabGroup)) {
      setTabGroup(returnTabGroup);
    }
  };

  const _createTabGroupData = async () => {
    if (inputGroupName.length > 0 && selectedGroupColor.length > 0) {
      setInputGroupName("");
      await chromeStorage.addNewTabGroup(
        inputGroupName,
        selectedGroupColor as Color
      );
    }

    syncTabGroup();
  };
  const _createUrlGroupData = async () => {
    await chromeStorage.addUrlToTabGroup(inputUrl, selectedTabGroupNumber);

    syncTabGroup();
  };

  const _haveTabGroup = (): boolean => {
    if (tabGroup !== undefined && tabGroup.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="new-tab-group">
        <p>新しいタブグループを作成</p>
        <input
          type="text"
          name="tabName"
          value={inputGroupName}
          placeholder="グループ名"
          onChange={(e) => setInputGroupName(e.target.value)}
        />
        <select onChange={(e) => setSelectedTabGroupColor(e.target.value)}>
          <option value="grey">grey</option>
          <option value="blue">blue</option>
          <option value="red">red</option>
          <option value="yellow">yellow</option>
          <option value="green">green</option>
          <option value="pink">pink</option>
          <option value="purple">purple</option>
          <option value="cyan">cyan</option>
        </select>
        <button
          data-testid="createTabGroupButton"
          onClick={_createTabGroupData}
        >
          作成
        </button>
      </div>

      <div className="new-url-to-group">
        <p>URLをグループに追加</p>
        <input
          style={{ width: "300px" }}
          type="text"
          name="url"
          placeholder="URL"
          onChange={(e) => {
            setInputUrl(e.target.value);
          }}
        />
        <select
          onChange={(e) => {
            setSelectedTabGroupNumber(Number(e.target.value));
          }}
        >
          {tabGroup?.map((tab) => {
            let tabId = tab.id;
            let tabName = tab.tabGroupName;
            return (
              <option value={tabId} key={tabId}>
                {tabName}
              </option>
            );
          })}
        </select>
        <button onClick={_createUrlGroupData}>作成</button>
      </div>

      {_haveTabGroup() ? (
        <TabGroupComponent tabGroup={tabGroup}> /</TabGroupComponent>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Options;
