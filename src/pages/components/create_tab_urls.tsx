import React, { useEffect, useState } from "react";
import ChromeStorageAccess, {
  Color,
  TabGroup,
} from "../../dao/chrome_storage_access";

export const CreateTabUrlComponent = (props: any) => {
  const chromeStorage = new ChromeStorageAccess();
  const tabGroup = props.tabGroup;

  const [inputUrl, setInputUrl] = useState<string>("");
  const [selectedTabGroupNumber, setSelectedTabGroupNumber] =
    useState<number>(1);

  const _createUrlGroupData = async () => {
    await chromeStorage.addUrlToTabGroup(inputUrl, selectedTabGroupNumber);

    props.createUrl();
  };

  return (
    <>
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
          {tabGroup?.map((tab: TabGroup) => {
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
    </>
  );
};
