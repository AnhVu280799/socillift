import React from 'react';
import PropTypes from 'prop-types';
import Scrollbar from 'react-perfect-scrollbar';
import clsx from 'clsx';


import {
  withStyles,
  Drawer,
  Icon,
  Button,
  Radio,
  RadioGroup,
  Checkbox,
  Hidden
} from '@material-ui/core';

import ExpansionPanel from 'components/ExpansionPanel';
import CollapseWithHeader from './CollapseWithHeader';
import SliderWithInput from './SliderWithInput';
import MultiSelect from 'components/MultiSelect/MultiSelect';
import TypingSelect from 'components/TypingSelect';
import Input from './CustomInput';

import { getCategory, getProfessions } from 'apis/api';
import Tracker from 'apis/tracker';
import { injectIntl } from 'react-intl';
import INF_SIZE from 'constants/influencersize';
import INF_TYPE from 'constants/influencertype';
import INF_STATE from 'constants/influencerstates';
import PLATFORMS from 'constants/platforms';
import YOUTUBECATES from 'constants/youtubeCategories';
import PAGECATES from 'constants/pageCategories';
import GENDERS from 'constants/genders';
import MARITAL_STAT from 'constants/maritalstatus';
import AGE_RANGES from 'constants/ageRanges';
import PROVINCES from 'constants/provinces';

import { isNull } from 'util';

import styles from './styles';

const initState = props => ({
  platform: props.platform || 'fb',
  infSize:
    props.infSize ||
    Object.keys(INF_SIZE).reduce((prev, curr) => {
      prev[curr] = false;
      return prev;
    }, {}),
  infType:
    props.infType ||
    Object.keys(INF_TYPE).reduce((prev, curr) => {
      prev[curr] = false;
      return prev;
    }, {}),
  infGender:
    props.infGender ||
    Object.keys(GENDERS).reduce((prev, curr) => {
      prev[curr] = false;
      return prev;
    }, {}),
  infMarital:
    props.infMarital ||
    Object.keys(MARITAL_STAT).reduce((prev, curr) => {
      prev[curr] = false;
      return prev;
    }, {}),
  infState:
    props.infState ||
    Object.keys(INF_STATE).reduce((prev, curr) => {
      prev[curr] = false;
      return prev;
    }, {}),
  infAgeRange: props.infAgeRange || {
    ignoreMax: true,
    ignoreMin: true,
    range: [0, 100]
  },
  infFollowers: props.infFollowers || {
    ignoreMax: true,
    ignoreMin: true,
    range: [5000, 1000000]
  },
  infAvgEng: props.infAvgEng || {
    ignoreMax: true,
    ignoreMin: true,
    range: [100, 2000]
  },
  infCate: props.infCate || [],
  infProf: props.infProf || [],
  infYoutubeCate: props.infYoutubeCate || [],
  infPageCate: props.infPageCate || [],
  infLoc: props.infLoc || [],
  audLoc: props.audLoc || [{ val: null, percent: 0 }],
  audAge: props.audAge || [{ val: null, percent: 0 }],
  audGender: props.audGender || [{ val: null, percent: 0 }],
  audAgeSimple: props.audAgeSimple !== undefined ? props.audAgeSimple : true,
  audLocSimple: props.audLocSimple !== undefined ? props.audLocSimple : true,
  audGenderSimple:
    props.audGenderSimple !== undefined ? props.audGenderSimple : true
});

