import React from 'react';
import PropTypes from 'prop-types';
import MdiIcon from '@mdi/react';
import { mdiWindowClose } from '@mdi/js';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
// custom components
import ModalDialog from 'components/ModalDialog';
import MultiSelect from 'components/MultiSelect/MultiSelect';
import TextInput from "components/TextInput";
import IconButton from 'components/CustomButtons/IconButton.jsx';
import { injectIntl } from 'react-intl';
import styles from "assets/jss/material-dashboard-pro-react/components/shareCollectionModalDialogStyle.jsx"

class ShareCollectionModalDialog extends React.Component {
  onChangeCollectionName = event => {
    this.props.onChangeCollectionName(event.target.value)
  }
  onChangeCollectionDescription = event => {
    this.props.onChangeCollectionDescription(event.target.value)
  }
  render() {
    const {
      classes,
      open,
      onCloseClick,
      onClickCancel,
      onClickShare,
      userListChosen,
      onChangeUserList,
      userList,
      shareUser,
      removeShareUser
    } = this.props;
    const intl = this.props.intl; 
    return (
      <div>
        {
          userList && (<ModalDialog
            keepMounted
            open={open}
            onCloseClick={onCloseClick}
            onClickButton={onClickShare}
            onClickCancel={onClickCancel}
            modalTitle={intl.formatMessage({ defaultMessage: "Share the collection"})}
            buttonText={intl.formatMessage({ defaultMessage: "Share"})}
            cancelText={intl.formatMessage({ defaultMessage: "Cancel"})}
            modalContent={
              <div className={classes.divContent}>
                <div className={classes.subTitle}>{intl.formatMessage({ defaultMessage: "Add users to share"})}</div>
                <MultiSelect
                  options={userList}
                  classes={{
                    Menu: classes.menuRelative
                  }}
                  value={userListChosen}
                  onChange={onChangeUserList}
                  closeMenuOnSelect={false}
                  isSearchable
                  isClearable
                  isMulti
                  placeholder={intl.formatMessage({ defaultMessage: 'Enter user name'})}
                />
              </div>
            }
            modalFooter={
              shareUser && shareUser.length > 0 &&
              (<div>
                <DialogTitle classes={{
                  root: classes.titleDialog
                }} disableTypography>
                  <p className={classes.title}>{`${intl.formatMessage({ defaultMessage: "Share with "})}${shareUser.length} ${intl.formatMessage({ defaultMessage: "person(s)"})}`}</p>
                </DialogTitle>
                <DialogContent
                  classes={{
                    root: classes.contentDialog
                  }}
                >
                  {
                    shareUser && shareUser.map(user => (
                      <Grid container direction='row' xs={12} className={classes.shareList}>
                        <Grid item direction='column' xs={2} alignContent='center' justify='center' className={classes.avatarContainer}>
                          <Icon className={classes.avatarStyle}>
                            {intl.formatMessage({ defaultMessage: "account_circle"})}
                          </Icon>
                        </Grid>
                        <Grid item direction='column' xs={10} className={classes.userInfo} alignContent='flex-start' justify='flex-start'>
                          <Grid item direction='row' xs={12} className={classes.nameDesign}>{user.name}</Grid>
                          <Grid item direction='row' xs={12} className={classes.roleDesign}>{user.role}</Grid>
                          <IconButton
                            color="infoNoBackground"
                            classes={{
                              button: classes.subCloseRight
                            }}
                            onClick={() => removeShareUser(user.id)}
                          >
                            <MdiIcon
                              path={mdiWindowClose}
                              size="16px"
                              color="#999"
                            />
                        </IconButton>
                        </Grid>
                        
                      </Grid>
                    ))
                  }
                </DialogContent>
              </div>)
            }
          />)
        }
      </div>
    )
  }
};
ShareCollectionModalDialog.propTypes = {
};
export default injectIntl(withStyles(styles)(ShareCollectionModalDialog));
