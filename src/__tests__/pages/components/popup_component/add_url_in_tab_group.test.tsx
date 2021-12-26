import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from "@testing-library/react";
import React from "react";
import renderer, { act, ReactTestRendererJSON } from "react-test-renderer";
import { TabGroup } from "../../../../dao/chrome_storage_access";
import AddUrlInTabGroup from "../../../../pages/components/popup_component/add_url_in_tab_group";
import { mount } from "enzyme";

const tabGroupMock = [
  {
    id: 1,
    tabGroupName: "テスト",
    tabColor: "grey",
    urls: ["https://google.com"],
  },
  {
    id: 2,
    tabGroupName: "テスト2",
    tabColor: "red",
    urls: ["https://yahoo.co.jp"],
  },
] as TabGroup[];
let handleClose = jest.fn();
let addUrlInTabGroup = jest.fn();
let component: RenderResult;

beforeEach(() => {});

afterEach(() => {
  jest.resetAllMocks();
});

describe("AddUrlInTabGroupの試験", () => {
  describe("コンポーネントテスト", () => {
    describe("正常系", () => {
      test("tabGroupがあるとき「追加」ボタンを押したら、openOptionsPageが1回呼ばれること", () => {
        act(() => {
          component = render(
            <AddUrlInTabGroup
              title="テスト"
              tabGroup={tabGroupMock}
              handleClose={handleClose}
              addUrlInTabGroup={addUrlInTabGroup}
            />
          );
        });
        const backButton = screen.getByText("追加");
        act(() => {
          fireEvent.click(backButton);
        });

        expect(addUrlInTabGroup).toBeCalled();
        expect(addUrlInTabGroup).toBeCalledTimes(1);
      });

      test("tabGroupがあるとき「キャンセル」ボタンを押したら、handleCloseが1回呼ばれること", () => {
        act(() => {
          component = render(
            <AddUrlInTabGroup
              title="テスト"
              tabGroup={tabGroupMock}
              handleClose={handleClose}
              addUrlInTabGroup={addUrlInTabGroup}
            />
          );
        });
        const backButton = screen.getByText("キャンセル");
        act(() => {
          fireEvent.click(backButton);
        });

        expect(handleClose).toBeCalled();
        expect(handleClose).toBeCalledTimes(1);
      });

      test("tabGroupがないとき「タブグループを作る」ボタンを押したら、openOptionsPageが1回呼ばれること", () => {
        act(() => {
          component = render(
            <AddUrlInTabGroup
              title="テスト"
              tabGroup={[]}
              handleClose={handleClose}
              addUrlInTabGroup={addUrlInTabGroup}
            />
          );
        });
        const backButton = screen.getByText("タブグループを作る");
        act(() => {
          fireEvent.click(backButton);
        });

        expect(chrome.runtime.openOptionsPage).toBeCalled();
        expect(chrome.runtime.openOptionsPage).toBeCalledTimes(1);
      });
      test("tabGroupがないとき戻るボタンを押したら、handleCloseが1回呼ばれること", () => {
        act(() => {
          component = render(
            <AddUrlInTabGroup
              title="テスト"
              tabGroup={[]}
              handleClose={handleClose}
              addUrlInTabGroup={addUrlInTabGroup}
            />
          );
        });
        const backButton = screen.getByText("戻る");
        act(() => {
          fireEvent.click(backButton);
        });

        expect(handleClose).toBeCalled();
        expect(handleClose).toBeCalledTimes(1);
      });
    });
  });
});
