import React from "react";
import renderer, { act, ReactTestRendererJSON } from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Option from "../option_page";
import ChromeStorageAccess from "../chrome_storage_access";

const chrome = {
  storage: {
    sync: {
      set: () => {},
      get: () => {},
    },
  },
};

const storage = new ChromeStorageAccess();
const getAllTabGroup = jest.spyOn(storage, "getAllTabGroup");

describe("ChromeStorageAccessのテスト", () => {
  test("新しいグループが追加できる関数を呼ぶと、getAllTabGroup呼ばれること", () => {
    const newGroupName = "test";
    let chromeStorageData: string[] = [newGroupName];

    storage.addNewGroup(newGroupName);

  　getAllTabGroup.mockImplementation((): any => {
      return chromeStorageData
    });

    expect(getAllTabGroup).toHaveBeenCalledTimes(1);
  });
});
