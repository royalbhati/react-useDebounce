<!-- [![Build Status](https://img.shields.io/codeship/41810250-aa07-0132-fbf4-4e62e8945e03/master.svg?style=flat-square)](https://codeship.com/projects/67868)
[![Contributors](https://img.shields.io/github/contributors/moroshko/react-autosuggest.svg?style=flat-square)](https://github.com/moroshko/react-autosuggest/graphs/contributors)
[![Coverage Status](https://img.shields.io/codecov/c/github/moroshko/react-autosuggest/master.svg?style=flat-square)](https://codecov.io/gh/moroshko/react-autosuggest)

[![npm Downloads](https://img.shields.io/npm/dm/react-autosuggest.svg?style=flat-square)](https://npmjs.org/package/react-autosuggest)
[![npm Version](https://img.shields.io/npm/v/react-autosuggest.svg?style=flat-square)](https://npmjs.org/package/react-autosuggest)
![gzip size](http://img.badgesize.io/https://unpkg.com/react-autosuggest/dist/standalone/autosuggest.min.js?compression=gzip&style=flat-square) -->

# useDebounce

## Demo

Check out the [Codepen example](http://codepen.io/collection/DkkYaQ).

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

## valueLengthConstraint: PropTypes.number,

promise: PropTypes.bool,
DontfireOnBackspace: PropTypes.bool,
toDebounce: PropTypes.func.isRequired,
delay: PropTypes.number.isRequired,
getResponse: PropTypes.func.isRequired

| Prop                          | Type     | Required | Description                                     |
| :---------------------------- | :------- | :------: | :---------------------------------------------- |
| [`toDebounce`](#toDebounce)   | Func     |    ✓     | Function That will be Debounced                 |
| [`delay`](#delay)             | Number   |    ✓     | Number of milliseconds to debounce.             |
| [`getResponse`](#getResponse) | Function |    ✓     | Function to get the response from the component |

| [`promise`](#promise) | Boolean | default : true |If you need to return a promise or a simple return |
| [`DontfireOnBackspace`](#DontfireOnBackspace) | Boolean | default : false | Wether to stop firing API when pressing backspace |

## License

[MIT](http://moroshko.mit-license.org)
