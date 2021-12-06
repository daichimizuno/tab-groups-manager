import Box from "@mui/system/Box";
import React, { useEffect, useState } from "react";
import ChromeStorageAccess, {
  Color,
  TabGroup,
} from "../dao/chrome_storage_access";
import ChromeTabAccess from "../utils/chrome_tab_utils/chrome_tab";
import CreateResultAlert from "./components/alerts/create_result_alert";
import CreateTabGroupComponent from "./components/create_tab_group";
import CreateTabUrlComponent from "./components/create_tab_url";
import TabGroupComponent from "./components/tab_group";

export const chromeStorageStatus = ["Success", "Failed", "Nothing"] as const;
type ChromeStorageStatus =
  typeof chromeStorageStatus[keyof typeof chromeStorageStatus];

const Options: React.FC = () => {
  const chromeStorageAccess = new ChromeStorageAccess();
  const chromeTabAccess = new ChromeTabAccess();

  const [successAddNewTabGroup, setSuccessAddNewTabGroup] =
    useState<ChromeStorageStatus>("Nothing");

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
    const success = await chromeStorageAccess.addNewTabGroup(
      groupName,
      groupColor
    );
    if (success) {
      setSuccessAddNewTabGroup("Success");
    } else {
      setSuccessAddNewTabGroup("Failed");
    }
    syncTabGroup();
  };

  const createUrl = async (url: string, groupNumber: number) => {
    await chromeStorageAccess.addUrlToTabGroup(url, groupNumber);
    syncTabGroup();
    deleteAnotherAlert();
  };

  const getTabGroupData = async () => {
    let returnTabGroup = await chromeStorageAccess.getAllTabGroup();
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

  // 他のアラートは全て非表示にする
  const deleteAnotherAlert = () => {
    setSuccessAddNewTabGroup("Nothing");
  };

  const deleteTabGroup = async (tabNames: string[]) => {
    await chromeStorageAccess.deleteTabGroup(tabNames);
    syncTabGroup();
  };

  return (
    <>
      <Box m={2} pt={3}>
        <CreateTabGroupComponent
          createTab={(groupName: string, groupColor: Color) =>
            createTabGroup(groupName, groupColor)
          }
        />

        {/* 成功か失敗のアラートは画面が崩れるので後で対応 */}
        {/* {successAddNewTabGroup === "Success" ? (
          <CreateResultAlert
            success={true}
            description="タブグループを作成しました！"
          ></CreateResultAlert>
        ) : successAddNewTabGroup === "Failed" ? (
          <CreateResultAlert
            success={false}
            description="タブグループの作成に失敗しました（既に同じ名前のタブグループが作成されています)"
          ></CreateResultAlert>
        ) : (
          <></>
        )} */}

        <CreateTabUrlComponent
          haveTabGroup={haveTabGroup()}
          tabGroup={tabGroup}
          createUrl={(url: string, groupNumber: number) =>
            createUrl(url, groupNumber)
          }
        />

        {haveTabGroup() ? (
          <TabGroupComponent
            tabGroup={tabGroup}
            deleteTabGroup={(tabNames: string[]) => deleteTabGroup(tabNames)}
          />
        ) : (
          <div></div>
        )}
      </Box>
    </>
  );
};

export default Options;
