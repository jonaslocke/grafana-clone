const GrafTooltip = ({ children, text, location = "bottom" }) => {
  let classes = `tooltip`;
  switch (location) {
    case "bottom":
      classes += " bottom";
      break;
    case "top":
      classes += " top";
      break;
    case "right":
      classes += " right";
      break;
    case "left":
      classes += " left";
      break;
  }
  return (
    <div className={classes} data-graf-tooltip={text}>
      {children}
    </div>
  );
};

export default GrafTooltip;
