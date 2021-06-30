import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import clsx from "clsx";

import {
  selectFiles,
  removeFile,
  importData
} from "redux/influencer/importer/actions";

import {
  withStyles,
  Paper,
  Typography,
  ButtonBase,
  Button,
  Tooltip,
  CircularProgress
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import DescriptionIcon from "@material-ui/icons/Description";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import { injectIntl } from 'react-intl';
import styles from "./styles";

class UploadZone extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    toggleLoading: PropTypes.func.isRequired,
    notify: PropTypes.func.isRequired,
    listFiles: PropTypes.array.isRequired
  };

  inputFileRef = React.createRef();

  openFileBrowser = () => {
    this.inputFileRef.current.click();
  };

  handleSelectFiles = e => {
    const files = e.target.files ? [...e.target.files] : [];

    this.props.selectFiles(files);

    e.target.value = null;
  };

  handleRemoveFile = fileId => () => {
    this.props.removeFile(fileId);
  };

  handleImportData = () => {
    this.props.importData();

    const filesCount = this.props.listFiles.filter(
      file => file.isValid && file.isUploaded && !file.errorMessage
    ).length;
    const suffix = filesCount === 1 ? "file" : "files";

    this.props.notify(AddAlertIcon, `${filesCount} ${suffix} uploaded!`);
  };

  render() {
    const { classes, linkSampleFile, listFiles } = this.props;
    const intl = this.props.intl;
    const canImport = listFiles.reduce((value, file) => {
      if (file.isUploading) value = false;

      return value;
    }, true);

    return (
      <Paper className={classes.root}>
        <Typography className={classes.title}>
          {intl.formatMessage({ defaultMessage: "Upload Influencers List"})}
        </Typography>
        <Typography className={classes.description}>
        {intl.formatMessage({ defaultMessage: "Please click "+" button to upload files."})} <br />
        {intl.formatMessage({ defaultMessage: "Each file supports format include .xls, .xlsx, file sizes less than"})}
        {intl.formatMessage({ defaultMessage: "500KB and limits 2000 rows."})}
        </Typography>
        <div className={classes.linkSampleFileWrapper}>
          <a
            rel="noopener noreferrer"
            className={classes.linkSampleFile}
            href={linkSampleFile}
          >
            {intl.formatMessage({ defaultMessage: "Download the sample file here.S"})}
          </a>
        </div>
        <div className={classes.fileUploadWrapper}>
          {listFiles.map(file => {
            let WrapperComponent = React.Fragment;
            let wrapperProps = {
              key: file.id
            };

            if (!!file.errorMessage) {
              WrapperComponent = Tooltip;
              wrapperProps.title = file.errorMessage || "";
            }

            return (
              <WrapperComponent {...wrapperProps}>
                <div
                  className={clsx({
                    [classes.blockFile]: true,
                    [classes.blockFileSuccess]:
                      file.isUploaded && !file.errorMessage,
                    [classes.blockFileError]: !!file.errorMessage
                  })}
                >
                  <ButtonBase
                    disabled={file.isUploading}
                    className={classes.buttonRemove}
                    onClick={this.handleRemoveFile(file.id)}
                  >
                    <CancelIcon />
                  </ButtonBase>
                  {file.isUploading ? (
                    <CircularProgress
                      className={classes.iconLoading}
                      size={45}
                      thickness={8}
                    />
                  ) : (
                    <DescriptionIcon className={classes.iconFile} />
                  )}
                  <span className={classes.blockFile__fileName}>
                    {file.name}
                  </span>
                </div>
              </WrapperComponent>
            );
          })}
          {listFiles.length < 5 && (
            <ButtonBase
              className={clsx(classes.blockFile, classes.buttonAdd)}
              onClick={this.openFileBrowser}
            >
              <AddIcon />
            </ButtonBase>
          )}
        </div>
        {!!listFiles.length && (
          <Button
            variant="contained"
            color="primary"
            disabled={!canImport}
            className={classes.buttonImport}
            onClick={this.handleImportData}
          >
            {intl.formatMessage({ defaultMessage: "Import"})}
          </Button>
        )}
        <input
          ref={this.inputFileRef}
          type={intl.formatMessage({ defaultMessage: "file"})}
          multiple
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          className={classes.inputFile}
          onChange={this.handleSelectFiles}
        />
      </Paper>
    );
  }
}

const mapStateToProps = ({ influencer: { importer } }) => ({
  linkSampleFile: importer.linkSampleFile,
  listFiles: importer.listFiles
});

const mapDispatchToProps = {
  selectFiles,
  removeFile,
  importData
};

export default injectIntl(
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles, { name: "UploadZone" })
  )(UploadZone)
) ;
