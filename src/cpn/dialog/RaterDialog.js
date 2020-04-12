import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { AppContext } from '../../context/AppContext';

import {
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Input,
  Select,
} from '@material-ui/core';

import { post } from '../../utils/api-client';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',
  },
}));

export default function RaterDialog({
  centerId,
  onRateSubmit,
  children,
  prevRate,
}) {
  const classes = useStyles();

  const { lang, user, updateUser, snack, setLoginDialogOpened } = useContext(
    AppContext,
  );

  const [rate, setRate] = useState(prevRate || ''); // for 'null' value
  const [dialogOpened, setDialogOpened] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpened(true);
  };

  const handleSubmit = async () => {
    if (!user) {
      snack.info(lang.sign_to_rate);
      setLoginDialogOpened(true);
      return;
    }
    
    if (![1, 2, 3, 4, 5].includes(rate)) {
      snack.info(lang.must_rate_boundary);
      return;
    }

    try {
      const data = await post(`/rates/update/by/center/${centerId}`, {
        data: { rate },
      });

      setDialogOpened(false);
      onRateSubmit(data.value);
      snack.success(lang.rate_saved);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        updateUser(null);
        snack.info(lang.sign_to_rate);
        setLoginDialogOpened(true);
      } else {
        snack.error(lang.unable_to_save_rate);
      }
    }
  };

  return (
    <>
      {children({ onClick: handleOpenDialog })}

      <Dialog open={dialogOpened} onClose={() => setDialogOpened(false)}>
        <DialogTitle>{lang.rate_this_center}</DialogTitle>
        <DialogContent>
          <form>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="rate-select">Note</InputLabel>
              <Select
                value={rate}
                onChange={event => setRate(event.target.value)}
                input={<Input id="rate-select" />}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpened(false)} color="secondary">
            {lang.cancel}
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {lang.save}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

RaterDialog.propTypes = {
  centerId: PropTypes.string.isRequired,
  onRateSubmit: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
};
