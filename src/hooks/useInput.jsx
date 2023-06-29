import { useState } from "react";

const useInput = (validateFunc, defaultValue = "") => {
    const [value, setValue] = useState(defaultValue);
    const [isTouched, setIsTouched] = useState(false);

    const isValid = validateFunc(value);
    const hasError = isTouched && !isValid;

    const valueChangeHandler = event => setValue(event.target.value);
    const inputBlurHandler = () => setIsTouched(true);

    const reset = () => {
        setValue(defaultValue);
        setIsTouched(false);
    };

    return {
        value,
        hasError,
        isValid,
        valueChangeHandler,
        inputBlurHandler,
        reset
    }
};

export default useInput;