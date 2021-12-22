import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from "@testing-library/react";
import React from "react";
import renderer, { act, ReactTestRendererJSON } from "react-test-renderer";
import OpenedTabView from "../../../pages/components/opened_tabs_view";

const tabs: chrome.tabs.Tab[] = [
  {
    index: 1,
    title: "test",
    url: "https://google.com",
  } as chrome.tabs.Tab,
  {
    index: 2,
    title: "test2",
    url: "https://google.com",
  } as chrome.tabs.Tab,
];
let component: RenderResult;

beforeEach(() => {});

afterEach(() => {
  jest.resetAllMocks();
});

describe("PopupTabViewの試験", () => {
  describe("コンポーネントテスト", () => {
    describe("正常系", () => {
      test("スナップショットが前回の結果と一致しているかどうか", () => {
        let tree = renderer
          .create(<OpenedTabView openedTabs={tabs} />)
          .toJSON() as ReactTestRendererJSON;
        expect(tree).toMatchSnapshot();
      });

      test("開かれているタブが存在するとき、ListItemが2つ開いていること", () => {
        act(() => {
          component = render(<OpenedTabView openedTabs={tabs} />);
        });
        const listitem = screen.queryAllByRole("listitem");
        expect(listitem).toHaveLength(2);
      });

      test("開かれているタブが存在するとき、ListItemTextにはtitleが入っていること", () => {
        act(() => {
          component = render(<OpenedTabView openedTabs={tabs} />);
        });
        tabs.forEach((tab) => {
          if (tab.title != undefined) {
            // console.log(screen.getByRole(""))
            const listItemText = screen.getByTestId(tab.title);
            expect(listItemText.textContent).toBe(tab.title);
          }
        });
      });
    });
    describe("準正常系", () => {
      test("開かれているタブが存在しないとき、listItemが開かれていないこと", () => {
        act(() => {
          component = render(<OpenedTabView openedTabs={[]} />);
        });

        expect(screen.queryAllByRole("listitem")).toHaveLength(0);
      });
    });
  });
});
