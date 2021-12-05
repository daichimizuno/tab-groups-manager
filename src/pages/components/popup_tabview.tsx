import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Tabs } from "@mui/material";
import SwipeableViews from "react-swipeable-views";

const PopupTabView = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  const openOptionPage = () => {
    chrome.runtime.openOptionsPage(() => {
      console.log("option page is created");
    });
  };

  return (
    <>
      <Box sx={{ width: "400px", typography: "body1" }}>
        <TabContext value={value}>
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
          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">
            <button onClick={openOptionPage}>setting page</button>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default PopupTabView;
