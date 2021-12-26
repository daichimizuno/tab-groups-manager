import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
} from "@mui/material";
import { style } from "@mui/system";
import * as React from "react";
import { useState } from "react";
import { TabGroup } from "../../../dao/chrome_storage_access";

type Props = {
  title: string;
  tabGroup: TabGroup[];
  handleClose: Function;
  addUrlInTabGroup: Function;
};

const AddUrlInTabGroup = ({
  title,
  tabGroup,
  handleClose,
  addUrlInTabGroup,
}: Props) => {
  const [selectedTabGroupId, setSelectedTabGroupId] = useState<string>();

  return (
    <>
      <Modal
        open={true}
        hideBackdrop={true}
        style={{
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          {tabGroup.length !== 0 ? (
            <div>
              <Stack spacing={3}>
                <h3 id="parent-modal-title">{title}をタブグループに追加</h3>
                <FormControl sx={{ width: 200 }}>
                  <InputLabel id="simple-select-label">グループ名</InputLabel>

                  <Select
                    labelId="simple-select-label"
                    defaultValue={tabGroup[0].tabGroupName}
                    label="グループ名"
                    onChange={(e) => setSelectedTabGroupId(e.target.value)}
                  >
                    {tabGroup.map((tab: TabGroup) => {
                      let tabName = tab.tabGroupName;
                      return (
                        <MenuItem value={tab.id} key={tabName}>
                          {tabName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <Stack direction="row" spacing={2}>
                  <Button
                    onClick={() => handleClose()}
                    style={{ marginTop: "30px", marginRight: "30px" }}
                    variant="outlined"
                  >
                    キャンセル
                  </Button>
                  <Button
                    onClick={() => addUrlInTabGroup(selectedTabGroupId)}
                    style={{ marginTop: "30px" }}
                    variant="contained"
                  >
                    追加
                  </Button>
                </Stack>
              </Stack>
            </div>
          ) : (
            <div>
              <Stack spacing={3}>
                <h3 id="parent-modal-title">
                  まだタブグループが作られていません
                </h3>

                <Button
                  variant="contained"
                  onClick={() => chrome.runtime.openOptionsPage()}
                >
                  タブグループを作る
                </Button>
                <Button variant="outlined" onClick={() => handleClose()}>
                  戻る
                </Button>
              </Stack>
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default AddUrlInTabGroup;
