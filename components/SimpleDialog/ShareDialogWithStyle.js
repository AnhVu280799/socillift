import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from 'components/CustomButtons/IconButton.jsx';
import Close from '@material-ui/icons/Close';
import GridContainer from 'components/Grid/GridContainer.jsx';
import ItemGrid from 'components/Grid/ItemGrid.jsx';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Delete from '@material-ui/icons/Delete';
import Button from 'components/CustomButtons/Button.jsx';
import notificationsStyle from 'assets/jss/material-dashboard-pro-react/views/notificationsStyle.jsx';
import Transition from './Transition';

class ShareDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectUser: -1
    };
  }

  render() {
    const {
      userList,
      isOpen,
      onClose,
      classes,
      onShare,
      onDelete,
      sharedUsers
    } = this.props;
    const { selectUser } = this.state;
    return (
      <Dialog
        classes={{
          root: classes.center,
          paper: `${classes.modal  } ${  classes.minWidth}`
        }}
        open={isOpen}
        transition={Transition}
        keepMounted
        onClose={() => {
          onClose();
        }}
        style={{ textAlign: 'left' }}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <DialogTitle
          style={{ textAlign: 'center' }}
          id="classic-modal-slide-title"
          disableTypography
          className={`${classes.modalHeader  } ${  classes.centerVertical}`}
        >
          <h4 className={`${classes.modalTitle  } ${  classes.inline}`}>
            Share the collection
          </h4>
          <IconButton
            onClick={() => {
              onClose();
              this.setState({ selectUser: -1 });
            }}
            color="infoNoBackground"
            classes={{
              button: classes.floatRight
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <GridContainer>
            <ItemGrid
              className={classes.centerVertical}
              xs={12}
              sm={12}
              md={2}
              lg={2}
            >
              <span style={{ fontWeight: 'bold' }}>Share to</span>
            </ItemGrid>
            <ItemGrid
              className={classes.centerVertical}
              xs={12}
              sm={12}
              md={7}
              lg={7}
            >
              <Select
                fullWidth
                MenuProps={{
                  className: classes.selectMenu,
                  style: { lineHeight: '1.4em' }
                }}
                classes={{
                  select: classes.select
                }}
                value={selectUser}
                onChange={e => this.setState({ selectUser: e.target.value })}
                inputProps={{
                  name: 'simpleSelect',
                  id: 'simple-select'
                }}
              >
                <MenuItem
                  disabled
                  classes={{
                    root: classes.selectMenuItem
                  }}
                  value={-1}
                >
                  Select user
                </MenuItem>
                {Object.keys(userList).map(v => (
                  <MenuItem
                    key={userList[v]._id}
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value={userList[v]._id}
                  >
                    {userList[v].name}
                  </MenuItem>
                ))}
              </Select>
            </ItemGrid>
            <ItemGrid
              className={classes.centerVertical}
              xs={12}
              sm={12}
              md={3}
              lg={3}
            >
              <Button color="info" onClick={() => onShare(selectUser)}>
                Share
              </Button>
            </ItemGrid>
            <ItemGrid
              xs={12}
              sm={12}
              md={12}
              lg={12}
              className={classes.centerVertical}
            >
              <span style={{ fontWeight: 'bold' }}>Shared with</span>
            </ItemGrid>
            {sharedUsers &&
              sharedUsers.map(v => (
                <ItemGrid
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  key={v}
                  className={classes.centerVertical}
                >
                  {userList[v] &&
                    userList[v].name &&
                    `${userList[v].name}, ${typeof userList[v].role ===
                      'object' && ` ${  userList[v].role.name}`}`}
                  <IconButton
                    onClick={() => onDelete(v)}
                    color="dangerNoBackground"
                    classes={{
                      button: classes.floatRight
                    }}
                  >
                    <Delete />
                  </IconButton>
                </ItemGrid>
              ))}
          </GridContainer>
        </DialogContent>
      </Dialog>
    );
  }
}
export default withStyles({
  ...notificationsStyle,
  minWidth: {
    minWidth: '600px'
  },
  centerVertical: {
    display: 'flex',
    alignItems: 'center'
  },
  inline: {
    display: 'inline'
  },
  floatRight: {
    marginLeft: 'auto',
    marginRight: 0
  }
})(ShareDialog);
