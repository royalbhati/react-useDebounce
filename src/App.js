import React, { useState, useEffect } from "react";
import DebounceInput from "./DebounceInput";

const demoServer = val => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(`You typed ${val}`);
    }, 1000);
  });
};

const App = () => {
  const [serverData, setServerData] = useState("");
  const handleResponse = val => {
    val.then(res => {
      setServerData(res);
    });
  };
  return (
    <div style={{ margin: "100px" }}>
      <DebounceInput
        getResponse={handleResponse}
        toDebounce={demoServer}
        delay={500}
        DontfireOnBackspace={true}
      ></DebounceInput>
      Server resp : {serverData}
    </div>
  );
};

export default App;
