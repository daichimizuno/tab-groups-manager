import React, { useEffect, useState } from "react";
import ChromeStorageAccess, {
  Color,
  TabGroup,
} from "../../dao/chrome_storage_access";

export const CreateTabGroupComponent = (props: any) => {
  const chromeStorage = new ChromeStorageAccess();

  // タブグループを作成する時の変数
  const [inputGroupName, setInputGroupName] = useState<string>("");
  const [selectedGroupColor, setSelectedTabGroupColor] =
    useState<string>("grey");

  const _createTabGroupData = async () => {
    if (inputGroupName.length > 0 && selectedGroupColor.length > 0) {
      setInputGroupName("");
      await chromeStorage.addNewTabGroup(
        inputGroupName,
        selectedGroupColor as Color
      );
    }

    props.createTab();
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
    </>
  );
};
