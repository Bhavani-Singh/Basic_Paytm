import PropTypes from "prop-types";

function InputBox({label, inputType, placeHolder, inputId, inputValue, setValue}) {
    function handleOnChange(e) {
        setValue(e.target.value);
    }

    return (
        <div className="flex flex-col gap-3 w-5/6">
            <label className="text-base font-medium" htmlFor={inputId}>{label}</label>
            <input className="p-3 outline-[1px] focus:outline-none border rounded-md" type={inputType} id={inputId} placeholder={placeHolder} value={inputValue} onChange={handleOnChange} />
        </div>
    )
}

InputBox.propTypes = {
    label: PropTypes.string.isRequired,
    inputType: PropTypes.string.isRequired,
    placeHolder: PropTypes.string,
    inputId: PropTypes.string.isRequired,
    inputValue: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired
}

export default InputBox;