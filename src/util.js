const capitalize = (text) => {
  if (typeof text != "string") return;
  return text[0].toUpperCase() + text.substring(1, text.length);
};

export { capitalize };
