import { Typography } from "@mui/material";
import React from "react";
import { TabGroup } from "../../../dao/chrome_storage_access";
import TabGroupTable from "./tab_group_table";

type Props = {
  tabGroup: TabGroup[] | undefined
  deleteTabGroup: (name:string[]) => void
  changedTabGroup: () => void
}

const TabGroupComponent = (props: Props) => {
  const tabGroup = props.tabGroup as TabGroup[];
  const deleteTabGroup = props.deleteTabGroup;
  const changedTabGroup = props.changedTabGroup;

  return (
    <>
      <Typography component={"span"} data-testid="title">
        <h3>登録されたタブグループ</h3>
      </Typography>

      <TabGroupTable
        tabGroup={tabGroup}
        deleteTabGroup={(tabNames: string[]) => deleteTabGroup(tabNames)}
        changedTabGroup={changedTabGroup}
      />
    </>
  );
};

export default TabGroupComponent;
