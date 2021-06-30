import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import Paper from '@material-ui/core/Paper';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Transition from 'components/SimpleDialog/Transition';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import MenuItem from '@material-ui/core/MenuItem';
import GridContainer from 'components/Grid/GridContainer.jsx';
import ItemGrid from 'components/Grid/ItemGrid.jsx';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from 'components/CustomButtons/Button.jsx';
import { injectIntl } from 'react-intl';


const RenderInput = ({ classes, ref, ...other }) => (
  <CustomInput
    formControlProps={{
      fullWidth: true
    }}
    inputProps={{
      inputRef: ref,
      classes: {
        input: classes.input
      },
      ...other
    }}
  />
);

const RenderSuggestion = ({ name }, { query, isHighlighted }) => {
  const matches = match(name, query);
  const parts = parse(name, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => part.highlight ? (
          <span key={String(index)} style={{ fontWeight: 500 }}>
            {part.text}
          </span>
        ) : (
          <strong key={String(index)} style={{ fontWeight: 300 }}>
            {part.text}
          </strong>
        ))}
      </div>
    </MenuItem>
  );
};

const RenderSuggestionsContainer = ({ containerProps, children }) => (
  <Paper {...containerProps} square>
    {children}
  </Paper>
);

const GetSuggestionValue = ({ name }) => (name);

export class CategoryDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      value: '',
      suggestions: [],
      suggestionsConst: [],
      categories: props.categories,
      categoriesConst: [],
      id: props.id,
      score: 100,
      loading: false
    };
  }

  componentWillReceiveProps({
    id,
    postCategories,
    constCategories,
    value,
    isOpen,
    score
  }) {
    if (isOpen) {
      this.setState({
        id,
        suggestionsConst: Object.keys(constCategories).map(key => ({
          name: key
        })),
        categories: postCategories,
        categoriesConst: constCategories,
        value,
        isOpen,
        score
      });
    } else if (!isOpen) {
      this.setState({ isOpen: false });
    }
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    return inputLength === 0
      ? []
      : this.state.suggestionsConst.filter(suggestion => {
        const keep =
          count < 100 &&
          suggestion.name.toLowerCase().slice(0, inputLength) === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
  }

  handleChange = (event, { newValue }) => {
    const { categories } = this.state;
    const categoryPost = categories
      ? categories.filter(cat => cat && cat.name === newValue)
      : [];
    const validCategoryScore =
      categoryPost.length > 0 ? categoryPost[0].score : false;

    this.setState({
      value: newValue,
      score: validCategoryScore > 0 ? validCategoryScore : 100
    });
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const {
      classes,
      onClose,
      title,
      onSaveAndContinue,
      onSaveAndContinueText,
      onSave,
      onSaveText
    } = this.props;
    const intl= this.props.intl;
    const { value, id, categoriesConst, score, loading } = this.state;
    const validName =
      Object.keys(categoriesConst)
        .map(key => key)
        .filter(key => key === value).length > 0;

    return (
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        open={this.state.isOpen}
        transition={Transition}
        keepMounted
        onClose={onClose}
        style={{ textAlign: 'left' }}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <DialogTitle
          style={{ textAlign: 'center' }}
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <h4 className={classes.modalTitle}>{intl.formatMessage({ defaultMessage: "title"})}</h4>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <GridContainer>
            <ItemGrid xs={12} sm={12} md={12} lg={12}>
              <Autosuggest
                theme={{
                  container: classes.container,
                  suggestionsContainerOpen: classes.suggestionsContainerOpen,
                  suggestionsList: classes.suggestionsList,
                  suggestion: classes.suggestion
                }}
                renderInputComponent={RenderInput}
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={
                  this.handleSuggestionsFetchRequested
                }
                onSuggestionsClearRequested={
                  this.handleSuggestionsClearRequested
                }
                renderSuggestionsContainer={RenderSuggestionsContainer}
                getSuggestionValue={GetSuggestionValue}
                renderSuggestion={RenderSuggestion}
                inputProps={{
                  classes,
                  placeholder: intl.formatMessage({defaultMessage: 'Search Category'}),
                  value: this.state.value,
                  onChange: this.handleChange,
                  disabled: loading
                }}
              />
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={12} lg={12}>
              <FormControl fullWidth className={classes.selectFormControl}>
                <InputLabel
                  htmlFor="multiple-select"
                  className={classes.selectLabel}
                >
                  {intl.formatMessage({defaultMessage: "Choose Score"})}
                </InputLabel>
                <Select
                  MenuProps={{
                    className: classes.selectMenu
                  }}
                  classes={{
                    select: classes.select
                  }}
                  value={score}
                  onChange={e => this.setState({ score: e.target.value })}
                  inputProps={{
                    name: 'simpleSelect',
                    id: 'simple-select'
                  }}
                  disabled={!validName || loading}
                >
                  <MenuItem
                    disabled
                    classes={{
                      root: classes.selectMenuItem
                    }}
                    value={0}
                  >
                    {intl.formatMessage({defaultMessage: "Choose Score"})}
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value={20}
                  >
                    {intl.formatMessage({defaultMessage: "20"})}
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value={50}
                  >
                    {intl.formatMessage({defaultMessage: "50"})}
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value={60}
                  >
                    {intl.formatMessage({defaultMessage: "60"})}
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value={80}
                  >
                    {intl.formatMessage({defaultMessage: "80"})}
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value={100}
                  >
                    {intl.formatMessage({defaultMessage: "100"})}
                  </MenuItem>
                </Select>
              </FormControl>
            </ItemGrid>
          </GridContainer>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button
            color="info"
            onClick={() => {
              onSave(id, 'add', {
                cat_id: categoriesConst[value].id,
                name: value,
                score: parseInt(score, 10)
              });
            }}
            disabled={!validName || (validName && score === 0) || loading}
          >
            {onSaveText}
          </Button>
          <Button
            color="info"
            onClick={() => {
              this.setState(
                {
                  loading: true
                },
                () =>
                  onSaveAndContinue(id, 'add', {
                    cat_id: categoriesConst[value].id,
                    name: value,
                    score: parseInt(score, 10)
                  }).then(() => {
                    this.setState({
                      loading: false
                    });
                  })
              );
            }}
            disabled={!validName || (validName && score === 0) || loading}
          >
            {intl.formatMessage({ defaultMessage: "onSaveAndContinueText"})}
          </Button>
          <Button onClick={onClose} color="info">
            {intl.formatMessage({ defaultMessage: "Cancel"})}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default injectIntl (CategoryDialog);