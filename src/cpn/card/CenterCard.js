import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { get, put } from '../../utils/api-client';
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import RaterDialog from '../dialog/RaterDialog';
import CommentsDialog from '../dialog/CommentsDialog';
import EditorDialog from '../dialog/EditorDialog';
import LocatorDialog from '../dialog/LocatorDialog';
import CenterSchema from '../../validation/CensterSchema';
import { evaluate } from '../../utils/rate-evaluation';
import { getFlag } from '../../utils/get-flag';
import ERN from '../../static/assets/ERN.png';
import RC from '../../static/assets/reference-center.gif';
import CS from '../../static/assets/CS.png';
import CG from '../../static/assets/CG.jpg';

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Typography,
  Link,
  Menu,
  MenuItem,
  ListItemIcon,
  Tooltip,
  Hidden,
  Fab,
} from '@material-ui/core';

import {
  ExpandMore,
  Call,
  DirectionsRun,
  OpenInNew,
  Grade,
  Comment,
  Report,
  Edit,
  MyLocation,
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 640,
    margin: 'auto',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandNoMargin: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: grey[200],
    width: 40,
    height: 40,
    border: `thin dashed ${grey[200]}`,
  },
  flag: {
    width: 40,
    height: 40,
  },
  innerLink: {
    color: 'inherit',
  },
  link: {
    margin: theme.spacing(1),
  },
  iconButtonText: {
    verticalAlign: 'bottom',
    fontSize: 12,
  },
  bad: {
    color: theme.rate.bad,
  },
  medium: {
    color: theme.rate.medium,
  },
  good: {
    color: theme.rate.good,
  },
  cardContent: {
    overflowWrap: 'break-word',
  },
  cardContentRoot: {
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 0,
    paddingBottom: 0,
    '&:last-child': {
      paddingBottom: 2,
    },
  },
  cardActionsRoot: {
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 6,
    paddingBottom: 2,
  },
  name: {
    marginBottom: 4,
  },
  name_en: {
    marginTop: 1,
  },
  quickInfos: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 16,
    paddingRight: 8,
    paddingLeft: 8,
  },
  quickInfo: {
    marginRight: 4,
    marginLeft: 4,
  },
  quickInfoIcon: {
    color: grey[600],
  },
  imgIcon: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  infosContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 12,
  },
  divider: {
    margin: '0 8px',
    color: grey[400],
  },
  spaceRight: {
    marginRight: 8,
  },
  breakWord: {
    wordBreak: 'break-all',
  },
}));

