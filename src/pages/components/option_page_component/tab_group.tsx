import { Typography } from "@mui/material";
import React from "react";
import { TabGroup } from "../../../dao/chrome_storage_access";
import TabGroupTable from "./tab_group_table";

const TabGroupComponent = (props: any) => {
  const tabGroup = props.tabGroup as TabGroup[];
  const deleteTabGroup = props.deleteTabGroup;

  return (
    <>
      <Typography data-testid="title" mb={4} mt={4}>
        登録されたタブグループ
      </Typography>

      <TabGroupTable
        tabGroup={tabGroup}
        deleteTabGroup={(tabNames: string[]) => deleteTabGroup(tabNames)}
      />
    </>
  );
};

export default TabGroupComponent;