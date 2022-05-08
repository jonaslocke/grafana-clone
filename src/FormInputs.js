import { dataValidation as rules } from "../src/util";
import {
  metricOptions,
  triggerConditions,
  alarmStatus,
} from "../src/Constants";
import { MenuItem } from "@mui/material";

class FormInputs {
  constructor({
    input,
    label,
    disabled = false,
    type = "text",
    rules = () => false,
    errorMessage = "",
    size = 6,
    select = false,
    selectOptions,
  }) {
    this.input = input;
    this.label = label;
    this.disabled = disabled;
    this.type = type;
    this.rules = rules;
    this.errorMessage = errorMessage;
    this.size = size;
    this.select = select;
    this.selectOptions = selectOptions;
  }
  toJson() {
    return JSON.stringify({
      input: this.input,
      label: this.label,
      disabled: this.disabled,
      type: this.type,
      rules: this.rules,
      errorMessage: this.errorMessage,
      size: this.size,
      select: this.select,
    });
  }
}
const alarmsFormInputs = [];
alarmsFormInputs.push(
  new FormInputs({
    input: "id",
    label: "ID",
    disabled: true,
  })
);
alarmsFormInputs.push(
  new FormInputs({
    input: "name",
    label: "Name",
    rules: (value) => rules.alphaNum.test(value),
    errorMessage: rules.alphaNum.message,
  })
);
alarmsFormInputs.push(
  new FormInputs({
    input: "source",
    label: "Source",
    rules: (value) => rules.alphaNum.test(value),
    errorMessage: rules.alphaNum.message,
  })
);
alarmsFormInputs.push(
  new FormInputs({
    input: "metric",
    label: "Metric",
    select: true,
    selectOptions: metricOptions.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    )),
  })
);
alarmsFormInputs.push(
  new FormInputs({
    input: "triggerCondition",
    label: "Trigger Condition",
    size: 3,
    select: true,
    selectOptions: triggerConditions.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    )),
  })
);
alarmsFormInputs.push(
  new FormInputs({
    input: "trigger",
    label: "Trigger",
    type: "number",
    rules: (value) => rules.positiveInt.test(value),
    errorMessage: rules.positiveInt.message,
    size: 9,
  })
);

const searchFormInputs = [];

const formInputs = [
  { input: "name", label: "Name Filter" },
  { input: "status", label: "Status Filter" },
];

searchFormInputs.push(
  new FormInputs({
    input: "name",
    label: "Name Filter",
  })
);
searchFormInputs.push(
  new FormInputs({
    input: "status",
    label: "Status Filter",
    select: true,
    selectOptions: alarmStatus.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    )),
  })
);

export { alarmsFormInputs, searchFormInputs };
