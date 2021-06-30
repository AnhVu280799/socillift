import React, { Component } from 'react';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import RegularCard from 'components/Cards/RegularCard';
import _ from 'lodash';
import { dispatchFetchResult } from 'reducers/FetchResultReducer';
import MultiSelect from 'components/MultiSelect/MultiSelect';
import { injectIntl } from 'react-intl';
// Redux
import { connect } from 'react-redux';
import {
  retriveInfluencerById,
  retrieveAllCategories,
  receiveAllCategories,
  changeLocation,
  changeName,
  changeBirthYear,
  changeCareer,
  changeGender,
  changeMaritalStatus,
  changePhoneNumber,
  changeEmail,
  changeKind,
  addCategory,
  changeNameCategory,
  changeSubCategory,
  changeRessonanceCategory,
  removeCategory,
  submitEditInfluencers,
  changeState,
  changeNotificationAndMessage,
  goToDetail,
  clearState,
  retriveProfessionAndSuggestionCats,
  updateCategoryByProfessionList,
  retriveSuggestionCats
} from 'reducers/InfluencerEditReducer';

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

// @material-ui/icons
import MailOutline from '@material-ui/icons/MailOutline';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import Close from '@material-ui/icons/Close';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import ItemGrid from 'components/Grid/ItemGrid.jsx';
import IconCard from 'components/Cards/IconCard.jsx';
import HeaderCard from 'components/Cards/HeaderCard.jsx';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TableUI from 'components/Table/Table.jsx';
import AddAlert from '@material-ui/icons/AddAlert';
import Snackbar from 'components/Snackbar/Snackbar.jsx';

// styles
import extendedFormsStyle from 'assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx';
import extendedTablesStyle from 'assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx';
import buttonsStyle from 'assets/jss/material-dashboard-pro-react/views/buttonsStyle.jsx';

// constants
import PROVINCES from 'constants/provinces';
import MARITAL_STATUS from 'constants/maritalstatus';
import GENDERS from 'constants/genders';
import INFLUENCER_KINDS from 'constants/influencerkinds';

import MdiIcon from '@mdi/react';
import { mdiPlus } from '@mdi/js';

import {
  dispatchNotification,
  closeNotification
} from 'reducers/NotificationReducer';
import { verifyRessonancePoint } from 'utils';
import { openLoading, closeLoading } from "reducers/ScreenLoadingReducer";

