import React from "react";
import renderer, { act, ReactTestRendererJSON } from "react-test-renderer";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Option from "../option_page";

let tree: ReactTestRendererJSON;
beforeEach(() => {
  tree = renderer.create(<Option />).toJSON() as ReactTestRendererJSON;
});

afterEach(() => {
});

describe("option_pageの試験", () => {
  describe("コンポーネントテスト", () => {
    test("スナップショットが前回の結果と一致しているかどうか", () => {
      expect(tree).toMatchSnapshot();
    });

    test("タブグループを入力できること", () => {
      act(() => {
        render(<Option />);
      });
      const input = screen.getByPlaceholderText("グループ名") as HTMLInputElement
      expect(input.value).toBe("");

      act(() => {
        userEvent.type(input,"test")
      });

      expect(input.value).toBe("test");
    });

    // test("タブの色を決められた色を選択できること", () => {});

    // test("タブグループが入力されていて作成ボタンを押すと、addNewGroup関数が呼ばれること", () => {});

    // test("タブグループが入力されていない状態で作成ボタンを押すと、何も起こらないこと", () => {});
  });
});
