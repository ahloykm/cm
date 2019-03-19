import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextInputGroup = ({
  //props passed to component
  label,
  name,
  value,
  placeholder,
  type,
  onChange,
  error
}) => {
  return (
    //component rendering
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        //params: any classnames taken by default, object with cn we want and condition its dependent on
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invlaid-feedback">{error}</div>}
    </div>
  );
};
//set prop types
TextInputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholer: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};
//set default (in this case type is text so no need to pass unless other type ~email for instance)
TextInputGroup.defaultProps = {
  type: "text"
};

export default TextInputGroup;
