import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button, Container, Fab, Stack, styled } from "@mui/material";
import Box from "@mui/material/Box";
import { purple } from "@mui/material/colors";
import Tab from "@mui/material/Tab";
import React, { useEffect, useState } from "react";
import { TabGroup } from "../../../dao/chrome_storage_access";
import { getAllInWindow } from "../../../utils/chrome_tab_utils/chrome_tab_background_worker";
import ChromeTabSendMessage from "../../../utils/chrome_tab_utils/chrome_tab_send_message";
import OpenedTabView from "./opened_tabs_view";
import StoredTabGroupTreeView from "./stored_tabgroup_tree_view";

type PopupTabViewProps = {
  tabGroups: TabGroup[] | undefined;
};

const SettingPageButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
  borderRadius: "5em",
  margin: 5,
}));

const PopupTabView = ({ tabGroups }: PopupTabViewProps) => {
  const [tabContextValue, setTabContextValue] = useState("1");
  const [openedTabs, setOpenedTabs] = useState<chrome.tabs.Tab[]>([]);
  const chromeTabSendMessage = new ChromeTabSendMessage();

  useEffect(() => {
    getTabs();
  }, [openedTabs]);

  const getTabs = async () => {
    const tabs = await getAllInWindow();
    setOpenedTabs(tabs);
  };

  const handleChange = (event: any, newValue: string) => {
    setTabContextValue(newValue);
  };

  const openTabGroups = () => {
    console.log(JSON.stringify(tabGroups));
    if (tabGroups !== undefined && tabGroups.length > 0) {
      chromeTabSendMessage.createTabGroupsSendMessage(tabGroups);
    }
  };

  return (
    <>
      <Box sx={{ width: "600px", minHeight: "300px", typography: "body1" }}>
        <TabContext value={tabContextValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="tab-list"
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="inherit"
              data-testid="tab-list"
            >
              <Tab label="開いているタブ" value="1" />
              <Tab label="保存されている設定" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {openedTabs.length > 0 ? (
              <OpenedTabView openedTabs={openedTabs} />
            ) : (
              <></>
            )}
          </TabPanel>
          <TabPanel value="2">
            <Stack spacing={3}>
              <Fab variant="extended" onClick={() => openTabGroups()}>
                <OpenInNewIcon sx={{ mr: 1 }} />
                全て開く
              </Fab>
              <StoredTabGroupTreeView />
            </Stack>
            <SettingPageButton
              fullWidth={true}
              variant="contained"
              endIcon={<ArrowRightIcon />}
              onClick={() => chrome.runtime.openOptionsPage()}
            >
              設定画面へ
            </SettingPageButton>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default PopupTabView;
