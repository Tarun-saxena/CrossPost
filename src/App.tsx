import './App.css'
import { useState, useEffect } from 'react';

function App() {
  const [preview, setPreview] = useState("No text selected");

  useEffect(() => {
    const fetchSelectedText = async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      chrome.tabs.sendMessage(
        tab.id!,
        { type: "GET_SELECTED_TEXT" },
        (response: { text?: string }) => {
          if (chrome.runtime.lastError) {
            setPreview("Page not supported");
            return;
          }

          if (!response) {
            setPreview("No text selected");
            return;
          }

          setPreview(response.text || "No text selected");
        }
      );
    };

    fetchSelectedText();
  }, []);

  const handleCopy = async () => {
    if (!preview || preview === "No text selected") return;
    await navigator.clipboard.writeText(preview);
  };

  const isEmpty =
    preview === "No text selected" || preview === "Page not supported";

  return (
    <div className="w-80 bg-white text-black rounded-lg shadow-md border border-gray-200">
    
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="text-sm font-semibold">CrossPost</div>
        <div className="text-xs text-gray-500">
          Preview and edit selected text
        </div>
      </div>

      <div className="p-4 space-y-3">
        <textarea
          className={`w-full h-32 resize-none rounded-md border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 ${
            isEmpty ? "text-gray-400" : "text-black"
          }`}
          value={preview}
          readOnly
        />

       
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {isEmpty ? "—" : `${preview.length} characters`}
          </span>

          <button
            onClick={handleCopy}
            disabled={isEmpty}
            className="text-xs px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
