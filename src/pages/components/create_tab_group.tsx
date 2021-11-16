import React, { useState } from "react";
import ChromeStorageAccess, { Color } from "../../dao/chrome_storage_access";
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
import AddIcon from "@mui/icons-material/Add";

export const color = [
  "grey",
  "blue",
  "red",
  "yellow",
  "green",
  "pink",
  "purple",
  "cyan",
] as Color[];

const CreateTabGroupComponent = (props: any) => {
  const chromeStorage = new ChromeStorageAccess();

  // タブグループを作成する時の変数
  const [inputGroupName, setInputGroupName] = useState<string>("");
  const [selectedGroupColor, setSelectedTabGroupColor] =
    useState<Color>("grey");

  const _createTabGroupData = () => {
    if (inputGroupName.length > 0 && selectedGroupColor.length > 0) {
      props.createTab(inputGroupName, selectedGroupColor);
      setInputGroupName("");
    }
  };

  return (
    <>
      <Typography data-testid="title" mb={4}>
        新しいタブグループを作成
      </Typography>
      <Stack direction="row" spacing={5}>
        <TextField
          id="groupName"
          type="text"
          name="groupName"
          value={inputGroupName}
          label="グループ名"
          variant="outlined"
          onChange={(e) => setInputGroupName(e.target.value)}
        />

        <FormControl sx={{ width: 100 }}>
          <InputLabel id="simple-select-label">Color</InputLabel>
          <Select
            value={selectedGroupColor}
            defaultValue={selectedGroupColor}
            label="Color"
            onChange={(e) => setSelectedTabGroupColor(e.target.value as Color)}
          >
            {color.map((c, index) => {
              return (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <Button
          data-testid="createTabGroupButton"
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={_createTabGroupData}
        >
          作成
        </Button>
      </Stack>
    </>
  );
};

export default CreateTabGroupComponent;
