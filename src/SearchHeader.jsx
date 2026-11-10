import { useState } from "react";

// 1. Accept `onSearch` prop here
export default function SearchHeader({ onSearch }) {
  const [inputVal, setInputVal] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 2. Trigger the parent's function and pass the typed value!
    if (inputVal.trim()) {
      onSearch(inputVal);
    }
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter username" 
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)
            
          }
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}