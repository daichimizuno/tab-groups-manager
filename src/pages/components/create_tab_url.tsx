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
import AddIcon from "@mui/icons-material/Add";

const CreateTabUrlComponent = (props: any) => {
  const tabGroup = props.tabGroup as TabGroup[];
  const haveTabGroup = props.haveTabGroup as boolean;

  const [inputUrl, setInputUrl] = useState<string>("");
  const [selectedTabGroupNumber, setSelectedTabGroupNumber] =
    useState<number>(1);

  const _createUrlGroupData = () => {
    if (inputUrl.length > 0) {
      props.createUrl(inputUrl, selectedTabGroupNumber);
      setInputUrl("");
    }
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

        <FormControl sx={{ width: 100 }}>
          <InputLabel id="simple-select-label">グループ名</InputLabel>

          {haveTabGroup ? (
            <Select
              labelId="simple-select-label"
              defaultValue={tabGroup[0].tabGroupName}
              label="グループ名"
              onChange={(e) =>
                setSelectedTabGroupNumber(Number(e.target.value))
              }
            >
              {tabGroup.map((tab: TabGroup) => {
                let tabId = tab.id;
                let tabName = tab.tabGroupName;
                return (
                  <MenuItem value={tabId} key={tabId}>
                    {tabName}
                  </MenuItem>
                );
              })}
            </Select>
          ) : (
            <div></div>
          )}
        </FormControl>

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
