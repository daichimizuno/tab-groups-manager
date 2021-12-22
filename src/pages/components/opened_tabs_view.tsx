import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, { useState } from "react";

const OpenedTabView = (props: any) => {
  const openedTabs = props.openedTabs as chrome.tabs.Tab[];
  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {openedTabs.map((openedTab: chrome.tabs.Tab, index: number) => (
          <div>
            <ListItem
              key={index}
              disableGutters
              secondaryAction={
                <IconButton>
                  <AddCircleIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={`${openedTab.title}`}
                data-testid={openedTab.title}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </>
  );
};

export default OpenedTabView;
