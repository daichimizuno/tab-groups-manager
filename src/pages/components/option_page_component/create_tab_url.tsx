import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { TabGroup } from "../../../dao/chrome_storage_access";

const CreateTabUrlComponent = (props: any) => {
  const tabGroup = props.tabGroup as TabGroup[];
  const haveTabGroup = props.haveTabGroup as boolean;

  const [inputUrl, setInputUrl] = useState<string>("");
  const [selectedTabGroup, setSelectedTabGroup] = useState<string>(
    haveTabGroup ? tabGroup[0].tabGroupName : ""
  );

  const _createUrlGroupData = () => {
    if (inputUrl.length > 0) {
      const tabId = _indexTabGroupId(selectedTabGroup);
      if (tabId !== -1) {
        props.createUrl(inputUrl, tabId);
        setInputUrl("");
      }
    }
  };

  const _indexTabGroupId = (name: string): number => {
    let tabId = -1;
    tabGroup.map((tab) => {
      if (tab.tabGroupName === name) {
        tabId = tab.id;
      }
    });

    return tabId;
  };

  return (
    <>
      <Typography component={"span"} data-testid="title">
        <h3>URLをグループに追加</h3>
      </Typography>
      <Stack direction="row" spacing={5}>
        <TextField
          id="url"
          type="text"
          name="url"
          value={inputUrl}
          label="URL"
          variant="outlined"
          onChange={(e) => setInputUrl(e.target.value)}
        />
        {haveTabGroup ? (
          <FormControl sx={{ width: 200 }}>
            <InputLabel id="simple-select-label">グループ名</InputLabel>

            <Select
              labelId="simple-select-label"
              value={selectedTabGroup}
              label="グループ名"
              onChange={(e) => setSelectedTabGroup(e.target.value)}
              data-testid="groupSelect"
            >
              {tabGroup.map((tab: TabGroup) => {
                let tabName = tab.tabGroupName;
                return (
                  <MenuItem value={tabName} key={tabName}>
                    {tabName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        ) : (
          <div style={{ textAlign: "center" }}>
            グループが作成されていません
          </div>
        )}

        <Button
          data-testid="createTabGroupButton"
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={_createUrlGroupData}
        >
          作成
        </Button>
      </Stack>
    </>
  );
};

export default CreateTabUrlComponent;
