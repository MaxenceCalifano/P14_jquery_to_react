import PropTypes from 'prop-types'

function Select({ label, data, setData }) {
    const forName = label.toLowerCase()
    return (
        <>
            <label htmlFor={forName}>{label}</label>
            <select name={forName} id={forName} onChange={(e) => setData(e.target.value)}>
                {
                    data.map((option, key) => (
                        <option key={key}>
                            {option}
                        </option>
                    ))
                }
            </select>
        </>
    );
}

Select.propTypes = {
    data: PropTypes.array,
    setData: PropTypes.func,
    label: PropTypes.string
}

export default Select;