import {
  fireEvent,
  render,
  RenderResult,
  screen,
  within,
} from "@testing-library/react";
import React from "react";
import renderer, { act, ReactTestRendererJSON } from "react-test-renderer";
import DeleteAlert from "../../../../pages/components/dialogs/delete_alert";

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("DeleteAlertの試験", () => {
  describe("コンポーネントテスト", () => {
    describe("正常系", () => {
      test("openがtrueのときダイアログが開いていること", () => {
        const component = render(<DeleteAlert open={true} />);
        expect(component.getByRole("dialog")).toBeInTheDocument();
      });

      test("openがfalseのときダイアログが存在しないこと", () => {
        const component = render(<DeleteAlert open={false} />);
        expect(component.queryByRole("dialog")).toBeNull();
      });
    });
  });
});
