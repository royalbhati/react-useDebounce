import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useDebounce from "./useCustomDebounce";

DebounceInput.propTypes = {
  valueLengthConstraint: PropTypes.number,
  promise: PropTypes.bool,
  DontfireOnBackspace: PropTypes.bool,
  toDebounce: PropTypes.func.isRequired,
  delay: PropTypes.number.isRequired,
  getResponse: PropTypes.func.isRequired
};

export default function DebounceInput(props) {
  const [value, setValue] = useState("");
  const [response, setResponse] = useState("");
  const [inputEvent, setInputEvent] = useState("");

  const handleChange = e => {
    setValue(e.target.value);
  };
  const handleKey = e => {
    e.persist();
    setInputEvent(e);
  };

  const datafromServer = useDebounce(
    props.toDebounce,
    props.delay,
    props.promise || true,
    props.DontfireOnBackspace || false,
    props.valueLengthConstraint || false,
    inputEvent
  );

  useEffect(() => {
    props.getResponse(datafromServer(value));
  }, [datafromServer, value]);

  return (
    <div>
      <input onKeyUp={handleKey} value={value} onChange={handleChange}></input>
    </div>
  );
}
