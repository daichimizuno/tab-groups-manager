import { render, screen } from "@testing-library/react";
import React from "react";
import renderer, { act, ReactTestRendererJSON } from "react-test-renderer";
import { TabGroup } from "../../../dao/chrome_storage_access";
import TabGroupComponent from "../../../pages/components/tab_group";

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

let tree: ReactTestRendererJSON;

beforeEach(() => {
  tree = renderer
    .create(<TabGroupComponent tabGroup={tabGroupMock} />)
    .toJSON() as ReactTestRendererJSON;
});

afterEach(() => {});

describe("tab_groupのテスト", () => {
  describe("コンポーネントのてすと", () => {
    test("スナップショットが前回の結果と一致しているかどうか", () => {
      expect(tree).toMatchSnapshot();
    });

    test("表示されるデータがTableがMockデータと正しいこと", () => {
      act(() => {
        render(<TabGroupComponent tabGroup={tabGroupMock} />);
      });

      expect(screen.getByText("テスト")).toBeTruthy();
      expect(screen.getByText("テスト2")).toBeTruthy();
      expect(screen.getByText("grey")).toBeTruthy();
      expect(screen.getByText("red")).toBeTruthy();
      expect(screen.getByText("https://google.com")).toBeTruthy();
      expect(screen.getByText("https://yahoo.co.jp")).toBeTruthy();
    });
  });
});
