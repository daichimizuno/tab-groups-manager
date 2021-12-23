import React, { useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import OpenedTabView from "./opened_tabs_view";
import { getAllInWindow } from "../../../utils/chrome_tab_utils/chrome_tab_background_worker";

const PopupTabView = () => {
  const [tabContextValue, setTabContextValue] = useState("1");
  const [openedTabs, setOpenedTabs] = useState<chrome.tabs.Tab[]>([]);

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
            <button onClick={() => chrome.runtime.openOptionsPage()}>
              setting page
            </button>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default PopupTabView;
