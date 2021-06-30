const colors = {
  white: "#fff",
  lightBlue: "#EDF5FB"
};

function makeArrow(size, color) {
  const scale = 1.52;
  const edge = `calc(${size} / ${scale})`;

  return {
    position: "absolute",
    left: 0,
    top: `calc(50% - ${edge})`,
    width: 0,
    height: 0,
    borderTop: `${edge} solid transparent`,
    borderBottom: `${edge} solid transparent`,
    borderLeft: `${size} solid ${color}`,
    pointerEvents: "none"
  };
}

export default theme => ({
  root: {
    display: "flex",
    margin: "16px 0",
    minHeight: "233px",
    position: "relative",
    "& > div": {
      height: "auto"
    }
  },
  uploadedFiles: {
    padding: "37px 43px"
  },
  uploadedFilesItem: {
    marginBottom: "20px",
    "&:last-child": {
      marginBottom: 0
    }
  },
  availableVolume: {
    position: "relative",
    background: colors.lightBlue,
    display: "flex",
    color: "#3C4858",
    "& > div": {
      margin: "auto auto",
      display: "flex",
      flexFlow: "row wrap"
    }
  },
  availableVolume__icon: {
    fontSize: "114.7px",
    color: "rgb(0, 142, 217)"
  },
  availableVolume__title: {
    margin: "12.7px 0 0 3.3px"
  },
  availableVolume__number: {
    fontWeight: "bold",
    fontSize: "64px",
    lineHeight: "73px"
  },
  stateFilter: {
    position: "relative",
    display: "flex",
    "& > div": {
      width: "70%",
      margin: "auto auto"
    }
  },
  arrowRightWhite: makeArrow("38px", colors.white),
  arrowRightBlue: makeArrow("38px", colors.lightBlue)
});
