import * as fs from "fs";
import ChromeStorageAccess from "./chrome_storage_access";

export const exportTabGroupData = async () => {
  const chromeStorageAccess = new ChromeStorageAccess();
  const tabAllGroup = await chromeStorageAccess.getAllTabGroup();

  fs.writeFileSync("./file/tab-group.json", JSON.stringify(tabAllGroup));
};

export const importTabGroupData = async (path: string) => {
  const chromeStorageAccess = new ChromeStorageAccess();
  const file = fs.readFileSync(path);

  const json = file.toJSON();
  const tabGroup = JSON.parse(json);
};
