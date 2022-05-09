const capitalize = (text) => {
  if (typeof text != "string") return;
  return text[0].toUpperCase() + text.substring(1, text.length);
};
const dataValidation = {
  alphaNum: {
    test: (value) => value.length > 0 && !value.match(/^[\w\-\s]+$/),
    message: "Only alphanumeric chars",
  },
  positiveInt: {
    test: (value) => value.length > 0 && !(parseInt(value) > 0),
    message: "Value must be a positive integer",
  },
};
const randomInterval = ({ min, max }) => {
  return parseInt(Math.floor(Math.random() * (max - min + 1) + min));
};

export { capitalize, dataValidation, randomInterval };