export default function CenterCard({ user, lang, center, onServerCallError }) {
  const classes = useStyles();

  const [
    {
      _id,
      location,
      country,
      region,
      city,
      hospital,
      name,
      name_en,
      address,
      website,
      phones,
      consultation_managers,
      for_children,
      for_adults,
      genetic_advice,
      ern_member,
      specialized_consultation,
      officially_designated_center,
      average_rate,
      user_rate,
      comments_count,
      rates_count,
      dist,
      meta: {
        place: { countryCode, extra },
      },
    },
    setCenter,
  ] = useState(center);

  useEffect(() => {
    setCenter(center);
  }, [center]);

  const [lng, lat] = (location && location.coordinates) || [];

  const [expanded, setExpanded] = useState(false);

  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);

  const handleOpenMenu = event => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  async function updateCard() {
    try {
      const data = await get(`/centers/details/by/${_id}`);
      setCenter({ ...data, dist: dist });
    } catch (err) {
      /* DO NOTHING */
    }
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        title={hospital}
        subheader={
          <small>
            {country} &bull; {region} &bull; {city}
          </small>
        }
        avatar={
          <Avatar aria-label="country" className={classes.avatar}>
            <img
              src={getFlag(countryCode)}
              className={classes.flag}
              alt="flag"
            />
          </Avatar>
        }
      />

      <CardContent
        className={classes.cardContent}
        classes={{
          root: classes.cardContentRoot,
        }}
      >
        <Typography
          className={classes.name}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {name}
        </Typography>

        <Typography
          className={classes.name_en}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          <small>{name_en}</small>
        </Typography>

        <div className={classes.infosContainer}>
          {dist && dist.calculated && (
            <Typography variant="subtitle1" color="textSecondary">
              {dist.calculated.toFixed(1)} km
            </Typography>
          )}

          {average_rate && (
            <>
              <div className={classes.divider}> &bull; </div>
              <Typography
                variant="subtitle1"
                className={classes[evaluate(average_rate)]}
              >
                <StarIcon style={{ fontSize: 16 }} />
                {average_rate.toFixed(1)}
              </Typography>

              <div className={classes.divider}> &bull; </div>

              <Typography variant="subtitle1" color="textSecondary">
                {rates_count} {lang.opinion}
              </Typography>
            </>
          )}
        </div>

        <div className={classes.quickInfos}>
          {for_children && (
            <span className={classes.quickInfo}>
              <Tooltip title={lang.for_children}>
                <ChildCareIcon className={classes.quickInfoIcon} />
              </Tooltip>
            </span>
          )}
          {for_adults && (
            <span className={classes.quickInfo}>
              <Tooltip title={lang.for_adults}>
                <PersonIcon className={classes.quickInfoIcon} />
              </Tooltip>
            </span>
          )}

          {specialized_consultation && (
            <Tooltip title={lang.specialized_consultation}>
              <img
                src={CS}
                className={classes.imgIcon}
                alt={lang.specialized_consultation}
              />
            </Tooltip>
          )}
          {genetic_advice && (
            <Tooltip title={lang.genetic_counseling}>
              <img
                src={CG}
                className={classes.imgIcon}
                alt={lang.genetic_counseling}
              />
            </Tooltip>
          )}

          {officially_designated_center && (
            <Tooltip title={lang.officially_designated_center}>
              <img
                src={RC}
                className={classes.imgIcon}
                alt={lang.officially_designated_center}
              />
            </Tooltip>
          )}
          {ern_member && (
            <Tooltip title={lang.ern_member}>
              <img
                src={ERN}
                className={classes.imgIcon}
                alt={lang.ern_member}
              />
            </Tooltip>
          )}
        </div>

        <CardActions
          disableSpacing
          classes={{
            root: classes.cardActionsRoot,
          }}
        >
          <Link
            target="_blank"
            className={classes.innerLink}
            href={`tel:${phones && phones[0]}`}
          >
            <Tooltip title={lang.call}>
              <IconButton
                color="primary"
                disabled={phones.length === 0}
                aria-label={lang.call}
              >
                <Call />
              </IconButton>
            </Tooltip>
          </Link>

          <Link
            target="_blank"
            className={classes.innerLink}
            href={`http://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${extra.googlePlaceId}`}
          >
            <Tooltip title={lang.go}>
              <IconButton
                color="primary"
                disabled={!(lat && lng)}
                aria-label={lang.go}
              >
                <DirectionsRun />
              </IconButton>
            </Tooltip>
          </Link>

          <Link target="_blank" className={classes.innerLink} href={website}>
            <Tooltip title={lang.consult_website}>
              <IconButton
                color="primary"
                disabled={!website}
                aria-label={lang.consult_website}
              >
                <OpenInNew />
              </IconButton>
            </Tooltip>
          </Link>

          <RaterDialog
            centerId={_id}
            onRateSubmit={updateCard}
            prevRate={user_rate}
          >
            {props => (
              <Tooltip title={lang.rate}>
                <IconButton {...props} color="primary" aria-label={lang.rate}>
                  <Grade />
                  <span className={classes.iconButtonText}>{user_rate}</span>
                </IconButton>
              </Tooltip>
            )}
          </RaterDialog>

          <CommentsDialog centerId={_id} onCommentSubmit={updateCard}>
            {props => (
              <Tooltip title={lang.comments}>
                <IconButton
                  {...props}
                  color="primary"
                  aria-label={lang.comments}
                >
                  <Comment />
                  <span className={classes.iconButtonText}>
                    {comments_count}
                  </span>
                </IconButton>
              </Tooltip>
            )}
          </CommentsDialog>

          {user && user.is_admin && (
            <Hidden xsDown>
              <EditorDialog
                title={lang.edit_center}
                onDataSubmited={updateCard}
                validationSchema={CenterSchema}
                onDataLoadingError={onServerCallError}
                onSubmitError={onServerCallError}
                fetchFn={async () => get(`/centers/admin/details/by/${_id}`)}
                pushFn={async center =>
                  put(`/centers/admin/update/${_id}`, { data: center })
                }
                features={[
                  ({ liftDataUp, ...rest }) => (
                    <LocatorDialog
                      {...rest}
                      onLocationSelected={liftDataUp}
                      key="EditorDialog-LocatorDialog"
                    >
                      {props => (
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
                {props => (
                  <Tooltip title={lang.edit_center}>
                    <IconButton
                      {...props}
                      color="primary"
                      aria-label={lang.edit_center}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                )}
              </EditorDialog>
            </Hidden>
          )}

          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleOpenMenu}
          >
            <MoreHorizIcon />
          </IconButton>

          <Menu
            id="long-menu"
            anchorEl={menuAnchorEl}
            keepMounted
            open={!!menuAnchorEl}
            onClose={handleCloseMenu}
            PaperProps={{
              style: {
                maxHeight: 260,
                width: 260,
              },
            }}
          >
            <Link
              target="_blank"
              className={classes.innerLink}
              href={`http://www.google.com/search?q=${hospital}`}
            >
              <Tooltip title={lang.search_hospital_on_google}>
                <MenuItem key={'search'} onClick={() => handleCloseMenu()}>
                  <ListItemIcon>
                    <IconButton
                      color="primary"
                      aria-label={lang.search_hospital_on_google}
                    >
                      <SearchIcon />
                    </IconButton>
                  </ListItemIcon>
                  <Typography variant="inherit">
                    {lang.search_on_google}
                  </Typography>
                </MenuItem>
              </Tooltip>
            </Link>
            <Link
              target="_blank"
              className={classes.innerLink}
              href={`mailto:drepakin@gmail.com&subject=[EC_${_id}] Signalement d'une erreur sur le centre (${name})`}
            >
              <Tooltip title={lang.report_error_on_this_center}>
                <MenuItem key={'report'} onClick={() => handleCloseMenu()}>
                  <ListItemIcon>
                    <IconButton
                      color="primary"
                      aria-label={lang.report_error_on_this_center}
                    >
                      <Report />
                    </IconButton>
                  </ListItemIcon>
                  <Typography variant="inherit">{lang.report_error}</Typography>
                </MenuItem>
              </Tooltip>
            </Link>
            <Hidden smUp>
              <MenuItem
                key={'expand'}
                onClick={() => {
                  setExpanded(!expanded);
                  handleCloseMenu();
                }}
              >
                <ListItemIcon>
                  <IconButton
                    color="primary"
                    className={clsx(classes.expandNoMargin, {
                      [classes.expandOpen]: expanded,
                    })}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMore />
                  </IconButton>
                </ListItemIcon>
                <Typography variant="inherit">
                  {expanded ? lang.collapse_card : lang.expand_card}
                </Typography>
              </MenuItem>
            </Hidden>
          </Menu>

          <Hidden xsDown>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-label={lang.show_more}
            >
              <ExpandMore />
            </IconButton>
          </Hidden>
        </CardActions>
      </CardContent>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <b>{lang.address} : </b>
            <br />
            <i>{address}</i>
          </Typography>

          <Typography paragraph>
            <b>{lang.phone} : </b>
            <br />
            {phones.map(phone => (
              <span key={phone}>
                <Link
                  target="_blank"
                  href={`tel:${phone}`}
                  className={classes.link}
                >
                  {phone}
                </Link>
                <br />
              </span>
            ))}
          </Typography>

          <Typography paragraph>
            <b>{lang.website} : </b>
            <br />
            <Link
              target="_blank"
              href={website}
              className={clsx(classes.link, classes.breakWord)}
            >
              {website}
            </Link>
          </Typography>

          <Typography paragraph>
            <b>{lang.consultation_managers} : </b>
            <br />
            {consultation_managers}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

CenterCard.propTypes = {
  lang: PropTypes.object.isRequired,
  center: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    location: PropTypes.shape({
      type: PropTypes.string.isRequired,
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    }).isRequired,
    country: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    hospital: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    name_en: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    website: PropTypes.string,
    phones: PropTypes.arrayOf(PropTypes.string),
    consultation_managers: PropTypes.arrayOf(PropTypes.string),
    for_children: PropTypes.bool,
    for_adults: PropTypes.bool,
    genetic_advice: PropTypes.bool,
    ern_member: PropTypes.bool,
    specialized_consultation: PropTypes.bool,
    officially_designated_center: PropTypes.bool,
  }),
  user: PropTypes.object,
  onServerCallError: PropTypes.func.isRequired,
};
