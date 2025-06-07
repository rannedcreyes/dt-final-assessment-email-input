import React, { useState } from "react";
import { emails } from "../emails";

const EmailInput = React.memo(() => {
  const [typedText, setTypedText] = useState("");
  const [choices, setChoices] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedEmails, setSelectedEmails] = useState([]);

  const isEmailValid = (text) => {
    return text.includes("@") && text.includes(".");
  };

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

    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < choices.length) {
        addEmailTag(choices[selectedIndex]);
      } else if (typedText !== "") {
        addEmailTag(typedText);
      }
      setTypedText("");
      setChoices([]);
      setSelectedIndex(-1);
    }
  };

  const addEmailTag = (email) => {
    let exists = selectedEmails.some((e) => e.text === email);

    if (!exists) {
      let tag = {
        text: email,
        valid: isEmailValid(email),
      };

      setSelectedEmails([...selectedEmails, tag]);
    }
  };

  const removeEmail = (text) => {
    setSelectedEmails(selectedEmails.filter((e) => e.text !== text));
  };

  const pickEmail = (email) => {
    addEmailTag(email);
    setTypedText("");
    setChoices([]);
    setSelectedIndex(-1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-200">
      <div className="w-[400px]">
        <div
          className="flex flex-wrap items-center min-h-[50px] px-2 py-1 border border-gray-300 rounded-md bg-white gap-1"
          onClick={() => document.getElementById("email-input").focus()}
        >
          {selectedEmails.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center px-2 py-1 rounded text-sm cursor-pointer hover:bg-gray-300 ${
                item.valid ? "text-black" : "text-red-600"
              }`}
            >
              {item.text}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  removeEmail(item.text);
                }}
                className="ml-1"
              >
                ×
              </span>
            </div>
          ))}

          <input
            id="email-input"
            type="text"
            placeholder={
              selectedEmails.length === 0 ? "Enter recipients..." : ""
            }
            value={typedText}
            onChange={handleTyping}
            onKeyDown={handleKeyDown}
            className="flex-grow min-w-[80px] h-8 px-2 text-sm outline-none bg-white text-black border-none"
          />
        </div>

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
