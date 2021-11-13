import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Popup = () => {
  console.log("popup is opened");

  const [count, setCount] = useState(0);
  const [currentURL, setCurrentURL] = useState<string>();

  useEffect(() => {
    chrome.action.setBadgeText({ text: count.toString() });
  }, [count]);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
    });
  }, []);

  const changeBackground = () => {
    console.log("#changeBackground");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(
          tab.id,
          {
            color: "#555555",
          },
          (msg) => {
            console.log("result message:", msg);
          }
        );
      }
    });
  };

  const createTab = () => {
    chrome.tabs.create({
      url: "https://readouble.com/laravel/5.4/ja/mix.html",
    });
  };

  const openOptionPage = () => {
    chrome.runtime.openOptionsPage(() => {
      console.log("option page is created");
    });
  };

  return (
    <>
      <button onClick={openOptionPage}>option page</button>

      <ul style={{ minWidth: "500px" }}>
        <li>Current URL: {currentURL}</li>
        <li>Current Time: {new Date().toLocaleTimeString()}</li>
      </ul>
      <button
        onClick={() => setCount(count + 1)}
        style={{ marginRight: "5px" }}
      >
        count up
      </button>
      <button onClick={createTab}>change background</button>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
