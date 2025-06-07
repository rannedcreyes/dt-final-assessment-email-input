import React, { useState } from "react";
import { emails } from "../emails";

const EmailInput = React.memo(() => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    let value = e.target.value;
    setInput(value);

    if (value !== "") {
      let filtered = emails.filter((email) => {
        if (email.toLowerCase().startsWith(value.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      });
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-200">
      <div className="w-[400px]">
        <input
          type="text"
          placeholder="Enter recipients..."
          value={input}
          onChange={handleChange}
          className="w-full h-[50px] px-4 border border-gray-300 rounded-md shadow text-sm outline-none bg-white text-black"
        />

        {suggestions.length > 0 && (
          <ul className="mt-2 bg-white border border-gray-300 rounded-md shadow max-h-48 overflow-y-auto">
            {suggestions.map((email, index) => (
              <li
                key={index}
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                {email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
});

export default EmailInput;
