import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "moment-duration-format";

class CountDown extends React.Component {
  static propTypes = {
    format: PropTypes.string, // https://www.npmjs.com/package/moment-duration-format#template-string
    date: PropTypes.object,
    onFinish: PropTypes.func
  };

  static defaultProps = {
    format: "hh:mm:ss",
    date: new Date()
  };

  static getTimeDiff(from, to, format = "hh:mm:ss") {
    let result = moment.duration(0).format(format, { trim: false });

    if (!from || !to) return result;

    const start = moment(from);
    const end = moment(to);

    if (!start.isValid() || !end.isValid() || end.isSameOrBefore(start))
      return result;

    result = moment.duration(end.diff(start)).format(format, { trim: false });

    return result;
  }

  static getDerivedStateFromProps(props, state) {
    if (props.date !== state.date) {
      const now = new Date();

      return {
        date: props.date,
        textDisplay: CountDown.getTimeDiff(now, props.date, props.format)
      };
    }

    return null;
  }

  intervalId = null;

  state = {
    date: null,
    textDisplay: ""
  };

  componentDidMount() {
    this.initInterval();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.date !== this.props.date ||
      prevProps.format !== this.props.format
    ) {
      this.initInterval();
    }
  }

  updateTextDisplay = () => {
    const { date, format } = this.props;
    const now = new Date();
    const textDisplay = CountDown.getTimeDiff(now, date, format);

    this.setState({ textDisplay });
  };

  initInterval = () => {
    let { date, onFinish } = this.props;
    date = moment(date);

    if (!date.isValid()) return;

    clearInterval(this.intervalId);

    this.intervalId = setInterval(() => {
      const now = moment();

      this.updateTextDisplay();

      if (now.isSameOrAfter(date)) {
        clearInterval(this.intervalId);

        if (onFinish) onFinish();

        return;
      }
    }, 1000);
  };

  render() {
    const { textDisplay } = this.state;

    return <>{textDisplay}</>;
  }
}

export default CountDown;
