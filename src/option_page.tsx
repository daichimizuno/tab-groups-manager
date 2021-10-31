import React, { useState } from "react";
import ReactDOM from "react-dom";
import ChromeStorageAccess from "./chrome_storage_access";

const Options: React.FC = () => {
    const chromeStorage = new ChromeStorageAccess()
  
    // タブグループを作成する時の変数
    const [inputGroupName, setInputGroupName] = useState<string>("");
    const [selectedGroupColor, setSelectedTabGroupColor] =
      useState<string>("grey");
  
    // URLをグループに追加するための変数
    const [inputUrl, setInputUrl] = useState<string>("");
    const [selectedUrlGroup, setSelectedUrlGroup] = useState<string>("");
  
    const saveTabGroup = () => {};
    const saveUrlGroup = () => {};
    const _createTabGroupData = () => {
      chromeStorage.addNewGroup(inputGroupName)
    };
    const _createUrlGroupData = () => {};
  
    const _handleTabGroupNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputGroupName(e.target.value);
    };
  
    const _handleTabGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedTabGroupColor(e.target.value);
    };
  
    const _handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputUrl(e.target.value);
    };
  
    const _handleSelectedUrlGroupChange = (
      e: React.ChangeEvent<HTMLSelectElement>
    ) => {
      setSelectedUrlGroup(e.target.value);
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
            onChange={(e) => _handleTabGroupNameChange(e)}
            data-test-id="newTabGroupInput"
          />
          <select onChange={(e) => _handleTabGroupChange(e)}>
            <option value="grey">grey</option>
            <option value="blue">blue</option>
            <option value="red">red</option>
            <option value="yellow">yellow</option>
            <option value="green">green</option>
            <option value="pink">pink</option>
            <option value="purple">purple</option>
            <option value="cyan">cyan</option>
          </select>
          <button onClick={_createTabGroupData}>作成</button>
        </div>
  
        <div className="new-url-to-group">
          <p>URLをグループに追加</p>
          <input
            style={{ width: "300px" }}
            type="text"
            name="url"
            placeholder="URL"
            onChange={(e) => {
              _handleUrlChange(e);
            }}
          />
          <select
            onChange={(e) => {
              _handleSelectedUrlGroupChange(e);
            }}
          >
            <option value="group">group</option>
          </select>
          <button onClick={_createUrlGroupData}>作成</button>
        </div>
      </>
    );
  };
  
  export default Options;