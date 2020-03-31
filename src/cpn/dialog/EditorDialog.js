import React, { useState, useContext, useEffect, createRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AppContext } from '../../context/AppContext';
import { JsonEditor as Editor } from 'jsoneditor-react';
import { CloudUpload } from '@material-ui/icons';
import LoaderDialog from './LoaderDialog';
import { Fab } from '@material-ui/core';
import SlideUp from '../motion/SlideUp';
import { ID } from '../../utils/toolbox';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: 0,
    height: 48,
    position: 'relative',
    backgroundColor: '#3883fa',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '8px 10%',
    backgroundColor: '#ebebeb',
    width: '100%',
  },
  spaceRight: {
    marginRight: 8,
  },
}));

export default function EditorDialog({
  title,
  children,
  features = [],
  validationSchema,
  onDataLoadingError,
  onDataSubmited,
  onSubmitError,
  fetchFn,
  pushFn,
}) {
  const classes = useStyles();

  const { lang, snack } = useContext(AppContext);

  const [dialogOpened, setDialogOpened] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isSavingData, setIsSavingData] = useState(false);
  const [needRelocation, setNeedRelocation] = useState(false);
  const [touched, setTouched] = useState();
  const [initialData, setInitialData] = useState();
  const [editorCurrentData, setEditorCurrentData] = useState();

  const localData = touched ? editorCurrentData : initialData;

  let editor = createRef();

  useEffect(() => {
    if (editor && editor.current) {
      editor.current.jsonEditor.set(initialData); // https://github.com/vankop/jsoneditor-react/issues/3
      setEditorCurrentData();
      setTouched(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  const handleClickOpen = async () => {
    setDialogOpened(true);
    setIsLoadingData(true);

    try {
      const fetchedData = await fetchFn();
      setInitialData(fetchedData);
    } catch (err) {
      onDataLoadingError(err);
    } finally {
      setIsLoadingData(false);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (!editorCurrentData) {
      snack.info(lang.no_changes_to_save);
      return;
    }

    if (validationSchema) {
      try {
        validationSchema.validateSync(editorCurrentData);
      } catch ({ errors }) {
        errors.forEach(error => snack.error(error));
        return;
      }
    }

    setIsSavingData(true);

    try {
      const pushedData = await pushFn(editorCurrentData);

      snack.success(lang.changes_saved);

      setInitialData();
      setDialogOpened(false);

      if (onDataSubmited) {
        onDataSubmited(pushedData);
      }

      setIsSavingData(false);
    } catch (err) {
      setIsSavingData(false);
      onSubmitError(err);
    }
  }

  const mergeFeatureData = featureData => {
    const mergedData = { ...localData, ...featureData }; // featureData should erase some editorCurrentData properties

    if (editor && editor.current) {
      editor.current.jsonEditor.set(mergedData);

      setEditorCurrentData(mergedData);

      setNeedRelocation(false);

      snack.info(lang.location_data_updated);
    } else {
      console.error(lang.unable_to_update_location);
      snack.info(lang.unable_to_update_location);
    }
  };

  const onEditorDataChange = data => {
    if (localData.address !== data.address) {
      setNeedRelocation(true);
    }
    setEditorCurrentData(data);
    setTouched(true);
  };

  return (
    <>
      {children({ onClick: handleClickOpen })}

      <Dialog
        fullScreen
        disableBackdropClick
        disableEscapeKeyDown
        open={dialogOpened}
        onClose={() => setDialogOpened(false)}
        TransitionComponent={SlideUp}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setDialogOpened(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>

        <LoaderDialog open={isLoadingData} />

        <Editor ref={editor} onChange={onEditorDataChange} />

        <div className={classes.btnContainer}>
          {features.map(feature =>
            feature({
              key: ID(),
              lang: lang,
              snack: snack,
              data: touched ? editorCurrentData : initialData,
              liftDataUp: mergeFeatureData,
            }),
          )}

          <Fab
            key="EditorDialog-Fab"
            size="small"
            color="primary"
            variant="extended"
            onClick={handleSubmit}
            disabled={needRelocation || isSavingData}
          >
            <CloudUpload className={classes.spaceRight} />
            {isSavingData && <CircularProgress size={24} />}{' '}
            <span className={classes.spaceRight}>{lang.save}</span>
          </Fab>
        </div>
      </Dialog>
    </>
  );
}

EditorDialog.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  fetchFn: PropTypes.func.isRequired,
  pushFn: PropTypes.func.isRequired,
  onSubmitError: PropTypes.func.isRequired,
  onDataLoadingError: PropTypes.func.isRequired,
  features: PropTypes.arrayOf(PropTypes.func),
  onDataSubmited: PropTypes.func,
  validationSchema: PropTypes.object,
};
