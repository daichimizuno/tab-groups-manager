import { render, screen } from "@testing-library/react";
import { tab } from "@testing-library/user-event/dist/tab";
import React from "react";
import renderer, { act, ReactTestRendererJSON } from "react-test-renderer";
import { TabGroup } from "../chrome_storage_access";
import { TabGroupComponent } from "../components/tab_group";

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
  tree = renderer.create(<TabGroupComponent tabGroup={tabGroupMock} />).toJSON() as ReactTestRendererJSON;
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

      const tabData1Node = screen.getAllByTestId(1) as any;
      const tabData2Node = screen.getAllByTestId(2) as any;

      expect(tabData1Node.length).toBe(4);
      expect(tabData2Node.length).toBe(4);

      expect(screen.getByText("1")).toBeTruthy();
      expect(screen.getByText("2")).toBeTruthy();
      expect(screen.getByText("テスト")).toBeTruthy();
      expect(screen.getByText("テスト2")).toBeTruthy();
      expect(screen.getByText("grey")).toBeTruthy();
      expect(screen.getByText("red")).toBeTruthy();
      expect(screen.getByText("https://google.com")).toBeTruthy();
      expect(screen.getByText("https://yahoo.co.jp")).toBeTruthy();
    });
  });
});
