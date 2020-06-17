import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { Grid, Button, Fab, Hidden, Typography } from '@material-ui/core';
import { Edit, People } from '@material-ui/icons';
import EditorDialog from '../cpn/dialog/EditorDialog';
import UsersDialog from '../cpn/dialog/UsersDialog';
import { red, indigo } from '@material-ui/core/colors';
import Pagination from 'material-ui-flat-pagination';
import CenterCard from '../cpn/card/CenterCard';
import { get, post } from '../utils/api-client';
import LegendDialog from '../cpn/dialog/LegendDialog';
import LoaderDialog from '../cpn/dialog/LoaderDialog';
import DisclaimerDialog from '../cpn/dialog/DisclaimerDialog';
import AppBar from '../cpn/bar/AppBar';
import centerShape from '../static/resources/json/center-shape';
import CenterSchema from '../validation/CensterSchema';
import {
  onServerError,
  getResponseDataErrorMessageErrors,
} from '../utils/api-error-helper';
import { pop } from '../utils/toolbox';
import LocatorDialog from '../cpn/dialog/LocatorDialog';
import { MyLocation } from '@material-ui/icons';
import googleForms from '../utils/google-form-selector';
import { getPlaceFromGoogle } from '../utils/google-places';
import getLocation, { getPlaceFromPosition } from '../utils/geolocation';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: 60,
  },
  paginatorContainer: {
    margin: 'auto',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  legendSectionContainer: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
  indication: { color: red[900] },
  primeIndication: { color: indigo[900] },
  adminBtn: {
    width: '300px',
    display: 'flex',
    margin: '16px 0',
  },
  adminBtnText: {
    marginLeft: 8,
  },
  spaceRight: {
    marginRight: 8,
  },
  adminDialogsContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  homeBtn: {
    alignSelf: 'flex-start',
    margin: 16,
  },
  text: {
    fontSize: 32,
    color: grey[600],
  },
}));

