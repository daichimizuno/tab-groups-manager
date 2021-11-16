import React, { useEffect, useState } from "react";
import ChromeStorageAccess, {
  Color,
  TabGroup,
} from "../dao/chrome_storage_access";
import CreateTabGroupComponent from "./components/create_tab_group";
import CreateTabUrlComponent from "./components/create_tab_url";
import TabGroupComponent from "./components/tab_group";
import Box from "@mui/system/Box";
import ChromeTabAccess from "../utils/chrome_tab_utils/chrome_tab";

const Options: React.FC = () => {
  const chromeStorage = new ChromeStorageAccess();
  const chromeTabAccess = new ChromeTabAccess();

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

  const createTabGroup = async (groupName: string, groupColor: Color) => {
    await chromeStorage.addNewTabGroup(groupName, groupColor);
    syncTabGroup();
  };

  const createUrl = async (url: string, groupNumber: number) => {
    await chromeStorage.addUrlToTabGroup(url, groupNumber);
    syncTabGroup();
  };

  const getTabGroupData = async () => {
    let returnTabGroup = await chromeStorage.getAllTabGroup();
    if (JSON.stringify(tabGroup) !== JSON.stringify(returnTabGroup)) {
      setTabGroup(returnTabGroup);
    }
  };

  const haveTabGroup = (): boolean => {
    if (tabGroup !== undefined && tabGroup.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <Box m={2} pt={3}>
        <CreateTabGroupComponent
          createTab={(groupName: string, groupColor: Color) =>
            createTabGroup(groupName, groupColor)
          }
        />

        <CreateTabUrlComponent
          haveTabGroup={haveTabGroup()}
          tabGroup={tabGroup}
          createUrl={(url: string, groupNumber: number) =>
            createUrl(url, groupNumber)
          }
        />

        {haveTabGroup() ? (
          <TabGroupComponent tabGroup={tabGroup}> /</TabGroupComponent>
        ) : (
          <div></div>
        )}
      </Box>
    </>
  );
};

export default Options;
