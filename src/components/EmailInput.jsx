import React, { useState } from "react";
import { emails } from "../emails";

const EmailInput = React.memo(() => {
  const [typedText, setTypedText] = useState("");
  const [choices, setChoices] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleTyping = (e) => {
    let text = e.target.value;
    setTypedText(text);
    setSelectedIndex(-1);

    if (text !== "") {
      let matches = [];

      for (let i = 0; i < emails.length; i++) {
        let email = emails[i];
        let smallEmail = email.toLowerCase();
        let smallText = text.toLowerCase();

        if (smallEmail.startsWith(smallText)) {
          matches.push(email);
        }
      }

      setChoices(matches);
    } else {
      setChoices([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();

      if (selectedIndex < choices.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      } else {
        setSelectedIndex(0);
      }
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      if (selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      } else {
        setSelectedIndex(choices.length - 1);
      }
    }

    if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < choices.length) {
        let picked = choices[selectedIndex];
        setTypedText(picked);
        setChoices([]);
        setSelectedIndex(-1);
        e.preventDefault();
      }
    }

    if (e.key === "Tab") {
      if (selectedIndex >= 0 && selectedIndex < choices.length) {
        let picked = choices[selectedIndex];
        setTypedText(picked);
        setChoices([]);
        setSelectedIndex(-1);
        e.preventDefault();
      }
    }
  };

  const pickEmail = (email) => {
    setTypedText(email);
    setChoices([]);
    setSelectedIndex(-1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-200">
      <div className="w-[400px]">
        <input
          type="text"
          placeholder="Enter recipients..."
          value={typedText}
          onChange={handleTyping}
          onKeyDown={handleKeyDown}
          className="w-full h-[50px] px-4 border border-gray-300 rounded-md shadow text-sm outline-none bg-white text-black"
        />

        {choices.length > 0 && (
          <ul className="mt-2 bg-white border border-gray-300 rounded-md shadow max-h-48 overflow-y-auto">
            {choices.map((email, index) => {
              let isChosen = index === selectedIndex;

              return (
                <li
                  key={index}
                  onClick={() => pickEmail(email)}
                  className={`px-4 py-2 text-sm cursor-pointer ${
                    isChosen ? "bg-gray-300" : "hover:bg-gray-100"
                  }`}
                >
                  {email}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
});

export default EmailInput;
