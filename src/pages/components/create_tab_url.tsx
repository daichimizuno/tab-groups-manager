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
import { TabGroup } from "../../dao/chrome_storage_access";

const CreateTabUrlComponent = (props: any) => {
  const tabGroup = props.tabGroup as TabGroup[];
  const haveTabGroup = props.haveTabGroup as boolean;

  const [inputUrl, setInputUrl] = useState<string>("");
  const [selectedTabGroup, setSelectedTabGroup] = useState<string>("");

  const _createUrlGroupData = () => {
    if (inputUrl.length > 0) {
      let index: number;
      if (selectedTabGroup === "") {
        index = _indexTabGroupNumber(tabGroup[0].tabGroupName);
      } else {
        index = _indexTabGroupNumber(selectedTabGroup);
      }

      props.createUrl(inputUrl, index);
      setInputUrl("");
    }
  };

  const _indexTabGroupNumber = (name: string): number => {
    let tabGroupNumber = -1;
    tabGroup.map((tab, index) => {
      if (tab.tabGroupName === name) {
        // 配列のインデックスは0から始まるので、+1する
        tabGroupNumber = index + 1;
      }
    });

    return tabGroupNumber;
  };

  return (
    <>
      <Typography data-testid="title" mb={4} mt={4}>
        URLをグループに追加
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
              defaultValue={tabGroup[0].tabGroupName}
              label="グループ名"
              onChange={(e) => setSelectedTabGroup(e.target.value)}
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
          <div>グループが作成されていません</div>
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
