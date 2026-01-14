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
        //callback function
        (response: { text?: string }) => {
          // 🔴 FIRST CHECK: runtime error
          if (chrome.runtime.lastError) {
            setPreview("Page not supported");
            return;
          }

          // 🔴 SECOND CHECK: response exists
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


  return (
    <>
      <div className='w-82 p-4 bg-white text-black'>
        <div className='text-lg font-bold'>CrossPost</div>
        <textarea
          className="mt-3 w-full h-32 p-2 text-black rounded"
          value={preview}

        />

      </div>
    </>
  );
}

export default App
