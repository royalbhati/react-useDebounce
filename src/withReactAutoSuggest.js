import React, { useState, useCallback } from "react";
import Autosuggest from "react-autosuggest";
import axios from "axios";
import API from "api";
import useDebounce from "./useCustomDebounce";

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

export default ReactAutoSuggestExample;
