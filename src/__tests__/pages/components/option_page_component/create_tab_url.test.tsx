import {
  fireEvent,
  getByRole,
  render,
  RenderResult,
  screen,
  within,
} from "@testing-library/react";
import React from "react";
import renderer, { act, ReactTestRendererJSON } from "react-test-renderer";
import CreateTabUrlComponent from "../../../../pages/components/option_page_component/create_tab_url";

const createUrl = jest.fn();
const tabGroup = [
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
];
let component: RenderResult;

beforeEach(() => {
  jest.resetAllMocks();

  act(() => {
    component = render(
      <CreateTabUrlComponent
        tabGroup={tabGroup}
        haveTabGroup={true}
        createUrl={createUrl}
      />
    );
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
          .create(<CreateTabUrlComponent createTab={() => createUrl()} />)
          .toJSON() as ReactTestRendererJSON;
        expect(tree).toMatchSnapshot();
      });

      test("タイトルに「URLをグループに追加」と書かれていること", () => {
        const titleText = screen.getByTestId("title") as HTMLParagraphElement;
        expect(titleText.textContent).toBe("URLをグループに追加");
      });

      test("Urlを入力できること", () => {
        const textbox = screen.getByRole("textbox", { name: "URL" });
        expect(textbox).toBeInTheDocument();
        expect(textbox).toBeVisible();

        fireEvent.input(textbox, {
          target: {
            value: "https://google.com",
          },
        });
        expect(textbox).toHaveValue("https://google.com");
      });

      test("タブグループを選択できること", () => {
        const button = screen.getByRole("button", { name: "グループ名" });
        expect(button).toBeInTheDocument();
        expect(button).toBeVisible();

        // リストを開く
        fireEvent.mouseDown(button);
        const listbox = within(screen.getByRole("listbox"));

        tabGroup.map((tab) => {
          act(() => {
            fireEvent.click(listbox.getByText(tab.tabGroupName));
          });

          expect(button).toHaveTextContent(tab.tabGroupName);
        });
      });
    });

    describe('準正常系"', () => {
      test("urlが入力されていない状態で、作成ボタンが押されるとcreateUrlが呼ばれないこと", async () => {
        const button = component.getByRole("button", { name: "作成" });
        fireEvent.click(button);

        expect(createUrl).not.toHaveBeenCalled();
      });
    });
  });
});
