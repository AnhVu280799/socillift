import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";

// core components
import NumberResults from "components/NumberResults";
import ButtonInf from "components/CustomButtons/ButtonInf";
import SortNav from "components/SortNav";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import TextInput from "components/TextInput";
import Selector from "components/Selector";
import DatePicker from "components/DatePicker";
import MdiIcon from '@mdi/react';
import { mdiFilter } from '@mdi/js';
import { injectIntl } from 'react-intl';
import ControllerContainer from "components/ControllerContainer";
import LeftRightContainer from "components/LeftRightContainer";

import controllerActivityLogsNavStyle from "assets/jss/material-dashboard-pro-react/components/controllerActivityLogsNavStyle.jsx"

class ControllerActivityLogsNav extends React.Component {
  render() {
    const {
      classes,
      numberResults,
      showingOptions,
      showingSelectedValue,
      showingOnChange,
      startDate,
      endDate,
      onChangeStartDate,
      onChangeEndDate,
      onClickFilterLogs
    } = this.props;
    const intl=this.props.intl;

    return (
      <ControllerContainer
        topContent={
          <LeftRightContainer
            leftContent={
              <NumberResults number={intl.formatMessage({ defaultMessage: `{numberResults} logs found`},{numberResults: numberResults})} />
            }
            rightContent={
              <ButtonInf
                color="primary"
                onClick={onClickFilterLogs}
                className={classes.filterButton}
                round
              >
                <MdiIcon
                  path={mdiFilter}
                  className={classes.buttonIcon}
                />
                
                {intl.formatMessage({ defaultMessage: "Search"})}
              </ButtonInf>
            }
          />
        }
        bottomContent={
          <GridContainer>
            {/* <GridItem xs={12} sm={6} md={6} lg={2}>
              <TextInput
                formLabel="Brand name"
                textFieldProp={{
                  placeholder: "Enter brand name"
                }}
                value={filterNameValue}
                onChange={filterName}
              />
            </GridItem> */}
            {/* <GridItem xs={12} sm={6} md={6} lg={2}>
              <Selector
                formLabel="Sort by"
                options={sortByOptions}
                onChange={sortByOnChange}
                value={sortBySelectedValue}
                placeholder="Sort by"
                isSearchable={false}
              />
            </GridItem> */}
            <GridItem xs={12} sm={6} md={6} lg={2}>
              <Selector
                formLabel={intl.formatMessage({ defaultMessage: "Showing"})}
                options={showingOptions}
                onChange={showingOnChange}
                value={showingSelectedValue}
                placeholder="Showing"
                isSearchable={false}
              />
            </GridItem>
            <GridItem xs={12} sm={6} md={6} lg={2}>
              <DatePicker 
                formLabel={intl.formatMessage({ defaultMessage: "From"})}
                value={startDate}
                onChange={onChangeStartDate}
                placeholder="Date Picker Here"
              />
            </GridItem>
            <GridItem xs={12} sm={6} md={6} lg={2}>
              <DatePicker 
                formLabel={intl.formatMessage({ defaultMessage: "To"})}
                value={endDate}
                onChange={onChangeEndDate}
                placeholder="Date Picker Here"
              />
            </GridItem>
          </GridContainer>
        }
      />
    )
  }
};

ControllerActivityLogsNav.propTypes = {
};
export default injectIntl(withStyles(controllerActivityLogsNavStyle)(ControllerActivityLogsNav));
