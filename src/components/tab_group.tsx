import React from "react";
import { TabGroup } from "../chrome_storage_access";

export const TabGroupComponent = (props: any) => {
  const tabGroup = props.tabGroup;

  return (
    <>
      <table>
        <thead className="table-dark">
          <tr>
            <th scope="col-1">id</th>
            <th scope="col-2">色</th>
            <th scope="col-3">タブ名</th>
            <th scope="col-4">url</th>
          </tr>
        </thead>
        <tbody>
          {tabGroup.map((tab: TabGroup, index: number) => {
            return (
              <tr key={index}>
                <td data-testid={tab.id}>{tab.id}</td>
                <td data-testid={tab.id}>{tab.tabColor}</td>
                <td data-testid={tab.id}>{tab.tabGroupName}</td>
                <td data-testid={tab.id}>{tab.urls.map((url) => url)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
