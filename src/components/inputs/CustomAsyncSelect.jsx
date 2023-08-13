import AsyncSelect from "react-select/async";
import { components } from "react-select";

const Option = (props) => {
  const { data, ...rest } = props;
  return (
    <components.Option {...rest}>
      <div className="d-flex align-items-center">
        <div className="me-3">
          <i className="fas fa-plane-departure"></i>
        </div>
        <div>
          <span className="mb-0 fw-semibold text-truncate">{data.label}</span>
          <span className="text-black-50 text-truncate">{data.label}</span>
        </div>
      </div>
    </components.Option>
  );
};

const SingleValue = (props) => {
  const { data, ...rest } = props;
  return (
    <components.SingleValue {...rest}>
      <span className="mb-0 fw-semibold text-truncate fs-5">{data.label}</span>
    </components.SingleValue>
  );
};

const CustomAsyncSelect = (props) => {
  const NoIndicatorSeparator = () => null;
  const NoDownChevron = () => null;

  return (
    <AsyncSelect
      {...props}
      styles={{
        control: (provided, state) => ({
          ...provided,
          fontSize: "22px",
          width: "87%",
          border: "none",
          background: "transparent",
          fontWeight: 500,
          height: "35px",
          padding: "0",
          outline: state.isFocused ? "none" : null,
          boxShadow: state.isFocused ? "none" : null,
        }),
      }}
      components={{
        IndicatorSeparator: NoIndicatorSeparator,
        DropdownIndicator: NoDownChevron,
        Option,
        SingleValue,
      }}
    />
  );
};

export default CustomAsyncSelect;
