import React from "react";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import ChromeStorageAccess from "../../dao/chrome_storage_access";
import Options from "../../pages/option_page";

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
  });
});
