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

import MdiIcon from '@mdi/react';
import { mdiPlus } from '@mdi/js';

import ControllerContainer from "components/ControllerContainer";
import LeftRightContainer from "components/LeftRightContainer";
import { injectIntl } from 'react-intl';
import controllerCollectionNavStyle from "assets/jss/material-dashboard-pro-react/components/controllerCollectionNavStyle.jsx"

class ControllerAccountsNav extends React.Component {
  render() {
    const {
      classes,
      numberResults,
      filterByRoleOptions,
      filterByRoleOnChange,
      filterByRoleSelectedValue,
      filterByStatusOptions,
      filterByStatusOnChange,
      filterByStatusSelectedValue,
      showingOptions,
      showingSelectedValue,
      showingOnChange,
      filterName,
      filterNameValue,
      onClickNewCollection
    } = this.props;
    const intl = this.props.intl;

    return (
      <ControllerContainer
        topContent={
          <LeftRightContainer
            leftContent={
              <NumberResults number={intl.formatMessage({ defaultMessage: `{numberResults} accounts found`},{numberResults: numberResults})} />
            }
            rightContent={
              <ButtonInf
                color="primary"
                onClick={onClickNewCollection}
                className={classes.newCollection}
                round
              >
                <MdiIcon
                  path={mdiPlus}
                  className={classes.buttonIcon}
                />
                {intl.formatMessage({ defaultMessage: "New Account"})}
              </ButtonInf>
            }
          />
        }
        bottomContent={
          <GridContainer>
            <GridItem xs={12} sm={6} md={6} lg={2}>
              <TextInput
                formLabel= {intl.formatMessage({ defaultMessage: "Name or Email"})}
                textFieldProp={{
                  placeholder: "Enter Name or Email"
                }}
                value={filterNameValue}
                onChange={filterName}
              />
            </GridItem>
            <GridItem xs={12} sm={6} md={6} lg={2}>
              <Selector
                formLabel={intl.formatMessage({ defaultMessage: "Filter by Role"})}
                options={filterByRoleOptions}
                onChange={filterByRoleOnChange}
                value={filterByRoleSelectedValue}
                placeholder="Filter by Role"
                isSearchable={true}
              />
            </GridItem>
            <GridItem xs={12} sm={6} md={6} lg={2}>
              <Selector
                formLabel={intl.formatMessage({ defaultMessage: "Filter by Status"})}
                options={filterByStatusOptions}
                onChange={filterByStatusOnChange}
                value={filterByStatusSelectedValue}
                placeholder="Filter by Status"
                isSearchable={false}
              />
            </GridItem>
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
          </GridContainer>
        }
      />
    )
  }
};

ControllerAccountsNav.propTypes = {
};
export default injectIntl(withStyles(controllerCollectionNavStyle)(ControllerAccountsNav));
