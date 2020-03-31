import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { get, post } from '../../utils/api-client';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { AppContext } from '../../context/AppContext';
import SlideUp from '../motion/SlideUp';

import CommentCard from '../card/CommentCard';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  message: {
    marginLeft: theme.spacing(2),
  },
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(2),
  },
  formTextField: {
    width: '100%',
  },
  loaderRoot: {
    display: 'flex',
    alignItems: 'center',
  },
  loaderWrapper: {
    margin: theme.spacing(2),
    position: 'relative',
  },
  loaderProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  savingLoaderProgress: {
    color: 'blue',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  savingLoaderWrapper: {
    position: 'relative',
  },
  divider: {
    margin: theme.spacing(2),
  },
}));

export default function CommentsDialog({
  centerId,
  children,
  onCommentSubmit,
}) {
  const classes = useStyles();

  const { lang, user, updateUser, snack, setLoginDialogOpened } = useContext(
    AppContext,
  );

  const initialCurrentPage = 1,
    initialNextPage = 1,
    initialLastPage = 1;

  const [dialogOpened, setDialogOpened] = useState(false);

  const [commentsList, setCommentsList] = useState([]);
  const [nextPage, setNextPage] = useState(initialNextPage);
  const [lastPage, setLastPage] = useState(initialLastPage);
  const [loadingComments, setLoadingComments] = useState(false);

  const [savingComment, setSavingComment] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');

  function reloadCommentsList() {
    setNextPage(initialNextPage);
    setLastPage(initialLastPage);
    loadComments(initialCurrentPage);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!user) {
      snack.info(lang.log_to_comment);
      setLoginDialogOpened(true);
      return;
    }

    setSavingComment(true);

    try {
      const data = await post(`/comments/add/by/${centerId}`, {
        data: { text: newCommentText },
      });

      setNewCommentText('');
      reloadCommentsList();
      onCommentSubmit(data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        updateUser(null);
        snack.info(lang.log_to_post);
        setLoginDialogOpened(true);
      } else {
        snack.error(lang.unable_to_save_comment);
      }
    } finally {
      setSavingComment(false);
    }
  }

  async function loadComments(page) {
    setLoadingComments(true);

    try {
      const data = await get(`/comments/list/by/center/${centerId}`, {
        params: { page: page || nextPage },
      });

      setLastPage(data.page_count);

      if (data.items.length > 0) {
        setCommentsList(
          data.current_page === 1
            ? [...data.items]
            : [...commentsList, ...data.items],
        );
        setNextPage(data.current_page + 1);
      }
    } catch (err) {
      snack.error(lang.unable_to_load_comments);
    } finally {
      setLoadingComments(false);
    }
  }

  const handleClickOpen = () => {
    setDialogOpened(true);
    reloadCommentsList();
  };

  return (
    <>
      {children({ onClick: handleClickOpen })}

      <Dialog
        fullScreen
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
              {lang.comments}
            </Typography>
          </Toolbar>
        </AppBar>
        <form
          className={classes.formContainer}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            required
            multiline
            rows="4"
            margin="normal"
            variant="filled"
            value={newCommentText}
            label={lang.write_your_comment}
            className={classes.formTextField}
            onChange={async e => setNewCommentText(e.currentTarget.value)}
          />
          <div className={classes.loaderRoot}>
            <div className={classes.savingLoaderWrapper}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={savingComment}
              >
                {lang.send}
              </Button>
              {savingComment && (
                <CircularProgress
                  size={24}
                  className={classes.savingLoaderProgress}
                />
              )}
            </div>
          </div>
        </form>

        <Divider className={classes.divider} />

        {commentsList.length === 0 && !loadingComments ? (
          <Typography variant="h6" className={classes.message}>
            {lang.be_first_to_comment}
          </Typography>
        ) : (
          <>
            <List>
              {commentsList.map(comment => (
                <ListItem key={comment._id}>
                  <CommentCard {...comment}></CommentCard>
                </ListItem>
              ))}
            </List>

            {nextPage <= lastPage && (
              <div className={classes.loaderRoot}>
                <div className={classes.loaderWrapper}>
                  <Button
                    variant="outlined"
                    color="primary"
                    disabled={loadingComments}
                    onClick={() => loadComments()}
                  >
                    {lang.more_comments}
                  </Button>
                  {loadingComments && (
                    <CircularProgress
                      size={24}
                      className={classes.loaderProgress}
                    />
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </Dialog>
    </>
  );
}

CommentsDialog.propTypes = {
  centerId: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  onCommentSubmit: PropTypes.func.isRequired,
};
