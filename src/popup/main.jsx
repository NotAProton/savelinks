import React from "react";
import { useState, useEffect } from "react";

export default function Popup() {
  const [currentURL, setCurrentURL] = useState("");
  const [pageSaved, setPageSaved] = useState(false);
  useEffect(() => {
    async function init() {
      const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      setCurrentURL(tabs[0].url);
      const savedData = await chrome.storage.local.get("data");
      if (!savedData.data) {
        await chrome.storage.local.set({ data: { savedpages: [] } });
      }
      let savedPages = [];
      if (typeof savedData.data !== "undefined") {
        savedPages = savedData.data.savedpages;
      }
      setPageSaved(savedPages.includes(tabs[0].url));
    }
    init();
  }, []);
  async function savePage() {
    const savedData = await chrome.storage.local.get("data");
    let savedPages = [];
    if (typeof savedData.data !== "undefined") {
      savedPages = savedData.data.savedpages;
    }
    setPageSaved(savedPages.includes(currentURL));
    if (!pageSaved) {
      savedPages.push(currentURL);
      await chrome.storage.local.set({ data: { savedpages: savedPages } });
      setPageSaved(true);
    }
  }
  function viewSavedPages() {
    chrome.tabs.create({ url: "index.html#saved" });
  }

  return (
    <div className="w-80">
      <code className="block overflow-x-auto whitespace-no-wrap bg-slate-800 text-white p-1 rounded-md">
        {currentURL}
      </code>
      <div className="flex flex-row justify-around">
        <button
          onClick={savePage}
          disabled={pageSaved}
          className={
            "mt-2 block" +
            (pageSaved
              ? "bg-zinc-300 text-gray-700 cursor-not-allowed hover:border-transparent"
              : "")
          }
        >
          Save this page
        </button>
        <button onClick={viewSavedPages} className="mt-2 block">
          View saved pages
        </button>
      </div>
    </div>
  );
}
