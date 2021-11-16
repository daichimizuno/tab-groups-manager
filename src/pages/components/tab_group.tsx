import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React from "react";
import { TabGroup } from "../../dao/chrome_storage_access";
import ExpandMore from "@mui/icons-material/ExpandMore";
import TabGroupTable from "./tab_group_table";

const TabGroupComponent = (props: any) => {
  const tabGroup = props.tabGroup as TabGroup[];

  return (
    <>
      <Typography data-testid="title" mb={4} mt={4}>
        登録されたタブグループ
      </Typography>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>リスト1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TabGroupTable tabGroup={tabGroup} />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default TabGroupComponent;
