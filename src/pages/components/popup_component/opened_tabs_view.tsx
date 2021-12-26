import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import ChromeStorageAccess, {
  TabGroup,
} from "../../../dao/chrome_storage_access";
import AddUrlInTabGroup from "./add_url_in_tab_group";

const OpenedTabView = (props: any) => {
  const chromeStorageAccess = new ChromeStorageAccess();

  const openedTabs = props.openedTabs as chrome.tabs.Tab[];
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [tabGroup, setTabGroup] = useState<TabGroup[]>([]);

  const addUrlInTabGroup = async (tabId: number) => {
    await chromeStorageAccess.addUrlToTabGroup(url, tabId);
    handleModalClose();
  };

  const getTabGroups = async () => {
    setTabGroup(await chromeStorageAccess.getAllTabGroup());
  };

  useEffect(() => {
    getTabGroups();
  }, []);

  const handleModalOpen = (
    title: string | undefined,
    url: string | undefined
  ) => {
    if (title !== undefined && url !== undefined) {
      setTitle(title);
      setUrl(url);
    }
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {openedTabs.map((openedTab: chrome.tabs.Tab, index: number) => (
          <div key={openedTab.id}>
            <ListItem
              key={index}
              disableGutters
              secondaryAction={
                <IconButton
                  onClick={() =>
                    handleModalOpen(openedTab.title, openedTab.url)
                  }
                >
                  <AddCircleIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={`${openedTab.title}`}
                data-testid={openedTab.title}
              />
            </ListItem>
            <Divider style={{ background: "purple" }} />
          </div>
        ))}
      </List>
      {modalOpen ? (
        <AddUrlInTabGroup
          title={title}
          tabGroup={tabGroup}
          handleClose={handleModalClose}
          addUrlInTabGroup={(tabId: number) => addUrlInTabGroup(tabId)}
        />
      ) : (
        <div></div>
      )}
    </>
  );
};

export default OpenedTabView;
