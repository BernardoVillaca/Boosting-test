

const FormInput = ({ label, id, error, setErrorsToNull, ...otherProps }) => {
    return (
        <div className='relative'>
            <input
                autoComplete="on"
                onFocus={() => { if (setErrorsToNull) setErrorsToNull() }}
                className={`w-full h-7 text-black rounded-md bg-white focus:outline-none p-2 peer cursor-default ${error && 'border-custom-red'}`}
                {...otherProps}
                id={id}
            />
            {label && (
                <label
                    className={`${otherProps.value.length ? '-translate-y-6 text-xs text-yellowish/white' : 'text-dark-purple'} absolute px-2 pt-[2px] left-0 transform peer-focus:-translate-y-6 peer-focus:text-xs duration-300 select-none`}
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <div className="flex h-8 place-content-end">
                {error &&
                    <span className="text-sm text-custom-red">{error}</span>
                }
            </div>
        </div>
    );
};
export default FormInput;