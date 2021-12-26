import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ChromeStorageAccess, { Color } from "../../../dao/chrome_storage_access";

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
  const [selectedColor, setSelectedColor] = useState<string>("grey" as Color);

  const _createTabGroupData = () => {
    if (inputGroupName.length > 0 && selectedColor.length > 0) {
      props.createTab(inputGroupName, selectedColor);
      setInputGroupName("");
    }
  };

  return (
    <>
      <Typography component={"span"} data-testid="title">
        <h3>新しいタブグループを作成</h3>
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

        <FormControl sx={{ width: 200 }}>
          <InputLabel id="simple-select-label">Color</InputLabel>
          <Select
            value={selectedColor}
            label="Color"
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            {color.map((color: Color) => {
              return (
                <MenuItem key={color} value={color}>
                  {color}
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
