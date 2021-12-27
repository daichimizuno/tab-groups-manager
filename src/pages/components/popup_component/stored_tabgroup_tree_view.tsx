import { Label } from "@mui/icons-material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
import * as React from "react";
import { useEffect, useState } from "react";
import ChromeStorageAccess, {
  TabGroup,
} from "../../../dao/chrome_storage_access";

const StoredTabGroupTreeView = () => {
  const [tabGroups, setTabGroups] = useState<TabGroup[]>([]);
  const chromeStorageAccess = new ChromeStorageAccess();
  let nodeId: number = 0;

  const getTabGroups = async () => {
    const tabGroupsFromStorage = await chromeStorageAccess.getAllTabGroup();
    if (tabGroupsFromStorage !== undefined) {
      setTabGroups(tabGroupsFromStorage);
    }
  };

  useEffect(() => {
    getTabGroups();
  }, []);

  return (
    <>
      {tabGroups.length !== 0 ? (
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: 400, flexGrow: 1, overflowY: "auto" }}
        >
          {tabGroups.map((tabGroup: TabGroup) => {
            nodeId = nodeId + 1;
            return (
              <TreeItem
                key={nodeId}
                nodeId={nodeId.toString()}
                label={tabGroup.tabGroupName}
              >
                {tabGroup.urls.map((url) => {
                  nodeId = nodeId + 1;
                  return (
                    <TreeItem
                      key={nodeId}
                      nodeId={nodeId.toString()}
                      label={url}
                    ></TreeItem>
                  );
                })}
              </TreeItem>
            );
          })}
        </TreeView>
      ) : (
        <h3>まだタブグループが作成されていません</h3>
      )}
    </>
  );
};

export default StoredTabGroupTreeView;