export default function MainPage({
  lang,
  user,
  snack,
  language,
  updateUser,
  updateLanguage,
  setLoginDialogOpened,
}) {
  const classes = useStyles();

  const [{ latLng, address }, setPlace] = useState({});

  const [centers, setCenters] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [centersGrid, setCentersGrid] = useState(null);

  const [isLegendDialogOpen, setIsLegendDialogOpen] = useState(false);
  const [isLoadingCenters, setIsLoadingCenters] = useState(false);

  const onServerCallError = onServerError({
    onUnauthorized: () => {
      snack.error(lang.unauthorized_to_perform);
      updateUser(null);
      setLoginDialogOpened(true);
    },

    onForbidden: () => snack.error(lang.forbidden_action),

    onInternalServerError: () => snack.error(lang.an_error_occured),

    onBadRequest: (err) => {
      const responseDataErrorMessageErrors = getResponseDataErrorMessageErrors(
        err,
      );
      const firstError = pop(responseDataErrorMessageErrors);
      snack.error(
        lang.field + " '" + firstError.param + "' " + lang.is_invalid,
      );
    },
  });

  async function fetchCenters(page = 1) {
    setIsLoadingCenters(true);

    try {
      const { lat, lng } = latLng;

      const data = await get(`/centers/near/${lng}/${lat}`, {
        params: { page: page, perPage: 7 },
      });

      setPageCount(data.page_count);

      if (data.items.length > 0) {
        setCenters(data.items);
        setCurrentPage(data.current_page);
      }
    } catch (err) {
      snack.error(lang.unable_to_load_centers);
    } finally {
      setIsLoadingCenters(false);
      if (centersGrid) {
        centersGrid.scrollIntoView();
      }
    }
  }

  const askForCurrentPlace = async () => {
    try {
      const position = await getLocation();

      const place = getPlaceFromPosition(position);
      if (place) return setPlace(place);

      return snack.error(lang.impossible_geolocation);
    } catch (err) {
      console.error('getLocation err', err);
      return snack.warning(lang.allow_geolocation);
    }
  };

  const handlePlaceChanged = async (rawPlace) => {
    if (rawPlace) {
      const place = getPlaceFromGoogle(rawPlace);
      if (place) return setPlace(place);
    }

    await askForCurrentPlace();
  };

  useEffect(
    () => {
      askForCurrentPlace();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      /* Only once : set initial location */
    ],
  );

  useEffect(() => {
    if (latLng) {
      fetchCenters();
      snack.info(lang.position_update + (address ? ` : ${address}` : '.'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, latLng]);

  return (
    <div>
      <DisclaimerDialog lang={lang} />

      <AppBar
        name="Drepakin"
        lang={lang}
        language={language}
        updateLanguage={updateLanguage}
        onPlaceChanged={handlePlaceChanged}
      />

      <LoaderDialog open={isLoadingCenters} />

      <div className={classes.main} ref={(el) => setCentersGrid(el)}>
        <Button
          href="/"
          size="small"
          color="primary"
          className={classes.homeBtn}
        >
          {lang.home}
        </Button>

        {user && user.is_admin && (
          <Hidden xsDown>
            <div className={classes.adminDialogsContainer}>
              <EditorDialog
                title={'Ajouter un centre'}
                validationSchema={CenterSchema}
                fetchFn={async () => ({ ...centerShape })}
                pushFn={async (center) =>
                  post(`/centers/admin/new`, { data: center })
                }
                onDataSubmited={() => snack.sucess(lang.search_after_edit)}
                onDataLoadingError={onServerCallError}
                onSubmitError={onServerCallError}
                features={[
                  ({ liftDataUp, ...rest }) => (
                    <LocatorDialog
                      {...rest}
                      key="EditorDialog-LocatorDialog"
                      onLocationSelected={liftDataUp}
                    >
                      {(props) => (
                        <Fab
                          {...props}
                          size="small"
                          color="primary"
                          variant="extended"
                        >
                          <MyLocation className={classes.spaceRight} />
                          <span className={classes.spaceRight}>
                            {lang.locate}
                          </span>
                        </Fab>
                      )}
                    </LocatorDialog>
                  ),
                ]}
              >
                {(props) => (
                  <Fab
                    {...props}
                    color="primary"
                    variant="extended"
                    className={classes.adminBtn}
                  >
                    <Edit />
                    <span className={classes.adminBtnText}>
                      {lang.add_new_center}
                    </span>
                  </Fab>
                )}
              </EditorDialog>
              <UsersDialog
                title={lang.users_list}
                onDataLoadingError={onServerCallError}
                onSubmitError={onServerCallError}
              >
                {(props) => (
                  <Fab
                    {...props}
                    color="primary"
                    variant="extended"
                    className={classes.adminBtn}
                  >
                    <People />
                    <span className={classes.adminBtnText}>
                      {lang.users_list}
                    </span>
                  </Fab>
                )}
              </UsersDialog>
            </div>
          </Hidden>
        )}
        {centers.length > 0 ? (
          <Grid container spacing={3}>
            <Grid item xs={12} key={'primeIndication'}>
              <span className={classes.primeIndication}>
                {lang.you_know_more_centers}
              </span>
            </Grid>

            <Grid item xs={12} key={'primeCallToAction'}>
              <Button
                color={'primary'}
                variant="outlined"
                target="_blank"
                rel="noopener noreferrer"
                href={googleForms[language]}
              >
                {lang.add_it_to_drepakin}
              </Button>
            </Grid>

            {centers.map((center) => (
              <Grid item key={center._id} xs={12}>
                <CenterCard
                  user={user}
                  lang={lang}
                  center={center}
                  language={language}
                  onServerCallError={onServerCallError}
                />
              </Grid>
            ))}

            <Grid
              item
              xs={12}
              key={'paginatorSection'}
              className={classes.paginatorContainer}
            >
              <Pagination
                limit={1}
                offset={currentPage - 1}
                total={pageCount}
                disabled={isLoadingCenters}
                onClick={(e, offset) => fetchCenters(offset + 1)}
                previousPageLabel="<"
                nextPageLabel=">"
              />
            </Grid>

            <Grid
              item
              xs={12}
              key={'legendSection'}
              className={classes.legendSectionContainer}
            >
              <Button
                color="primary"
                variant="outlined"
                onClick={() => setIsLegendDialogOpen(true)}
              >
                {lang.show_caption}
              </Button>

              <LegendDialog
                lang={lang}
                open={isLegendDialogOpen}
                onClose={() => setIsLegendDialogOpen(false)}
              />
            </Grid>

            <Grid item xs={12} key={'indicationSection'}>
              <span className={classes.indication}>{lang.cant_find}</span>
            </Grid>

            <Grid item xs={12} key={'callToActionSection'}>
              <Button
                color={'secondary'}
                variant="outlined"
                target="_blank"
                rel="noopener noreferrer"
                href={googleForms[language]}
              >
                {lang.add_known_center}
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Typography
            gutterBottom
            variant="h6"
            component="h5"
            className={classes.text}
          >
            {lang.start_a_saerch}
          </Typography>
        )}
      </div>
    </div>
  );
}

MainPage.propTypes = {
  snack: PropTypes.object.isRequired,
  lang: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired,
  updateLanguage: PropTypes.func.isRequired,
  setLoginDialogOpened: PropTypes.func.isRequired,
  user: PropTypes.object,
};
