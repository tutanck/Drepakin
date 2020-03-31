import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import LoaderDialog from './LoaderDialog';
import SlideUp from '../motion/SlideUp';
import { Geocode, formatResult } from '../../utils/geocoding';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Paper } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import PlaceCard from '../card/PlaceCard';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: 500,
    fontSize: 32,
    display: 'flex',
    padding: '16px 10%',
    justifyContent: 'center',
  },
  expansionPanelSummary: {
    backgroundColor: grey[100],
  },
  formInpuContainer: {
    marginLeft: -11,
    marginRight: 16,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    verticalAlign: 'middle',
  },
  formInputLabel: {
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: '1rem',
    letterSpacing: '0.00938em',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  },
}));

export default function LocatorDialog({
  data,
  lang,
  snack,
  children,
  onLocationSelected,
}) {
  const classes = useStyles();

  const [dialogOpened, setDialogOpened] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const [results, setResults] = useState([]);
  const [selectedResultId, setSelectedResultId] = useState();
  const [expandedResultId, setExpandedResultId] = useState();

  const handleClickOpen = async () => {
    setDialogOpened(true);

    let fetchedData;

    try {
      setIsLoadingData(true);

      fetchedData = await Geocode.fromAddress(address);

      setIsLoadingData(false);
    } catch (err) {
      console.error(err);
      snack.error(
        lang.unable_to_reach_network + '.\n' + lang.check_network + '.',
      );
    }

    if (fetchedData && fetchedData.results) {
      const fetchedResults = fetchedData.results;

      setResults(fetchedResults);
    }
  };

  const selectResult = event => {
    event.stopPropagation();

    const value = event.target.value;

    setSelectedResultId(selectedResultId === value ? null : value);
  };

  const expandResult = placeId => event => {
    event.stopPropagation();
    setExpandedResultId(placeId);
  };

  const onCloseDialog = () => {
    const resultObj = results.find(
      ({ place_id }) => place_id === selectedResultId,
    );

    const location = formatResult(resultObj);

    if (location) {
      onLocationSelected(location);
    }

    setDialogOpened(false);
  };

  const address = data && data.address;

  return (
    <>
      {children({ onClick: handleClickOpen, disabled: !address })}

      <Dialog
        open={dialogOpened}
        onClose={onCloseDialog}
        TransitionComponent={SlideUp}
      >
        <LoaderDialog open={isLoadingData} />

        <div className={classes.root}>
          {results.length
            ? results.map(result => {
                const { place_id, formatted_address } = result;

                return (
                  <ExpansionPanel
                    key={place_id}
                    expanded={expandedResultId === place_id}
                  >
                    <ExpansionPanelSummary
                      className={classes.expansionPanelSummary}
                      id="locator-expansion-panel-summary"
                      expandIcon={<ExpandMoreIcon />}
                      aria-label="Expand"
                      onClick={expandResult(
                        expandedResultId === place_id ? null : place_id,
                      )}
                    >
                      <div className={classes.formInpuContainer}>
                        <Checkbox
                          value={place_id}
                          onChange={selectResult}
                          onClick={event => event.stopPropagation()}
                          checked={selectedResultId === place_id}
                        />
                        <span className={classes.formInputLabel}>
                          {formatted_address}
                        </span>
                      </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <PlaceCard place={formatResult(result).meta.place} />
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                );
              })
            : !isLoadingData && (
                <Paper elevation={3} className={classes.paper}>
                  {lang.no_results}
                </Paper>
              )}
        </div>
      </Dialog>
    </>
  );
}

LocatorDialog.propTypes = {
  lang: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  onLocationSelected: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
};
