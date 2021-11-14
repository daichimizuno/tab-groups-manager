import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ChromeStorageAccess, {
  Color,
  TabGroup,
} from "../dao/chrome_storage_access";
import { CreateTabGroupComponent } from "../components/create_tab_group";
import { CreateTabUrlComponent } from "../components/create_tab_urls";
import { TabGroupComponent } from "../components/tab_group";
const Options: React.FC = () => {
  const chromeStorage = new ChromeStorageAccess();

  // DB上のタブグループを保存するための変数
  const [tabGroup, setTabGroup] = useState<TabGroup[]>();

  // DB上のTabGroupデータにView側のリストを依存させる
  useEffect(() => {
    getTabGroupData();
  }, [tabGroup]);

  // DBとのTabGroupデータを同期させる
  const syncTabGroup = () => {
    console.log("#syncTabGroup");
    getTabGroupData();
  };

  const getTabGroupData = async () => {
    let returnTabGroup = await chromeStorage.getAllTabGroup();
    if (JSON.stringify(tabGroup) !== JSON.stringify(returnTabGroup)) {
      setTabGroup(returnTabGroup);
    }
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
      <CreateTabGroupComponent createTab={() => syncTabGroup()} />
      <CreateTabUrlComponent
        tabGroup={tabGroup}
        createUrl={() => syncTabGroup()}
      />

      {_haveTabGroup() ? (
        <TabGroupComponent tabGroup={tabGroup}> /</TabGroupComponent>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Options;
