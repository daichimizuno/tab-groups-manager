import { render, RenderResult } from "@testing-library/react";
import React from "react";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import CreateResultAlert from "../../../pages/components/create_result_alert";

let component: RenderResult;

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("CreateTabGroupComponentの試験", () => {
  describe("コンポーネントテスト", () => {
    describe("正常系", () => {
      test("スナップショットが前回の結果と一致しているかどうか", () => {
        let tree = renderer
          .create(<CreateResultAlert success={true} description="test" />)
          .toJSON() as ReactTestRendererJSON;
        expect(tree).toMatchSnapshot();
      });

      test.each([
        { success: true, description: "これはsuccssがtrueの場合" },
        { success: false, description: "これはsuccssがfalseの場合" },
      ])(
        "successが$successでdescriptionが$descriptionのとき、[$description]が表示されていること)",
        ({ success, description }) => {
          component = render(
            <CreateResultAlert success={success} description={description} />
          );
          const alert = component.getByRole("alert");

          expect(alert).toHaveTextContent(description);
        }
      );
    });
  });
});