class FilterDrawer extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onApply: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired
  };

  static getDerivedStateFromProps(props, state) {
    if (state.stateChange) return { ...state, stateChange: false };

    return {
      ...state,
      ...initState(props)
    };
  }

  state = {
    stateChange: false,
    errors: {},
    categoryList: [],
    professionList: [],
    platform: 'fb',
    advancedMetrics: false,
    stateOfInfluencers: false,
    // platformName: 'fb',
    panels: {
      platform: true,
      influencerSize: true,
      influencerType: true,
      influencerDemo: false,
      audienceDemo: false,
      category: true,
      profession: false,
      youtubeCates: false,
      pageCates: false
    },
    advancedFilter: {
      audAgeSimple: false,
      audLocSimple: false,
      audGenderSimple: false
    }
  };

  get canApply() {
    const { errors } = this.state;

    return !Object.keys(errors).filter(key => !!errors[key]).length;
  }

  fetchCategories = async () => {
    const { platform } = this.state;
    const {
      userInfo: { roleId }
    } = this.props;
    

    return new Promise(resolve => {
      getCategory(
        {
          sort_field: 'name',
          sort_type: 1,
          platform,
          role_ids: roleId
        },
        ({ results }) => {
          const categoryList = results.map(({ categoryName }) => ({
            value: categoryName,
            label: categoryName
          }));

          this.setState({ stateChange: true, categoryList }, resolve);
        }
      );
    });
  };

  fetchProfessions = async () => {
    const { platform } = this.state;

    getProfessions(
      {
        sort_field: 'name',
        sort_type: 1,
        platform: platform
      },
      ({ data: { data } }) => {
        const professionList = data.map(({ name }) => ({
          value: name,
          label: name
        }));

        this.setState({ stateChange: true, professionList });
      }
    );
  };

  componentDidMount() {
    this.fetchCategories();
    this.fetchProfessions();
  }

  handleChange = event => {
    this.setState({
      stateChange: true,
      [event.target.name]: event.target.value
    });
  };

  checkError = (
    field,
    { ignoreMin, ignoreMax, range: [min, max] },
    maxVal = 1e10,
    maxMessage = '10 billion'
  ) => {
    let message = null;

    if (!ignoreMax && !ignoreMin && min > max) {
      message = 'Min value should be smaller than Max value';
    } else if (
      (!ignoreMax && (max < 0 || max > maxVal)) ||
      (!ignoreMin && (min < 0 || min > 1e10))
    ) {
      message =
        'The value should be larger than 0 and smaller than ' + maxMessage;
    }

    this.setState({
      stateChange: true,
      errors: { ...this.state.errors, [field]: message }
    });

    return true;
  };

  handleCloseDrawer = () => {
    this.props.onClose();
  };

  handleTogglePanel = key => e => {
    const panels = { ...this.state.panels };

    if (panels[key]) {
      // case close panel
      panels[key] = false;
    } else {
      panels[key] = true;
    }

    this.setState({ stateChange: true, panels });
  };

  handleChangeRadioField = (key, value) => async (e, checked) => {
    if (!checked) return;

    await new Promise(resolve => {
      this.setState({ stateChange: true, [key]: value }, resolve);
    });

    if (key === 'platform') {
      const platform = value;
      const {} = this.props;

      this.fetchCategories();

      if (['fb', 'insta'].includes(platform)) {
        this.fetchProfessions();
      }
    }
  };

  handleChangeCheckField = (key, field) => async (e, checked) => {
    const obj = { ...this.state[key], [field]: checked };

    this.setState({ stateChange: true, [key]: obj });
  };

  handleApplyFilters = () => {
    if (!this.canApply) return;

    const {
      platform,
      infSize,
      infType,
      infGender,
      infMarital,
      infState,
      infAgeRange,
      infFollowers,
      infAvgEng,
      infCate,
      infProf,
      infYoutubeCate,
      infPageCate,
      infLoc,
      audLoc,
      audAge,
      audGender
      // audAgeSimple,
      // audLocSimple,
      // audGenderSimple
    } = this.state;

    this.props.onApply({
      platform,
      infSize,
      infType,
      infGender,
      infMarital,
      infState,
      infAgeRange,
      infFollowers,
      infAvgEng,
      infCate,
      infProf,
      infYoutubeCate,
      infPageCate,
      infLoc,
      audLoc,
      audAge,
      audGender
      // audAgeSimple,
      // audLocSimple,
      // audGenderSimple
    });
  };

  handleResetFilters = e => {
    this.setState({ errors: {} }, () => {
      this.props.onReset(e);
    });
  };

  handleChangeInfluencerAgeRange = infAgeRange => {
    this.checkError('infAgeRange', infAgeRange, 100, '100');
    this.setState({ stateChange: true, infAgeRange });
  };

  handleChangeInfluencerFollowers = infFollowers => {
    this.checkError('infFollowers', infFollowers);
    this.setState({ stateChange: true, infFollowers });
  };

  handleChangeInfluencerAvgEngagement = infAvgEng => {
    this.checkError('infAvgEng', infAvgEng);
    this.setState({ stateChange: true, infAvgEng });
  };

  handleChangeMultiSelect = key => value => {
    this.setState({ stateChange: true, [key]: value });
  };

  handleToggleAdvancedFilter = key => () => {
    const advancedFilter = { ...this.state.advancedFilter };

    if (advancedFilter[key]) {
      // case switch to simple
      advancedFilter[key] = !advancedFilter[key];
    } else {
      advancedFilter[key] = true;
    }

    this.setState({
      stateChange: true,
      advancedFilter
    });
  };

  handleRemoveListItem = (key, index) => () => {
    const list = [...this.state[key]];

    list.splice(index, 1);

    this.setState({ stateChange: true, [key]: list });
  };

  handleChangeListItem = (key, index, value) => {
    const list = [...this.state[key]];

    let percent = value.percent;

    if (Number.isNaN(percent)) {
      percent = '';
    } else {
      if (percent < 0) percent = 0;
      if (percent > 100) percent = 100;
    }

    list[index] =
      !value.val || !value.val.value
        ? { val: null, percent }
        : { ...value, percent };

    this.setState({ stateChange: true, [key]: list });
  };

  handleAddListItem = (key, val) => () => {
    const list = [...this.state[key], val];

    this.setState({ stateChange: true, [key]: list });
  };

  renderRadioField = (title, onChange, checked) => {
    const { classes } = this.props;

    return (
      <div className={classes.item} key={title}>
        <Radio
          className={classes.checkbox}
          classes={{
            checked: classes.radioboxChecked
          }}
          icon={<div className={classes.radioboxBlank} />}
          checked={checked}
          onChange={onChange}
        />
        <span className={classes.checkFieldTitle}>{intl.formatMessage({ defaultMessage: "title"})}</span>
      </div>
    );
  };

  renderCheckField = (title, onChange, checked) => {
    const { classes } = this.props;
    const intl = this.props.intl;

    return (
      <div className={classes.item} key={title}>
        <Checkbox
          className={classes.checkbox}
          icon={<div className={classes.checkboxBlank} />}
          checkedIcon={
            <div className={classes.checkboxChecked}>
              <Icon className={classes.checkIcon}>{intl.formatMessage({ defaultMessage: "check"})}</Icon>
            </div>
          }
          checked={checked}
          onChange={onChange}
        />
        <span className={classes.checkFieldTitle}>{intl.formatMessage({ defaultMessage: "title"})}</span>
      </div>
    );
  };

  renderDrawerContent = () => {
    const {
      classes,
      userInfo: { isExternalAccount, globalPermissions }
    } = this.props;
    const intl = this.props.intl;
    const {
      errors,
      categoryList,
      professionList,
      panels,
      advancedFilter,
      platform,
      infSize,
      infType,
      infAgeRange,
      infLoc,
      infGender,
      infMarital,
      audAge,
      audGender,
      audLoc,
      infCate,
      infProf,
      infYoutubeCate,
      infPageCate,
      infFollowers,
      infAvgEng,
      infState
    } = this.state;

    const { canFilterByInfluencerStates } = globalPermissions || {};

    const platforms = isExternalAccount ? ['page'] : Object.keys(PLATFORMS);
    const influencerSizes = Object.keys(INF_SIZE);
    const influencerTypes = Object.keys(INF_TYPE).filter(
      key => key !== 'potential'
    );
    const provinces = PROVINCES.map(v => ({ value: v, label: v }));
    const genders = Object.keys(GENDERS);
    const maritalStatuses = Object.keys(MARITAL_STAT);
    const ageRanges = AGE_RANGES.map(v => ({ value: v, label: v })).filter(
      ar => !audAge.map(i => i.val && i.val.value).includes(ar.value)
    );
    const Genders = Object.keys(GENDERS).map(v => ({
      value: v,
      label: GENDERS[v]
    }));
    Genders.unshift({ value: null, label: '- ANY -' });
    const youtubeCategories = Object.keys(YOUTUBECATES).map(key => ({
      value: key,
      label: YOUTUBECATES[key]
    }));
    const pageCategories = Object.keys(PAGECATES).map(key => ({
      value: key,
      label: PAGECATES[key]
    }));
    const influencerStates = Object.keys(INF_STATE);

    return (
      <>
        <div className={clsx(classes.titleWrapper, classes.lineAfter)}>
          <span className={classes.title}>{intl.formatMessage({ defaultMessage: "Filter by"})}</span>
          <Icon className={classes.titleIcon} onClick={this.handleCloseDrawer}>
            close
          </Icon>
        </div>
        <Scrollbar
          className={classes.filterWrapper}
          options={{
            suppressScrollX: true,
            wheelPropagation: false
          }}
        >
          <ExpansionPanel
            title={intl.formatMessage({ defaultMessage: "Platform"})}
            open={panels['platform']}
            onClickHeader={this.handleTogglePanel('platform')}
          >
            <div className={classes.itemContainer}>
              <div className={classes.itemGroupPlatform}>
                {platforms.map(key =>
                  this.renderRadioField(
                    PLATFORMS[key],
                    this.handleChangeRadioField('platform', key),
                    platform === key
                  )
                )}
              </div>
            </div>
          </ExpansionPanel>
          <ExpansionPanel
            title={intl.formatMessage({ defaultMessage: "Influencer size"})}
            open={panels['influencerSize']}
            onClickHeader={this.handleTogglePanel('influencerSize')}
          >
            <div className={classes.itemContainer}>
              <div className={classes.itemGroup}>
                {influencerSizes.map(key =>
                  this.renderCheckField(
                    INF_SIZE[key],
                    this.handleChangeCheckField('infSize', key),
                    infSize[key]
                  )
                )}
              </div>
            </div>
          </ExpansionPanel>
          <ExpansionPanel
            title={intl.formatMessage({ defaultMessage: "Influencer type"})}
            display={platform !== 'youtube'}
            open={panels['influencerType']}
            onClickHeader={this.handleTogglePanel('influencerType')}
          >
            <div className={classes.itemContainer}>
              <div className={classes.itemGroup}>
                {influencerTypes.map(key =>
                  this.renderCheckField(
                    INF_TYPE[key],
                    this.handleChangeCheckField('infType', key),
                    infType[key]
                  )
                )}
              </div>
            </div>
          </ExpansionPanel>
          <ExpansionPanel
            title={intl.formatMessage({ defaultMessage: "Influencer Demographic"})}
            display={platform !== 'youtube'}
            open={panels['influencerDemo']}
            onClickHeader={this.handleTogglePanel('influencerDemo')}
          >
            <div className={classes.itemContainer}>
              <div className={classes.itemGroup}>
                <div className={clsx(classes.oneLineItem, classes.itemText)}>
                  {intl.formatMessage({ defaultMessage: "Age Range"})}
                </div>
                {errors.infAgeRange && (
                  <div className={clsx(classes.oneLineItem, classes.error)}>
                    {errors.infAgeRange}
                  </div>
                )}
                <div className={classes.oneLineItem}>
                  <SliderWithInput
                    range={{ min: 0, max: 100 }}
                    start={infAgeRange}
                    step={1}
                    connect={[false, true, false]}
                    onChange={this.handleChangeInfluencerAgeRange}
                    noMinPlaceholder="No Min"
                    noMaxPlaceholder="No Max"
                  />
                </div>
              </div>
              <div className={classes.itemGroup}>
                <div className={clsx(classes.oneLineItem, classes.itemText)}>
                  {intl.formatMessage({ defaultMessage: "Select Location"})}
                </div>
                <div className={classes.oneLineItem}>
                  <MultiSelect
                    options={provinces}
                    value={infLoc}
                    onChange={this.handleChangeMultiSelect('infLoc')}
                    isSearchable
                    closeMenuOnSelect={false}
                    isClearable
                    isMulti
                    placeholder="- ANY -"
                  />
                </div>
              </div>
              <div className={classes.itemGroup}>
                <div className={clsx(classes.oneLineItem, classes.itemText)}>
                  {intl.formatMessage({ defaultMessage: "Select Gender"})}
                </div>
                <div className={classes.checkboxGroup}>
                  {genders.map(key =>
                    this.renderCheckField(
                      GENDERS[key],
                      this.handleChangeCheckField('infGender', key),
                      infGender[key]
                    )
                  )}
                </div>
              </div>
              <div className={classes.itemGroup}>
                <div className={clsx(classes.oneLineItem, classes.itemText)}>
                  {intl.formatMessage({ defaultMessage: "Marital Status"})}
                </div>
                <div className={classes.checkboxGroup}>
                  {maritalStatuses.map(key =>
                    this.renderCheckField(
                      MARITAL_STAT[key],
                      this.handleChangeCheckField('infMarital', key),
                      infMarital[key]
                    )
                  )}
                </div>
              </div>
            </div>
          </ExpansionPanel>
          <ExpansionPanel
            title={intl.formatMessage({ defaultMessage: "Audience Demographic"})}
            display={platform === 'fb' || platform === 'page'}
            open={panels['audienceDemo']}
            onClickHeader={this.handleTogglePanel('audienceDemo')}
          >
            <div className={classes.itemContainer}>
              <div className={classes.itemGroup}>
                <div className={clsx(classes.oneLineItem, classes.itemText)}>
                 {intl.formatMessage({ defaultMessage: " Age Range"})}
                </div>
                <div
                  className={classes.simpleAdvance}
                  onClick={this.handleToggleAdvancedFilter('audAgeSimple')}
                >
                  {advancedFilter['audAgeSimple']
                    ? intl.formatMessage({ defaultMessage: 'Switch to simple filter'})
                    : intl.formatMessage({ defaultMessage: 'Switch to advanced filter'})}
                </div>
                {audAge.map((item, idx) => (
                  <div key={idx} className={classes.oneLineItem}>
                    <Icon
                      className={classes.CancelIcon}
                      onClick={this.handleRemoveListItem('audAge', idx)}
                    >
                      {intl.formatMessage({ defaultMessage: "cancel"})}
                    </Icon>
                    <TypingSelect
                      classes={{
                        container: advancedFilter['audAgeSimple']
                          ? classes.selectionAdv
                          : classes.selectionSimple
                      }}
                      options={ageRanges}
                      value={item.val}
                      onChange={newVal =>
                        this.handleChangeListItem('audAge', idx, {
                          ...item,
                          val: newVal
                        })
                      }
                      placeholder="- ANY -"
                      isSearchable={false}
                    />
                    {advancedFilter['audAgeSimple'] && (
                      <>
                        <Input
                          value={item.percent}
                          type="number"
                          className={classes.percentInput}
                          onChange={({ target: { value: percent } }) =>
                            this.handleChangeListItem('audAge', idx, {
                              ...item,
                              percent: parseInt(percent)
                            })
                          }
                        />
                        <span className={classes.percentSign}>%</span>
                      </>
                    )}
                  </div>
                ))}
                <div className={classes.oneLineItem}>
                  <Button
                    variant="outlined"
                    disabled={audAge.length >= 4}
                    className={classes.addMoreBtn}
                    onClick={this.handleAddListItem('audAge', {
                      val: null,
                      percent: ''
                    })}
                    fullWidth
                  >
                    <span style={{ fontSize: 18 }}>+&nbsp;</span>{intl.formatMessage({ defaultMessage: "ADD MORE"})}
                  </Button>
                </div>
              </div>
              <div className={classes.itemGroup}>
                <div className={clsx(classes.oneLineItem, classes.itemText)}>
                 {intl.formatMessage({ defaultMessage: " Select Gender"})}
                </div>
                <div
                  className={classes.simpleAdvance}
                  onClick={this.handleToggleAdvancedFilter('audGenderSimple')}
                >
                  {advancedFilter['audGenderSimple']
                    ? intl.formatMessage({ defaultMessage: 'Switch to simple filter'})
                    : intl.formatMessage({ defaultMessage: 'Switch to advanced filter'})}
                </div>
                {audGender.map((item, idx) => (
                  <div key={idx} className={classes.oneLineItem}>
                    <TypingSelect
                      options={Genders.filter(
                        ar =>
                          !audGender
                            .map(i => i.val && i.val.value)
                            .includes(ar.value)
                      )}
                      classes={{
                        container: advancedFilter['audGenderSimple']
                          ? classes.selectionAdvGender
                          : classes.selectionSimpleGender
                      }}
                      value={item.val}
                      onChange={newVal =>
                        this.handleChangeListItem('audGender', idx, {
                          ...item,
                          val: newVal
                        })
                      }
                      onDelete={this.handleRemoveListItem('audGender', idx)}
                      placeholder="- ANY -"
                      isSearchable={false}
                    />
                    {advancedFilter['audGenderSimple'] && (
                      <>
                        <Input
                          value={item.percent}
                          type="number"
                          className={classes.percentInput}
                          onChange={({ target: { value: percent } }) =>
                            this.handleChangeListItem('audGender', idx, {
                              ...item,
                              percent: parseInt(percent)
                            })
                          }
                        />
                        <span className={classes.percentSign}>%</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className={classes.itemGroup}>
                <div className={clsx(classes.oneLineItem, classes.itemText)}>
                  {intl.formatMessage({ defaultMessage: "Select Location"})}
                </div>
                <div
                  className={classes.simpleAdvance}
                  onClick={this.handleToggleAdvancedFilter('audLocSimple')}
                >
                  {advancedFilter['audLocSimple']
                    ? intl.formatMessage({ defaultMessage: 'Switch to simple filter'})
                    : intl.formatMessage({ defaultMessage: 'Switch to advanced filter'})}
                </div>
                {audLoc.map((item, idx) => (
                  <div key={idx} className={classes.oneLineItem}>
                    <Icon
                      className={classes.CancelIcon}
                      onClick={this.handleRemoveListItem('audLoc', idx)}
                    >
                     {intl.formatMessage({ defaultMessage: " cancel"})}
                    </Icon>
                    <TypingSelect
                      classes={{
                        container: advancedFilter['audLocSimple']
                          ? classes.selectionAdv
                          : classes.selectionSimple,
                        singleValue: advancedFilter['audLocSimple']
                          ? classes.singleValueAdv
                          : ''
                      }}
                      options={provinces.filter(
                        ar =>
                          !audLoc
                            .map(i => i.val && i.val.value)
                            .includes(ar.value)
                      )}
                      value={item.val}
                      onChange={newVal =>
                        this.handleChangeListItem('audLoc', idx, {
                          ...item,
                          val: newVal
                        })
                      }
                      onDelete={this.handleRemoveListItem('audLoc', idx)}
                      placeholder="- ANY -"
                      isSearchable
                    />
                    {advancedFilter['audLocSimple'] && (
                      <>
                        <Input
                          value={item.percent}
                          type="number"
                          className={classes.percentInput}
                          onChange={({ target: { value: percent } }) =>
                            this.handleChangeListItem('audLoc', idx, {
                              ...item,
                              percent: parseInt(percent)
                            })
                          }
                        />
                        <span className={classes.percentSign}>%</span>
                      </>
                    )}
                  </div>
                ))}
                <div className={classes.oneLineItem}>
                  <Button
                    variant="outlined"
                    disabled={audLoc.length >= 4}
                    className={classes.addMoreBtn}
                    onClick={() =>
                      this.handleAddListItem('audLoc', {
                        val: null,
                        percent: ''
                      })
                    }
                    fullWidth
                  >
                    <span style={{ fontSize: 18 }}>+&nbsp;</span>ADD MORE
                  </Button>
                </div>
              </div>
            </div>
          </ExpansionPanel>
          <ExpansionPanel
            title={intl.formatMessage({ defaultMessage: "Category"})}
            open={panels['category']}
            onClickHeader={this.handleTogglePanel('category')}
          >
            <div className={classes.itemContainer}>
              <div
                className={clsx(classes.itemGroup, classes.multiSelectGroup)}
              >
                <div className={classes.oneLineItem}>
                  <MultiSelect
                    options={categoryList}
                    value={infCate}
                    onChange={this.handleChangeMultiSelect('infCate')}
                    closeMenuOnSelect={false}
                    isSearchable
                    isClearable
                    isMulti
                    placeholder="- ANY -"
                  />
                </div>
              </div>
            </div>
          </ExpansionPanel>
          <ExpansionPanel
            title={intl.formatMessage({ defaultMessage: "Professions"})}
            display={platform === 'fb' || platform === 'insta'}
            open={panels['profession']}
            onClickHeader={this.handleTogglePanel('profession')}
          >
            <div className={classes.itemContainer}>
              <div
                className={clsx(classes.itemGroup, classes.multiSelectGroup)}
              >
                <div className={classes.oneLineItem}>
                  <MultiSelect
                    options={professionList}
                    value={infProf}
                    onChange={this.handleChangeMultiSelect('infProf')}
                    closeMenuOnSelect={false}
                    isSearchable
                    isClearable
                    isMulti
                    placeholder="- ANY -"
                  />
                </div>
              </div>
            </div>
          </ExpansionPanel>
          <ExpansionPanel
            title={intl.formatMessage({ defaultMessage: "Youtube Category"})}
            display={platform === 'youtube'}
            open={panels['youtubeCates']}
            onClickHeader={this.handleTogglePanel('youtubeCates')}
          >
            <div className={classes.itemContainer}>
              <div
                className={clsx(classes.itemGroup, classes.multiSelectGroup)}
              >
                <div className={classes.oneLineItem}>
                  <MultiSelect
                    options={youtubeCategories}
                    value={infYoutubeCate}
                    onChange={this.handleChangeMultiSelect('infYoutubeCate')}
                    closeMenuOnSelect={false}
                    isSearchable
                    isClearable
                    isMulti
                    placeholder="- ANY -"
                  />
                </div>
              </div>
            </div>
          </ExpansionPanel>
          <ExpansionPanel
            title={intl.formatMessage({ defaultMessage: "Facebook Page Category"})}
            display={platform === 'page'}
            open={panels['pageCates']}
            onClickHeader={this.handleTogglePanel('pageCates')}
          >
            <div className={classes.itemContainer}>
              <div
                className={clsx(classes.itemGroup, classes.multiSelectGroup)}
              >
                <div className={classes.oneLineItem}>
                  <MultiSelect
                    options={pageCategories}
                    value={infPageCate}
                    onChange={this.handleChangeMultiSelect('infPageCate')}
                    closeMenuOnSelect={false}
                    isSearchable
                    isClearable
                    isMulti
                    placeholder="- ANY -"
                  />
                </div>
              </div>
            </div>
          </ExpansionPanel>
          <ExpansionPanel
            key="Advanced Metrics"
            title={intl.formatMessage({ defaultMessage: "Advanced Metrics"})}
            open={panels['advancedMetrics']}
            onClickHeader={this.handleTogglePanel('advancedMetrics')}
          >
            <div className={classes.itemContainer}>
              <div className={classes.itemGroup}>
                <div className={clsx(classes.oneLineItem, classes.itemText)}>
                 {intl.formatMessage({ defaultMessage: " No. of followers"})}
                </div>
                {intl.formatMessage({ defaultMessage: "errors.infFollowers"}) && (
                  <div className={clsx(classes.oneLineItem, classes.error)}>
                    {intl.formatMessage({ defaultMessage: "errors.infFollowers"})}
                  </div>
                )}
                <div className={classes.oneLineItem}>
                  <SliderWithInput
                    range={{ min: 5000, max: 1000000 }}
                    start={infFollowers}
                    step={1000}
                    connect={[false, true, false]}
                    onChange={this.handleChangeInfluencerFollowers}
                    noMinPlaceholder="No Min"
                    noMaxPlaceholder="No Max"
                  />
                </div>
              </div>
              <div className={classes.itemGroup}>
                <div className={clsx(classes.oneLineItem, classes.itemText)}>
                  {intl.formatMessage({ defaultMessage: "Avg. Engagement/Post"})}
                </div>
                {intl.formatMessage({ defaultMessage: "errors.infAvgEng"}) && (
                  <div className={clsx(classes.oneLineItem, classes.error)}>
                    {intl.formatMessage({ defaultMessage: "errors.infAvgEng"})}
                  </div>
                )}
                <div className={classes.oneLineItem}>
                  <SliderWithInput
                    range={{ min: 100, max: 2000 }}
                    start={infAvgEng}
                    step={100}
                    connect={[false, true, false]}
                    onChange={this.handleChangeInfluencerAvgEngagement}
                    noMinPlaceholder="No Min"
                    noMaxPlaceholder="No Max"
                  />
                </div>
              </div>
            </div>
          </ExpansionPanel>
          <ExpansionPanel
            title={intl.formatMessage({ defaultMessage: "State of Influencers"})}
            display={canFilterByInfluencerStates}
            open={panels['stateOfInfluencers']}
            onClickHeader={this.handleTogglePanel('stateOfInfluencers')}
          >
            <div className={classes.itemContainer}>
              <div className={classes.itemGroup}>
                {influencerStates.map(key =>
                  this.renderCheckField(
                    INF_STATE[key],
                    this.handleChangeCheckField('infState', key),
                    infState[key]
                  )
                )}
              </div>
            </div>
          </ExpansionPanel>
        </Scrollbar>
        <div className={classes.footer}>
          <Button
            variant="contained"
            className={classes.buttonApply}
            onClick={this.handleApplyFilters}
            classes={{ label: classes.btnLabel }}
          >
           {intl.formatMessage({ defaultMessage: " APPLY FILTER"})}
          </Button>
          <Button
            classes={{ label: classes.btnLabel }}
            variant="contained"
            className={classes.buttonReset}
            onClick={this.handleResetFilters}
          >
            {intl.formatMessage({ defaultMessage: "RESET"})}
          </Button>
        </div>
      </>
    );
  };

  render() {
    const { classes, open } = this.props;

    return (
      <>
        <Hidden smUp>
          <Drawer
            open={open}
            anchor="right"
            variant="temporary"
            className={classes.root}
            classes={{
              paper: clsx({
                [classes.paper]: true,
                [classes.open]: open,
                [classes.close]: !open
              })
            }}
          >
            {this.renderDrawerContent()}
          </Drawer>
        </Hidden>
        <Hidden xsDown>
          <Drawer
            open={open}
            anchor="right"
            variant="permanent"
            className={clsx({
              [classes.root]: true,
              [classes.open]: open,
              [classes.close]: !open
            })}
            classes={{
              paper: clsx({
                [classes.paper]: true,
                [classes.open]: open,
                [classes.close]: !open
              })
            }}
          >
            {this.renderDrawerContent()}
          </Drawer>
        </Hidden>
      </>
    );
  }
}

export default injectIntl (withStyles(styles, { name: 'FilterDrawer' })(FilterDrawer) );
