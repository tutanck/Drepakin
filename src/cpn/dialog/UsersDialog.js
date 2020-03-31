import React, { useState, useContext, createRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { AppContext } from '../../context/AppContext';
import SlideUp from '../motion/SlideUp';
import { get, post, deletion } from '../../utils/api-client';
import MaterialTable from 'material-table';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import moment from 'moment';
import BadgedAvatar from '../common/BadgedAvatar';
import {
  Add,
  Check,
  Clear,
  DeleteOutline,
  ChevronRight,
  Edit,
  SaveAlt,
  FilterList,
  FirstPage,
  LastPage,
  ChevronLeft,
  Search,
  ArrowUpward,
  Remove,
  ViewColumn,
} from '@material-ui/icons';
import { Switch } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: 0,
    position: 'relative',
    backgroundColor: '#3883fa',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export default function UsersDialog({
  title,
  children,
  onSubmitError,
  onDataLoadingError,
}) {
  const classes = useStyles();

  let mTable = createRef();

  const [dialogOpened, setDialogOpened] = useState(false);
  const { lang } = useContext(AppContext);

  const grantAdminRights = async user => {
    try {
      await post(`/users/${user.google_id}/is_admin`);
    } catch (err) {
      onSubmitError(err);
    }
  };

  const revokeAdminRights = async user => {
    try {
      await deletion(`/users/${user.google_id}/is_admin`);
    } catch (err) {
      onSubmitError(err);
    }
  };

  const loadUsers = async query => {
    const { page, pageSize, search } = query;

    let res;

    try {
      res = await get('/users/list/', {
        params: { page: page + 1, perPage: pageSize, search: search },
      });
    } catch (err) {
      onDataLoadingError(err);
      return;
    }

    if (res) {
      const users = {
        data: [...res.items],
        page: res.current_page - 1,
        totalCount: res.total_count,
      };

      return users;
    }
  };

  return (
    <>
      {children({ onClick: () => setDialogOpened(true) })}

      <Dialog
        fullScreen
        disableEscapeKeyDown
        disableBackdropClick
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

        <MaterialTable
          tableRef={mTable}
          data={loadUsers}
          columns={[
            {
              field: 'picture',
              title: lang.avatar,
              render: ({ picture, is_admin }) => (
                <BadgedAvatar
                  avatarUrl={picture}
                  badgeIcon={is_admin ? SupervisedUserCircle : undefined}
                />
              ),
            },
            { field: 'name', title: lang.identity },
            { field: 'email', title: lang.email },
            {
              field: 'created_at',
              title: lang.membership,
              render: ({ created_at }) => (
                <span>{moment(created_at).format('L')}</span>
              ),
            },
            { field: 'locale', title: lang.language },
          ]}
          options={{
            search: true,
            sorting: true,
            /* filtering: true, */
            showTitle: false,
            draggable: false,
            actionsColumnIndex: -1,
            searchFieldAlignment: 'left',
            searchFieldStyle: { width: '150%' },
          }}
          editable={{
            isEditable: () => true,
            isDeletable: () => false,
          }}
          actions={[
            ({ is_admin }) => ({
              onClick: async (event, rowData) => {
                const action = is_admin ? revokeAdminRights : grantAdminRights;
                await action(rowData);
                mTable.current && mTable.current.onQueryChange();
              },
            }),
          ]}
          components={{
            Action: ({ data, action: { action } }) => (
              <Switch
                checked={data.is_admin}
                onChange={event => action(data).onClick(event, data)}
              />
            ),
          }}
          localization={{
            header: { actions: lang.admin },
            body: {
              emptyDataSourceMessage: lang.nothing_to_display,
            },
            pagination: {
              labelRowsSelect: lang.rows,
              labelDisplayedRows: `{from}-{to} ${lang.of} {count}`,
              firstTooltip: lang.first,
              lastTooltip: lang.last,
              previousTooltip: lang.previous,
              nextTooltip: lang.next,
            },
            toolbar: {
              searchTooltip: lang.search,
              searchPlaceholder: lang.search,
            },
          }}
          icons={{
            Add,
            Check,
            Clear,
            Delete: DeleteOutline,
            DetailPanel: ChevronRight,
            Edit,
            Export: SaveAlt,
            Filter: FilterList,
            FirstPage,
            LastPage,
            NextPage: ChevronRight,
            PreviousPage: ChevronLeft,
            ResetSearch: Clear,
            Search,
            SortArrow: ArrowUpward,
            ThirdStateCheck: Remove,
            ViewColumn,
          }}
        />
      </Dialog>
    </>
  );
}

UsersDialog.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  onSubmitError: PropTypes.func.isRequired,
  onDataLoadingError: PropTypes.func.isRequired,
};
