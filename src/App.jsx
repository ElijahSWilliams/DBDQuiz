import { useState } from "react";

import "./App.css";
import Entry from "./Components/Entry/Entry";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="page">
      <Entry />
    </div>
  );
}

export default App;
