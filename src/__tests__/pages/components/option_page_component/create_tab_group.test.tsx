import {
  fireEvent,
  render,
  RenderResult,
  screen,
  within,
} from "@testing-library/react";
import React from "react";
import renderer, { act, ReactTestRendererJSON } from "react-test-renderer";
import CreateTabGroupComponent, {
  color,
} from "../../../../pages/components/option_page_component/create_tab_group";

const createTabGroup = jest.fn();
let component: RenderResult;

beforeEach(() => {
  jest.resetAllMocks();

  act(() => {
    component = render(<CreateTabGroupComponent createTab={createTabGroup} />);
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("CreateTabGroupComponentの試験", () => {
  describe("コンポーネントテスト", () => {
    describe("正常系", () => {
      test("スナップショットが前回の結果と一致しているかどうか", () => {
        let tree = renderer
          .create(
            <CreateTabGroupComponent createTab={() => createTabGroup()} />
          )
          .toJSON() as ReactTestRendererJSON;
        expect(tree).toMatchSnapshot();
      });

      test("タイトルに「新しいタブグループを作成」と書かれていること", () => {
        const titleText = screen.getByTestId("title") as HTMLParagraphElement;
        expect(titleText.textContent).toBe("新しいタブグループを作成");
      });

      test("タブグループを入力できること", () => {
        const textbox = screen.getByRole("textbox", { name: "グループ名" });
        expect(textbox).toBeInTheDocument();
        expect(textbox).toBeVisible();

        fireEvent.input(textbox, {
          target: {
            value: "テスト",
          },
        });
        expect(textbox).toHaveValue("テスト");
      });

      test("タブグループの色を選択できること", () => {
        const button = screen.getByRole("button", { name: "grey" });
        expect(button).toBeInTheDocument();
        expect(button).toBeVisible();

        // リストを開く
        fireEvent.mouseDown(button);
        const listbox = within(screen.getByRole("listbox"));
        expect(button.textContent).toBe("grey");

        color.map((c) => {
          act(() => {
            fireEvent.click(listbox.getByText(c));
          });

          expect(button).toHaveTextContent(c);
        });
      });

      test("グループ名と色が入力されている状態で、作成ボタンが押されるとcreateTabが呼ばれ、入力欄が空になる", async () => {
        const textbox = screen.getByRole("textbox", { name: "グループ名" });
        fireEvent.input(textbox, {
          target: {
            value: "テスト",
          },
        });
        expect(textbox).toHaveValue("テスト");

        const button = component.getByRole("button", { name: "作成" });
        fireEvent.click(button);

        expect(createTabGroup).toHaveBeenCalledTimes(1);
        expect(textbox).toHaveValue("");
      });
    });

    describe('準正常系"', () => {
      test("グループ名が入力されていない状態で、作成ボタンが押されるとcreateTabが呼ばれないこと", async () => {
        const button = component.getByRole("button", { name: "作成" });
        fireEvent.click(button);

        expect(createTabGroup).not.toHaveBeenCalled();
      });
    });
  });
});
