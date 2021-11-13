import React from "react";
import renderer, { act, ReactTestRendererJSON } from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../components/option_page";
import ChromeStorageAccess from "../chrome_storage_access";

let tree: ReactTestRendererJSON;
const storage = new ChromeStorageAccess();

beforeEach(() => {
  tree = renderer.create(<Options />).toJSON() as ReactTestRendererJSON;
});

afterEach(() => {});

describe("option_pageの試験", () => {
  describe("コンポーネントテスト", () => {
    test("スナップショットが前回の結果と一致しているかどうか", () => {
      expect(tree).toMatchSnapshot();
    });

    test("タブグループを入力できること", () => {
      act(() => {
        render(<Options />);
      });
      const input = screen.getByPlaceholderText(
        "グループ名"
      ) as HTMLInputElement;
      expect(input.value).toBe("");

      act(() => {
        userEvent.type(input, "test");
      });

      expect(input.value).toBe("test");
    });

    test("タブグループを作成ボタンを押すと、_createTabGroupDataが呼ばれ、入力が消去されること", () => {
      act(() => {
        render(<Options />);
      });
      const input = screen.getByPlaceholderText(
        "グループ名"
      ) as HTMLInputElement;
      const button = screen.getByTestId(
        "createTabGroupButton"
      ) as HTMLButtonElement;
      expect(input.value).toBe("");

      act(() => {
        userEvent.type(input, "test");
      });
      expect(input.value).toBe("test");

      act(() => {
        userEvent.click(button);
      });
      expect(input.value).toBe("");
    });

    test("タブグループの入力が空で作成ボタンを押すと、_createTabGroupDataが呼ばれず、入力が消去されないこと", () => {
      act(() => {
        render(<Options />);
      });
      const input = screen.getByPlaceholderText(
        "グループ名"
      ) as HTMLInputElement;
      const button = screen.getByTestId(
        "createTabGroupButton"
      ) as HTMLButtonElement;
      expect(input.value).toBe("");

      act(() => {
        userEvent.click(button);
      });
      expect(input.value).toBe("");
    });
  });
});
