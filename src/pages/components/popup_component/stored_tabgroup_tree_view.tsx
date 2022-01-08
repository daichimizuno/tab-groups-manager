import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
import * as React from "react";
import { useEffect, useState } from "react";
import ChromeStorageAccess, {
  TabGroup,
} from "../../../dao/chrome_storage_access";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import ChromeTabSendMessage from "../../../utils/chrome_tab_utils/chrome_tab_send_message";

const StoredTabGroupTreeView = () => {
  const [tabGroups, setTabGroups] = useState<TabGroup[]>([]);
  const chromeStorageAccess = new ChromeStorageAccess();
  const chromeTabSendMessage = new ChromeTabSendMessage();
  let nodeId: number = 0;

  const getTabGroups = async () => {
    const tabGroupsFromStorage = await chromeStorageAccess.getAllTabGroup();
    if (tabGroupsFromStorage !== undefined) {
      setTabGroups(tabGroupsFromStorage);
    }
  };

  const openTabGroup = (tabGroup: TabGroup) => {
    chromeTabSendMessage.createTabGroupSendMessage(tabGroup);
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
                label={
                  <Stack spacing={2} direction={"row"}>
                    <Box
                      display="flex"
                      width={100}
                      alignItems="center"
                      justifyContent="center"
                    >
                      {tabGroup.tabGroupName}
                    </Box>
                    <IconButton
                      style={{ float: "right", marginRight: 30 }}
                      color="primary"
                      aria-label="delete tab"
                      component="span"
                      onClick={() => openTabGroup(tabGroup)}
                    >
                      <OpenInNewIcon />
                    </IconButton>
                  </Stack>
                }
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
