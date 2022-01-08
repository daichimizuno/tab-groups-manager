import { render } from "@testing-library/react";
import React from "react";
import renderer, { act, ReactTestRendererJSON } from "react-test-renderer";
import StoredTabGroupTreeView from "../../../../pages/components/popup_component/stored_tabgroup_tree_view";

let component;
beforeEach(() => {
  act(() => {
    component = render(<StoredTabGroupTreeView />);
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
          .create(<StoredTabGroupTreeView />)
          .toJSON() as ReactTestRendererJSON;
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
