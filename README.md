# useDebounce

## Demo

Check out the [Codepen example](//).

## Basic Usage as a Hook

```js
import React, { useState, useEffect } from "react";
import useDebounce from "./useDebounce";



export default function DebounceInput(props) {
  const [value, setValue] = useState("");
  const [response, setResponse] = useState("");
  const ServerRequest =()=>{
    //API logic
}

  const handleChange = e => {
    setValue(e.target.value);
  };


  const datafromServer = useDebounce(
   ServerRequest
   500,

  );

  useEffect(() => {
    datafromServer(value).then(data=>{
        setResponse(data)
    })
  }, [value]);

  return (
    <div>
      <input value={value} onChange={handleChange}></input>
    </div>
  );
}

}
```

## Usage as a Component

```js
import React, { useState, useEffect } from "react";
import DebounceInput from "./DebounceInput";

const demoServer = val => {
  //API request
};

const App = () => {
  const [serverData, setServerData] = useState("");
  const handleResponse = val => {
    val.then(res => {
      setServerData(res);
    });
  };
  return (
    <div>
      <DebounceInput
        getResponse={handleResponse}
        toDebounce={demoServer}
        delay={500}
        DontfireOnBackspace={true}
      ></DebounceInput>
    </div>
  );
};

export default App;
```

## Usage with React AutoSuggest

```js
function ReactAutoSuggestExample() {
  const [suggestions, setSuggestionsList] = useState([]);

  const handleInputBox = (event, { newValue }) => {
    setInputBox(newValue);
  };

  const inputProps = {
    placeholder: "Search by name",
    value: inputBox,
    onChange: handleInputBox
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    const res = await axios.post(API.getByName, { name: value });
    setSuggestionsList(res.data.data);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestionsList([]);
  };
  const getSuggestionValue = suggestion => {
    setFilteredData(suggestion);
  };
  const renderSuggestion = suggestion => {
    return <div>{suggestion.name}</div>;
  };
  const OnFetch = useDebounce(onSuggestionsFetchRequested, 500);
  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={OnFetch}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
}
```

## Props

| Prop                                          | Type     |    Required     | Description                                        |
| :-------------------------------------------- | :------- | :-------------: | :------------------------------------------------- |
| [`toDebounce`](#toDebounce)                   | Func     |        ✓        | Function That will be Debounced                    |
| [`delay`](#delay)                             | Number   |        ✓        | Number of milliseconds to debounce.                |
| [`getResponse`](#getResponse)                 | Function |        ✓        | Function to get the response from the component    |
| [`promise`](#promise)                         | Boolean  | default : true  | If you need to return a promise or a simple return |
| [`DontfireOnBackspace`](#DontfireOnBackspace) | Boolean  | default : false | Wether to stop firing API when pressing backspace  |

## License

[MIT](http://moroshko.mit-license.org)
