import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import nouislider from "nouislider";

import { withStyles } from "@material-ui/core";

import Input from "../CustomInput";

import styles from "./styles";

class SliderWithInput extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string
  };

  static getDerivedStateFromProps(props, state) {
    if (state.isSliding || state.isTyping) return null;

    if (typeof props.onChange === "function") {
      const { ignoreMax, ignoreMin, range } = props.start;
      const inputRange = range.map(v => parseInt(v));
      const sliderRange = inputRange.slice();
      const pastInputRange = inputRange.slice();

      sliderRange[0] = Math.max(props.range.min, sliderRange[0]);
      sliderRange[1] = Math.min(props.range.max, sliderRange[1]);

      return {
        ignoreMax,
        ignoreMin,
        inputRange,
        sliderRange,
        pastInputRange
      };
    }

    return null;
  }

  sliderRef = React.createRef();

  constructor(props) {
    super(props);

    const { ignoreMax, ignoreMin } = this.props.start;

    const range = this.props.start.range;

    if (ignoreMin) range[0] = this.props.range.min;
    if (ignoreMax) range[1] = this.props.range.max;

    this.state = {
      ignoreMax,
      ignoreMin,
      sliderRange: range,
      inputRange: range,
      isSliding: false,
      isTyping: false
    };
  }

  componentDidMount() {
    nouislider.create(this.sliderRef.current, {
      range: this.props.range,
      start: this.state.sliderRange,
      connect: this.props.connect,
      step: this.props.step
    });

    this.sliderRef.current.noUiSlider.on("slide", value => {
      const sliderRange = value.map(v => parseInt(v));
      const inputRange = this.updateInput(sliderRange);
      const ignoreMin =
        this.state.sliderRange[0] !== sliderRange[0]
          ? sliderRange[0] === this.props.range.min
          : this.state.ignoreMin;
      const ignoreMax =
        this.state.sliderRange[1] !== sliderRange[1]
          ? sliderRange[1] === this.props.range.max
          : this.state.ignoreMax;

      this.setState({
        isSliding: true,
        sliderRange,
        inputRange,
        ignoreMax,
        ignoreMin
      });
    });

    if (typeof this.props.onChange === "function") {
      this.sliderRef.current.noUiSlider.on("set", () => {
        const { ignoreMax, ignoreMin, inputRange } = this.state;

        this.setState({ isSliding: false });

        this.props.onChange({
          ignoreMax,
          ignoreMin,
          range: inputRange.map(v => parseInt(v))
        });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isSliding, isTyping, sliderRange } = this.state;

    if (
      !isSliding &&
      !isTyping &&
      (sliderRange[0] !== prevState.sliderRange[0] ||
        sliderRange[1] !== prevState.sliderRange[1])
    )
      this.sliderRef.current.noUiSlider.set(sliderRange);
  }

  updateInput = sliderRange => {
    let { inputRange } = this.state;
    inputRange = [...inputRange];

    if (sliderRange[0] != this.state.sliderRange[0]) {
      inputRange[0] = sliderRange[0];
    }

    if (sliderRange[1] != this.state.sliderRange[1]) {
      inputRange[1] = sliderRange[1];
    }

    return inputRange;
  };

  handleInputChange = index => e => {
    const { range } = this.props;
    let { sliderRange, inputRange, ignoreMax, ignoreMin } = this.state;

    sliderRange = [...sliderRange];
    inputRange = [...inputRange];

    ignoreMax = index === 1 ? false : ignoreMax;
    ignoreMin = index === 0 ? false : ignoreMin;

    const { value } = e.target;

    inputRange[index] = value;

    const numVal = parseInt(value);

    if (!isNaN(numVal) && index === 0) {
      sliderRange[index] = Math.max(range.min, numVal);
    }

    if (!isNaN(numVal) && index === 1) {
      sliderRange[index] = Math.min(range.max, numVal);
    }

    this.setState({
      isTyping: true,
      inputRange,
      sliderRange,
      ignoreMax,
      ignoreMin
    });
  };

  handleInputBlur = index => () => {
    const { pastInputRange, sliderRange } = this.state;
    let { inputRange } = this.state;

    inputRange = [...inputRange];

    const val = parseInt(inputRange[index]);

    if (isNaN(val)) {
      inputRange[index] = pastInputRange[index];

      this.setState({ isTyping: false, inputRange });
      return;
    }

    this.setState({ isTyping: false });
    this.sliderRef.current.noUiSlider.set(sliderRange);
  };

  handleInputFocus = index => e => {
    let { pastInputRange, inputRange } = this.state;

    pastInputRange = [...pastInputRange];
    inputRange = [...inputRange];

    pastInputRange[index] = e.target.value;
    inputRange[index] = "";

    const newState = { isTyping: true, pastInputRange, inputRange };

    if (index === 0) {
      newState.ignoreMin = false;
    } else if (index === 1) {
      newState.ignoreMax = false;
    }

    this.setState(newState);
  };

  handleInputKeyUp = index => e => {
    if (e.keyCode === 13) {
      this.handleInputBlur(index)(e);
    }
  };

  render() {
    const {
      classes,
      className,
      noMinPlaceholder,
      noMaxPlaceholder
    } = this.props;
    const { ignoreMin, ignoreMax, inputRange } = this.state;

    return (
      <div className={clsx(classes.root, className)}>
        <div ref={this.sliderRef} className={classes.slider} />
        <Input
          className={classes.sliderValue}
          value={ignoreMin ? noMinPlaceholder : inputRange[0]}
          onChange={this.handleInputChange(0)}
          onBlur={this.handleInputBlur(0)}
          onFocus={this.handleInputFocus(0)}
          onKeyUp={this.handleInputKeyUp(0)}
        />
        <Input
          className={classes.sliderValue}
          value={ignoreMax ? noMaxPlaceholder : inputRange[1]}
          onChange={this.handleInputChange(1)}
          onBlur={this.handleInputBlur(1)}
          onFocus={this.handleInputFocus(1)}
          onKeyUp={this.handleInputKeyUp(1)}
        />
      </div>
    );
  }
}

export default withStyles(styles, { name: "SliderWithInput" })(SliderWithInput);
