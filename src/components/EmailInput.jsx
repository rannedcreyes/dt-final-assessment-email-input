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
    const text = e.target.value;
    setTypedText(text);
    setSelectedIndex(-1);

    if (text !== "") {
      const matches = [];

      for (let i = 0; i < emails.length; i++) {
        const email = emails[i].toLowerCase();
        const input = text.toLowerCase();

        if (email.startsWith(input)) {
          matches.push(emails[i]);
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
      const nextIndex = selectedIndex + 1;
      if (nextIndex < choices.length) {
        setSelectedIndex(nextIndex);
      } else {
        setSelectedIndex(0);
      }
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = selectedIndex - 1;
      if (prevIndex >= 0) {
        setSelectedIndex(prevIndex);
      } else {
        setSelectedIndex(choices.length - 1);
      }
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < choices.length) {
        addEmail(choices[selectedIndex]);
      } else {
        if (typedText !== "") {
          addEmail(typedText);
        }
      }
      setTypedText("");
      setChoices([]);
      setSelectedIndex(-1);
    }

    if (e.key === "Tab") {
      if (typedText !== "") {
        e.preventDefault();
        addEmail(typedText);
        setTypedText("");
        setChoices([]);
        setSelectedIndex(-1);
      }
    }
  };

  const addEmail = (email) => {
    const exists = selectedEmails.find((e) => e.text === email);

    if (!exists) {
      const tag = {
        text: email,
        valid: isEmailValid(email),
      };

      setSelectedEmails([...selectedEmails, tag]);
    }
  };

  const removeEmail = (text) => {
    const filtered = selectedEmails.filter((e) => e.text !== text);
    setSelectedEmails(filtered);
  };

  const handlePick = (email) => {
    addEmail(email);
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
          {selectedEmails.map((item, i) => (
            <div
              key={i}
              className={`flex items-center px-2 py-1 rounded text-sm cursor-pointer ${
                item.valid
                  ? "text-black hover:bg-gray-300"
                  : "bg-red-200 text-black"
              }`}
            >
              {item.text}
              <span
                className="ml-1"
                onClick={(e) => {
                  e.stopPropagation();
                  removeEmail(item.text);
                }}
              >
                ×
              </span>
            </div>
          ))}

          <input
            id="email-input"
            type="text"
            value={typedText}
            placeholder={
              selectedEmails.length === 0 ? "Enter recipients..." : ""
            }
            onChange={handleTyping}
            onKeyDown={handleKeyDown}
            className="flex-grow min-w-[80px] h-8 px-2 text-sm outline-none bg-white text-black border-none"
          />
        </div>

        {choices.length > 0 && (
          <ul className="mt-2 bg-white border border-gray-300 rounded-md shadow max-h-48 overflow-y-auto">
            {choices.map((email, index) => {
              const isActive = index === selectedIndex;

              return (
                <li
                  key={index}
                  onClick={() => handlePick(email)}
                  className={`px-4 py-2 text-sm cursor-pointer ${
                    isActive ? "bg-gray-300" : "hover:bg-gray-100"
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
