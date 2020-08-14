import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import { createAutomplete } from '../../utils/google-places';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    display: 'flex',
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    minHeight: 36,
    [theme.breakpoints.between('xs', 'sm')]: {
      width: 100,
      '&:focus': {
        width: 155,
      },
    },
    [theme.breakpoints.up('sm')]: {
      width: 200,
      '&:focus': {
        width: 300,
      },
    },
  },
  closeIcon: {
    cursor: 'pointer',
    color: fade(theme.palette.common.white, 0.95),
    '&:hover': {
      color: fade(theme.palette.common.white, 0.25),
    },
  },
}));

export default function PlacesAutocomplete({
  id,
  lang,
  inputProps,
  inputBaseProps,
  onPlaceChanged,
  inputDefaultValue = '',
}) {
  const classes = useStyles();

  const [inputValue, setInputValue] = useState(inputDefaultValue);
  const [isPlaceSettled, setIsPlaceSettled] = useState(false);

  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);

    if (isPlaceSettled && !(inputValue && inputValue.length > 0)) {
      onPlaceChanged(null);
      setIsPlaceSettled(false);
    }
  };

  useEffect(() => setInputValue(inputDefaultValue), [inputDefaultValue]);

  useEffect(() => {
    let autocomplete;
    try {
      autocomplete = createAutomplete(id, { types: ['geocode'] });
    } catch (err) {
      console.error(err);
      alert(lang.unable_to_reach_network + '\n' + lang.check_network);
    }
    if (autocomplete) {
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        alert(`place_changed ${JSON.stringify(place)}`);

        if (place && place.place_id) {
          setInputValue(place.formatted_address);
        }

        onPlaceChanged(place);
        setIsPlaceSettled(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        id={id}
        onChange={(e) => handleInputChange(e.target.value)}
        value={inputValue}
        {...inputBaseProps}
        inputProps={inputProps}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
      />
      {inputValue && inputValue.length !== 0 && (
        <IconButton
          aria-label="clear"
          onClick={() => handleInputChange(inputDefaultValue)}
        >
          <CloseIcon className={classes.closeIcon} />
        </IconButton>
      )}
    </div>
  );
}

PlacesAutocomplete.propTypes = {
  id: PropTypes.string.isRequired,
  lang: PropTypes.object.isRequired,
  onPlaceChanged: PropTypes.func.isRequired,
  inputProps: PropTypes.object,
  inputBaseProps: PropTypes.object,
  inputDefaultValue: PropTypes.string,
};
