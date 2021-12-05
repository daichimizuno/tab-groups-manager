import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from "@testing-library/react";
import React from "react";
import renderer, { act, ReactTestRendererJSON } from "react-test-renderer";
import PopupTabView from "../../../pages/components/popup_tabview";

const createTabGroup = jest.fn();
let component: RenderResult;

beforeEach(() => {
  jest.resetAllMocks();

  act(() => {
    component = render(<PopupTabView />);
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("PopupTabViewの試験", () => {
  describe("コンポーネントテスト", () => {
    describe("正常系", () => {
      test("スナップショットが前回の結果と一致しているかどうか", () => {
        let tree = renderer
          .create(<PopupTabView />)
          .toJSON() as ReactTestRendererJSON;
        expect(tree).toMatchSnapshot();
      });

      test("タブが２つ存在し、「開いているタブ」と「保存されている設定」があること", () => {
        const openedTab = screen.getByRole("tab", { name: "開いているタブ" });
        const setTab = screen.getByRole("tab", { name: "保存されている設定" });

        expect(openedTab.textContent).toBe("開いているタブ");
        expect(setTab.textContent).toBe("保存されている設定");
      });

      test("初回は「開かれているタブ」が選択されていて、「Item One」と表示されていること", () => {
        const tabPanel = screen.getByRole("tabpanel");
        expect(tabPanel.textContent).toBe("Item One");
      });

      test("「保存されている設定」を押すと「setting page」というページが開かれること", () => {
        const setTab = screen.getByRole("tab", { name: "保存されている設定" });
        act(() => {
          fireEvent.click(setTab);
        });

        const tabPanel = screen.getByRole("tabpanel");
        expect(tabPanel.textContent).toBe("setting page");
      });
    });
  });
});