const visibleCanSubmitForApproval = connectedAuthWrapper({
  authenticatedSelector: state =>
    (state.influencerEdit.influencer.state === 'New' ||
      state.influencerEdit.influencer.state === 'NeedToUpdate' ||
      state.influencerEdit.influencer.state === '') &&
    state.userInfo.globalPermissions !== null &&
    state.userInfo.globalPermissions.canSubmitForApproval,
  wrapperDisplayName: 'visibleCanSubmitForApproval',
  FailureComponent: () => ''
});
const style = theme => ({
  selectCategories: {
    maxHeight: "170px"
  },
  tableUIStyle: {
    overflow: "unset"
  },
  visibleCardHeader: {
    overflow: "visible"
  },
  paddingDiv: {
    padding: theme.defaultContentPadding,
    height: "auto"
  },
  noPaddBottom: {
    paddingBottom: '0px'
  },
  container: {
    flexGrow: 1,
    position: 'relative'
  },
  chip: {
    margin: theme.spacing.unit
  },
  infoText: {
    fontWeight: '300',
    margin: '10px 0 0px',
    textAlign: 'center'
  },
  inputAdornmentIcon: {
    color: '#555'
  },
  inputAdornment: {
    top: '3px',
    position: 'relative'
  },
  suggestionsContainerOpen: {
    zIndex: 1,
    left: 0,
    right: 0
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  ...extendedFormsStyle,
  ...extendedTablesStyle,
  ...buttonsStyle
});

class InfluencerEdit extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.clearState();
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const intl = this.props.intl;
    this.props.openLoading();
    this.props.minimizeSidebar(false);
    this.props.retrieveAllCategories(() => {
      this.props.retriveInfluencerById(id, () => {
        this.props.retriveProfessionAndSuggestionCats({
          page_size: 1000,
          page_index: 0,
          sort_field: 'name',
          sort_type: 1,
          platform: this.props.platform,
        }, () => {
          this.props.closeLoading()
        }).catch(({ status }) => {
          this.props.closeLoading()
          this.props.dispatchFetchResult(status)
        });
      }).catch(({ status }) => {
        this.props.closeLoading()
        this.props.dispatchFetchResult(status)
      });
    }).catch(({ status }) => {
      this.props.closeLoading()
      this.props.dispatchFetchResult(status)
    });
  }

  render() {
    const {
      classes,
      categories,
      profession,
      influencer,
      userInfo,
      platform
    } = this.props; 
    const intl = this.props.intl;
    const VisibleCanSubmitForApproval = visibleCanSubmitForApproval(
      ({ content }) => content
    );

    let realProfession = profession;
    let defaultProfession = influencer && Array.isArray(influencer.career) ? influencer.career.map(({ name, id }) => ({ value: id, label: name })) : [];
    let shouldBlockProfession = false;

    const canEditCategories = userInfo.globalPermissions.canEditInfluencerCategories ? userInfo.globalPermissions.canEditInfluencerCategories : false;
    const isInfluencerAccount = userInfo.globalPermissions.isInfluencerAccount ? userInfo.globalPermissions.isInfluencerAccount : false;

    let professionTitle;
    if (platform === 'fb' || platform === 'insta') {
      professionTitle = intl.formatMessage({ defaultMessage: "Profession Information"})
    }
    if (platform === 'youtube' || platform === 'page') {
      realProfession = influencer.platformCategories ? influencer.platformCategories.map(category => {
        return {
          id: 1,
          name: category.name
        }
      }) : []

      defaultProfession = realProfession.map(profession => {
        return {
          value: profession.id,
          label: profession.name
        }
      });

      shouldBlockProfession = true;
      professionTitle = platform === 'youtube' ? intl.formatMessage({ defaultMessage: "YOUTUBE CATEGORY"}) : intl.formatMessage({ defaultMessage: "FACEBOOK PAGE CATEGORY"})
    }

    return (this.props.influencer &&
      (this.props.influencer.id && (
        <div className={classes.paddingDiv}>
          <RegularCard
            content={
              <GridContainer>
                <ItemGrid xs={12} sm={12} lg={12} md={12}>
                  <Snackbar
                    place="tr"
                    color={
                      !_.isEmpty(this.props.errorMessage, true)
                        ? intl.formatMessage({ defaultMessage:'warning' })
                        : intl.formatMessage({ defaultMessage: 'success'})
                    }
                    icon={AddAlert}
                    message={
                      this.props.message ? this.props.message : ''
                    }
                    open={this.props.notification}
                    closeNotification={() =>
                      this.props.changeNotificationAndMessage({
                        notification: false,
                        message: ''
                      })
                    }
                    close
                  />
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={12}>
                  <HeaderCard
                    className={classes.visibleCardHeader}
                    cardTitle={intl.formatMessage({ defaultMessage: "Influencer Information"})}
                    headerColor={intl.formatMessage({ defaultMessage: "rose"})}
                    content={
                      <GridContainer>
                        <ItemGrid xs={12} sm={12} md={12}>
                          <IconCard
                            icon={MailOutline}
                            iconColor={intl.formatMessage({ defaultMessage: "rose"})}
                            title={intl.formatMessage({ defaultMessage: "Basic Information"})}
                            content={
                              <GridContainer>
                                <ItemGrid xs={12} sm={6} md={6} lg={6}>
                                  <CustomInput
                                    labelText={intl.formatMessage({ defaultMessage: "Name *"})}
                                    id="name"
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                    inputProps={{
                                      onChange: event =>
                                        this.props.changeName(
                                          event.target.value
                                        ),
                                      type: 'text',
                                      value: this.props.influencer.name
                                    }}
                                  />
                                  <CustomInput
                                    labelText={intl.formatMessage({ defaultMessage: "Birth Year"})}
                                    id="birthYear"
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                    inputProps={{
                                      onChange: event =>
                                        this.props.changeBirthYear(
                                          event.target.value
                                        ),
                                      type: 'text',
                                      value:
                                        this.props.influencer.birthYear
                                    }}
                                  />
                                  <GridContainer>
                                    <ItemGrid xs={12} sm={2}>
                                      <FormLabel
                                        className={
                                          classes.labelHorizontal +
                                          ' ' +
                                          classes.labelHorizontalRadioCheckbox
                                        }
                                      >
                                       {intl.formatMessage({ defaultMessage: "Gender"})}  &nbsp; &nbsp; &nbsp;
                                        &nbsp;
                                            </FormLabel>
                                    </ItemGrid>
                                    <ItemGrid xs={12} sm={10}>
                                      <div
                                        className={
                                          classes.checkboxAndRadio +
                                          ' ' +
                                          classes.checkboxAndRadioHorizontal
                                        }
                                      >
                                        {Object.keys(GENDERS).map(
                                          (k, idx) => (
                                            <FormControlLabel
                                              key={idx}
                                              control={
                                                <Radio
                                                  checked={
                                                    this.props
                                                      .influencer
                                                      .gender === k
                                                  }
                                                  onClick={event =>
                                                    this.props.changeGender(
                                                      event.target.value
                                                    )
                                                  }
                                                  value={k}
                                                  name="radio button enabled"
                                                  aria-label={k}
                                                  icon={
                                                    <FiberManualRecord
                                                      className={
                                                        classes.radioUnchecked
                                                      }
                                                    />
                                                  }
                                                  checkedIcon={
                                                    <FiberManualRecord
                                                      className={
                                                        classes.radioChecked
                                                      }
                                                    />
                                                  }
                                                  classes={{
                                                    checked:
                                                      classes.radio
                                                  }}
                                                />
                                              }
                                              classes={{
                                                label: classes.label
                                              }}
                                              label={GENDERS[k]}
                                            />
                                          )
                                        )}
                                      </div>
                                    </ItemGrid>
                                  </GridContainer>
                                </ItemGrid>
                                <ItemGrid xs={12} sm={6} md={6} lg={6}>
                                  <FormControl
                                    fullWidth
                                    className={
                                      classes.selectFormControl
                                    }
                                  >
                                    <InputLabel
                                      htmlFor="simple-select"
                                      className={classes.selectLabel}
                                    >
                                     {intl.formatMessage({ defaultMessage: "Choose Location"})} 
                                          </InputLabel>
                                    <Select
                                      value={
                                        this.props.influencer.location
                                          ? this.props.influencer
                                            .location
                                          : ''
                                      }
                                      onChange={e =>
                                        this.props.changeLocation(
                                          e.target.value
                                        )
                                      }
                                      MenuProps={{
                                        className: classes.selectMenu
                                      }}
                                      classes={{
                                        select: classes.select
                                      }}
                                      inputProps={{
                                        name: 'location',
                                        id: 'location'
                                      }}
                                    >
                                      <MenuItem
                                        disabled
                                        classes={{
                                          root: classes.selectMenuItem
                                        }}
                                      >
                                        {intl.formatMessage({ defaultMessage: "Location"})}
                                            </MenuItem>
                                      <MenuItem
                                        classes={{
                                          root: classes.selectMenuItem
                                        }}
                                        value=""
                                      >
                                        {intl.formatMessage({ defaultMessage: "Unknown"})}
                                            </MenuItem>
                                      {PROVINCES.map(v => (
                                        <MenuItem
                                          key={v}
                                          classes={{
                                            root:
                                              classes.selectMenuItem,
                                            selected:
                                              classes.selectMenuItemSelected
                                          }}
                                          value={v}
                                        >
                                          {v}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                  <GridContainer>
                                    <ItemGrid xs={12} sm={2}>
                                      <FormLabel
                                        className={
                                          classes.labelHorizontal +
                                          ' ' +
                                          classes.labelHorizontalRadioCheckbox
                                        }
                                      >
                                       {intl.formatMessage({ defaultMessage: " Marital Status"})}
                                            </FormLabel>
                                    </ItemGrid>
                                    <ItemGrid xs={12} sm={10}>
                                      <div
                                        className={
                                          classes.checkboxAndRadio +
                                          ' ' +
                                          classes.checkboxAndRadioHorizontal
                                        }
                                      >
                                        {Object.keys(
                                          MARITAL_STATUS
                                        ).map((v, idx) => (
                                          <FormControlLabel
                                            key={idx}
                                            control={
                                              <Radio
                                                checked={
                                                  this.props.influencer
                                                    .maritalStatus ===
                                                  MARITAL_STATUS[v]
                                                }
                                                onChange={event =>
                                                  this.props.changeMaritalStatus(
                                                    event.target.value
                                                  )
                                                }
                                                value={
                                                  MARITAL_STATUS[v]
                                                }
                                                name="radio button enabled"
                                                aria-label="A"
                                                icon={
                                                  <FiberManualRecord
                                                    className={
                                                      classes.radioUnchecked
                                                    }
                                                  />
                                                }
                                                checkedIcon={
                                                  <FiberManualRecord
                                                    className={
                                                      classes.radioChecked
                                                    }
                                                  />
                                                }
                                                classes={{
                                                  checked: classes.radio
                                                }}
                                              />
                                            }
                                            classes={{
                                              label: classes.label
                                            }}
                                            label={MARITAL_STATUS[v]}
                                          />
                                        ))}
                                      </div>
                                    </ItemGrid>
                                  </GridContainer>
                                </ItemGrid>
                              </GridContainer>
                            }
                          />
                          {!isInfluencerAccount && (
                            <IconCard
                              icon={MailOutline}
                              iconColor={intl.formatMessage({ defaultMessage: "rose"})}
                              title={intl.formatMessage({ defaultMessage: "Social Media Information"})}
                              content={
                                <GridContainer>
                                  <ItemGrid xs={12} sm={6} md={6} lg={8}>
                                    <GridContainer>
                                      <ItemGrid xs={12} sm={5}>
                                        <FormLabel
                                          className={
                                            classes.labelHorizontal +
                                            ' ' +
                                            classes.labelHorizontalRadioCheckbox
                                          }
                                        >
                                          {intl.formatMessage({ defaultMessage: "Influencer Type"})}
                                        </FormLabel>
                                      </ItemGrid>
                                      <ItemGrid xs={12} sm={7}>
                                        <div
                                          className={
                                            classes.checkboxAndRadio +
                                            ' ' +
                                            classes.checkboxAndRadioHorizontal
                                          }
                                        >
                                          {Object.keys(
                                            INFLUENCER_KINDS
                                          ).map((k, idx) => (
                                            <FormControlLabel
                                              key={idx}
                                              control={
                                                <Radio
                                                  checked={
                                                    this.props.influencer
                                                      .kind === k
                                                  }
                                                  onChange={event =>
                                                    this.props.changeKind(
                                                      event.target.value
                                                    )
                                                  }
                                                  value={k}
                                                  name="radio button enabled"
                                                  aria-label={intl.formatMessage({ defaultMessage: "A"})}
                                                  icon={
                                                    <FiberManualRecord
                                                      className={
                                                        classes.radioUnchecked
                                                      }
                                                    />
                                                  }
                                                  checkedIcon={
                                                    <FiberManualRecord
                                                      className={
                                                        classes.radioChecked
                                                      }
                                                    />
                                                  }
                                                  classes={{
                                                    checked: classes.radio
                                                  }}
                                                />
                                              }
                                              classes={{
                                                label: classes.label
                                              }}
                                              label={INFLUENCER_KINDS[k]}
                                            />
                                          ))}
                                        </div>
                                      </ItemGrid>
                                    </GridContainer>
                                  </ItemGrid>
                                </GridContainer>
                              }
                            />
                          )}
                        </ItemGrid>
                      </GridContainer>
                    }
                  />
                </ItemGrid>
                {canEditCategories && (<ItemGrid xs={12} sm={12} md={12}>
                  <IconCard
                    icon={MailOutline}
                    iconColor="rose"
                    title={professionTitle}
                    content={
                      <GridContainer>
                        <ItemGrid xs={12} sm={12} md={12} lg={12}>
                          <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                          >
                            <MultiSelect
                              closeMenuOnSelect={false}
                              defaultValue={defaultProfession}
                              isMulti
                              isDisabled={shouldBlockProfession}
                              options={realProfession.map(({ id, name }) => ({ value: id, label: name }))}
                              onChange={professionChosen => {
                                const selectItem = professionChosen.map(({ label }) =>
                                  (label)).filter(valueElement => !influencer.career.map(({ name }) => (name)).includes(valueElement));
                                this.props.changeCareer(professionChosen.map(({ value, label }) => ({ id: value, name: label })))
                                if (selectItem.length > 0) {
                                  this.props.retriveSuggestionCats({
                                    page_size: 1000,
                                    page_index: 0,
                                    sort_field: 'name',
                                    sort_type: 1,
                                    name: selectItem,
                                    search_name_exact: 1,
                                    platform: platform,
                                  }, () => { }).catch(({ status }) => {
                                    this.props.dispatchFetchResult(status)
                                  });
                                }
                              }}
                              className='react-select-container-three-column'
                              classNamePrefix='react-select-three-column'
                              isWheelPropagation
                            />
                          </FormControl>
                        </ItemGrid>
                      </GridContainer>
                    }
                  />
                </ItemGrid>)}
                {canEditCategories && (
                  <ItemGrid xs={12} sm={12} md={12}>
                    <HeaderCard
                      className={classes.visibleCardHeader}
                      cardTitle={intl.formatMessage({ defaultMessage: "Category of Influencer"})}
                      headerColor={intl.formatMessage({ defaultMessage:"rose" })}
                      content={
                        <div>
                          <TableUI
                            customDiv={classes.tableUIStyle}
                            tableHead={isInfluencerAccount ? [
                              intl.formatMessage({ defaultMessage: 'Category'}),
                              intl.formatMessage({ defaultMessage: 'Actions'})
                            ] : [
                              intl.formatMessage({ defaultMessage: 'Category'}),
                              intl.formatMessage({ defaultMessage: 'Resonance Score'}),
                              intl.formatMessage({ defaultMessage: 'Actions'})
                            ]}
                            tableData={
                              this.props.influencer.categories
                                ? this.props.influencer.categories.map(
                                  (v, i) => isInfluencerAccount ? [
                                    <FormControl
                                      fullWidth
                                      className={
                                        classes.selectFormControl
                                      }
                                    >
                                      <div style={{ marginTop: '15px', textAlign: 'left' }}>
                                        <MultiSelect
                                          value={v.categoryName ? { value: v.categoryCode, label: v.categoryName } : ''}
                                          options={Object.keys(categories).map(nameKey => ({ index: i, value: categories[nameKey].categoryCode, label: nameKey }))}
                                          onChange={categoryChosen => {
                                            this.props.changeNameCategory(categoryChosen.index, categoryChosen.value, categoryChosen.label)
                                          }}
                                          isOptionDisabled={({ label }) => this.props.influencer.categories.map(cat => cat.categoryName).includes(label)}
                                          className={classes.selectCategories}
                                          maxMenuHeight={160}
                                          isWheelPropagation
                                        />
                                      </div>
                                    </FormControl>,
                                    <Button
                                      color="info"
                                      customClass={classes.actionButton}
                                      key={i}
                                      onClick={() =>
                                        this.props.removeCategory(i)
                                      }
                                    >
                                      <Close className={classes.icon} />
                                    </Button>
                                  ] : [
                                    <FormControl
                                      fullWidth
                                      className={
                                        classes.selectFormControl
                                      }
                                    >
                                      <div style={{ marginTop: '15px', textAlign: 'left' }}>
                                        <MultiSelect
                                          value={v.categoryName ? { value: v.categoryCode, label: v.categoryName } : ''}
                                          options={Object.keys(categories).map(nameKey => ({ index: i, value: categories[nameKey].categoryCode, label: nameKey }))}
                                          onChange={categoryChosen => {
                                            this.props.changeNameCategory(categoryChosen.index, categoryChosen.value, categoryChosen.label)
                                          }}
                                          isOptionDisabled={({ label }) => this.props.influencer.categories.map(cat => cat.categoryName).includes(label)}
                                          className={classes.selectCategories}
                                          maxMenuHeight={160}
                                          isWheelPropagation
                                        />
                                      </div>
                                    </FormControl>,
                                    <CustomInput
                                      labelText={intl.formatMessage({ defaultMessage: "Relevance Score"})}
                                      id="ressonnancePoint"
                                      formControlProps={{
                                        fullWidth: true,
                                        style: { paddingBottom: '0px' }
                                      }}
                                      inputProps={{
                                        onChange: e =>
                                          this.props.changeRessonanceCategory(
                                            i,
                                            e.target.value
                                          ),
                                        type: 'text',
                                        value: v.ressonancePoint
                                          ? v.ressonancePoint
                                          : ''
                                      }}
                                    />,
                                    <Button
                                      color="info"
                                      customClass={classes.actionButton}
                                      key={i}
                                      onClick={() =>
                                        this.props.removeCategory(i)
                                      }
                                    >
                                      <Close className={classes.icon} />
                                    </Button>
                                  ]
                                )
                                : [['#', '#', '#']]
                            }
                            customCellClasses={isInfluencerAccount ? [
                              classes.center + ' ' + classes.customWidth,
                              classes.right
                            ] : [
                              classes.center,
                              classes.right,
                              classes.right
                            ]}
                            customClassesForCells={[0, 0]}
                            customHeadCellClasses={isInfluencerAccount ? [
                              classes.center,
                              classes.right
                            ] : [
                              classes.center,
                              classes.right,
                              classes.right
                            ]}
                            customHeadClassesForCells={[0, 4, 5]}
                          />
                          <Button
                            className={classes.button}
                            color="info"
                            disabled={
                              this.props.influencer.categories
                                ? this.props.influencer.categories
                                  .length >=
                                this.props.categories.length
                                : false
                            }
                            onClick={e => {
                              this.props.addCategory(
                                this.props.influencer.categories
                                  ? this.props.influencer.categories
                                    .length
                                  : 0,
                                {
                                  categoryName: '',
                                  ressonancePoint: 0,
                                  children: []
                                }
                              );
                            }}
                          >
                            <MdiIcon
                              path={mdiPlus}
                              size='32px'
                            />
                          </Button>
                        </div>
                      }
                    />
                  </ItemGrid>)}
                <ItemGrid xs={12} sm={12} md={12}>
                  <div>
                    <Button
                      className={classes.button}
                      color="info"
                      onClick={e => {
                        this.props.openLoading();
                        let errorMessages = Object.keys(
                          this.props.errorMessage
                        ).filter(keyError => this.props.errorMessage[keyError] !== '')
                          .map(k => `${k}: invalid`)
                          .join('\n');

                        if (
                          !errorMessages
                          && this.props.influencer.categories
                          && this.props.influencer.categories.length
                        ) {
                          const found = this.props.influencer.categories.find(({ ressonancePoint }) => !verifyRessonancePoint(ressonancePoint || ''));

                          if (found) errorMessages = intl.formatMessage({ defaultMessage: 'ressonancePointCategoriesState: invalid'});
                        }

                        if (errorMessages === 'ressonancePointCategoriesState: invalid') {
                          errorMessages = intl.formatMessage({ defaultMessage: `Resonance Point Categories State: invalid`});
                        }

                        if (errorMessages) {
                          this.props.closeLoading();
                          this.props.dispatchNotification(
                            {
                              message: errorMessages
                                ? errorMessages
                                : intl.formatMessage({ defaultMessage: 'Updated Successful'}),
                              open: true,
                              icon: AddAlert,
                              color: errorMessages
                                ? intl.formatMessage({ defaultMessage: 'danger'})
                                : intl.formatMessage({ defaultMessage: 'success'})
                            },
                            2000
                          );
                        } else {
                          const { state, ...influencerNoState } = this.props.influencer;
                          let submitInfluencer = influencerNoState
                          if (platform !== 'fb' && platform !== 'insta') {
                            const { platformCategories, career, ...finalInfluencer } = influencerNoState;
                            submitInfluencer = finalInfluencer
                          }

                          // prepare valid data before send request
                          if (submitInfluencer.categories && submitInfluencer.categories.length) {
                            submitInfluencer.categories = submitInfluencer.categories.map(
                              ({ id, categoryCode, categoryName, ressonancePoint }) => {
                                const relevanceScore = Number(ressonancePoint);

                                return ({ id, categoryCode, categoryName, ressonancePoint: Number.isFinite(relevanceScore) ? relevanceScore : 0 })
                              }
                            );
                          }
                          
                          this.props.submitEditInfluencers(
                            submitInfluencer,
                            this.props.isChangeKind,
                            json => {
                              if (json.ok) {
                                this.props.dispatchNotification(
                                  {
                                    message: errorMessages
                                      ? errorMessages
                                      : intl.formatMessage({ defaultMessage: 'Updated Successful'}),
                                    open: true,
                                    icon: AddAlert,
                                    color: errorMessages
                                      ? intl.formatMessage({ defaultMessage:'danger' })
                                      : intl.formatMessage({ defaultMessage: 'success'})
                                  },
                                  2000
                                );
                              }
                              this.props.closeLoading();
                              if (isInfluencerAccount) {
                                this.props.history.push(intl.formatMessage({ defaultMessage: '/influencer-dashboard'}))
                              } else {
                                this.props.goToDetail(
                                  this.props.influencer
                                );
                              }
                            },
                            (response) => response.json().then(({ code, message }) => {
                              this.props.closeLoading();
                              if (code === 400) {
                                this.props.dispatchNotification(
                                  {
                                    message: message,
                                    open: true,
                                    icon: AddAlert,
                                    color: 'danger'
                                  },
                                  2000
                                );
                              }

                              this.props.dispatchFetchResult(response.status);
                            })
                          );
                        }
                      }}
                    >
                      SAVE
                    </Button>
                    <VisibleCanSubmitForApproval
                      content={
                        <Button
                          className={classes.button}
                          color="info"
                          onClick={e => {
                            let errorMessages = Object.keys(this.props.errorMessage).filter(keyError => this.props.errorMessage[keyError] !== '')
                              .map(k => `${k}: invalid`)
                              .join('\n');

                            if (
                              !errorMessages
                              && this.props.influencer.categories
                              && this.props.influencer.categories.length
                            ) {
                              const found = this.props.influencer.categories.find(({ ressonancePoint }) => !verifyRessonancePoint(ressonancePoint || ''));

                              if (found) errorMessages = intl.formatMessage({ defaultMessage: 'ressonancePointCategoriesState: invalid'});
                            }

                            if (errorMessages === 'ressonancePointCategoriesState: invalid') {
                              errorMessages = intl.formatMessage({ defaultMessage: `Resonance Point Categories State: invalid`});
                            }

                            if (errorMessages) {
                              this.props.dispatchNotification({
                                message: errorMessages
                                  ? errorMessages
                                  : intl.formatMessage({ defaultMessage: 'Updated Successful'}),
                                open: true,
                                icon: AddAlert,
                                color: errorMessages
                                  ? intl.formatMessage({ defaultMessage:'danger' })
                                  : intl.formatMessage({ defaultMessage: 'success'})
                              });
                            } else {
                              const { state, ...influencerNoState } = this.props.influencer;
                              let submitInfluencer = influencerNoState
                              if (platform !== 'fb' && platform !== 'insta') {
                                const { platformCategories, career, ...finalInfluencer } = influencerNoState;
                                submitInfluencer = finalInfluencer
                              }

                              // prepare valid data before send request
                              if (submitInfluencer.categories && submitInfluencer.categories.length) {
                                submitInfluencer.categories = submitInfluencer.categories.map(
                                  ({ id, categoryCode, categoryName, ressonancePoint }) => {
                                    const relevanceScore = Number(ressonancePoint);

                                    return ({ id, categoryCode, categoryName, ressonancePoint: Number.isFinite(relevanceScore) ? relevanceScore : 0 })
                                  }
                                );
                              }

                              this.props.submitEditInfluencers(
                                {
                                  ...submitInfluencer,
                                  state: 'PendingForApproval'
                                },
                                this.props.isChangeKind,
                                json => {
                                  if (json.ok) {
                                    this.props.dispatchNotification({
                                      message: errorMessages
                                        ? errorMessages
                                        : intl.formatMessage({ defaultMessage: 'Updated Successful'}),
                                      open: true,
                                      icon: AddAlert,
                                      color: errorMessages
                                        ? intl.formatMessage({ defaultMessage: 'danger'})
                                        : intl.formatMessage({ defaultMessage: 'success'})
                                    });
                                  }
                                  this.props.goToDetail(
                                    this.props.influencer
                                  );
                                },
                                (response) => response.json().then(({ code, message }) => {
                                  if (code === 400) {
                                    this.props.dispatchNotification(
                                      {
                                        message: message,
                                        open: true,
                                        icon: AddAlert,
                                        color: 'danger'
                                      },
                                      2000
                                    );
                                  }
                                  this.props.dispatchFetchResult(response.status);
                                })
                              );
                            }
                          }}
                        >
                          {intl.formatMessage({ defaultMessage: "SUBMIT FOR APPROVAL"})}
                        </Button>
                      }
                    />
                    <Button
                      className={classes.button}
                      color="info"
                      onClick={e => {
                        if (isInfluencerAccount) {
                          this.props.history.push(intl.formatMessage({ defaultMessage: '/influencer-dashboard'}));
                        } else {
                          this.props.goToDetail(
                            this.props.influencer
                          );
                        }
                      }}
                      style={{ float: 'right' }}
                    >
                      {intl.formatMessage({ defaultMessage: "CANCEL"})}
                    </Button>
                  </div>
                </ItemGrid>
              </GridContainer>
            }
          />
        </div>
      ))
    );
  }
}
const mapStateToProps = ({ influencerEdit, userInfo }, ownProps) => {
  return {
    ...influencerEdit,
    userInfo,
    ownProps
  };
};
const mapDispatchToProps = {
  retriveInfluencerById,
  retrieveAllCategories,
  receiveAllCategories,
  changeLocation,
  changeName,
  changeBirthYear,
  changeCareer,
  changeGender,
  changeMaritalStatus,
  changePhoneNumber,
  changeEmail,
  changeKind,
  addCategory,
  changeNameCategory,
  changeSubCategory,
  changeRessonanceCategory,
  removeCategory,
  submitEditInfluencers,
  changeState,
  changeNotificationAndMessage,
  goToDetail,
  clearState,
  dispatchFetchResult,
  dispatchNotification,
  closeNotification,
  retriveProfessionAndSuggestionCats,
  updateCategoryByProfessionList,
  retriveSuggestionCats,
  openLoading,
  closeLoading
};
export default injectIntl (
  connect(mapStateToProps, mapDispatchToProps)(
    withStyles(style)(InfluencerEdit)
  )
);
