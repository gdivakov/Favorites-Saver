// @flow
import React, {useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Sort as SortIcon} from '@material-ui/icons';
import {FavoriteBorder as FavoriteBorderIcon, Favorite as FavoriteIcon} from '@material-ui/icons'

const INNER_FIELDS = ['_innerID', 'isFavorite'];
const SORTED_KEY = 'title'

export const MODES = {
  PROVIDER: 'PROVIDER',
  FAVORITES: 'FAVORITES',
};

const DataTable = ({provider, entitiesActions, mode = MODES.PROVIDER, className, ...rest}) => {
  const [sortOrder, toggleSorting] = useState(null);
  const classes = useStyles();
  let colls, rows;

  if (mode === MODES.PROVIDER) {
    if (!rest[provider].length) return null; // No entities => return; @TODO: Show "No entities were loaded"

    colls = Object.keys(rest[provider][0] || {});
    rows = rest[provider];
  } else {
    // Favorites table could include entries from all providers
    if (!rest.omdb.length && !rest.wiki.length) return null; // @TODO: Show "No favorites"

    const omdbColls = Object
      .keys(rest.omdb[0] || {})
      .map(col => INNER_FIELDS.includes(col) ? col : col.toLowerCase());

    const wikiColls = Object
      .keys(rest.wiki[0] || {})
      .map(col => INNER_FIELDS.includes(col) ? col : col.toLowerCase())
      .filter(col => !omdbColls.includes(col))

    colls = omdbColls.concat(wikiColls);
    rows = rest.omdb.concat(rest.wiki).map(objPropsToLowerCase)
  }

  const handleSortingClick = () => {
    return !sortOrder || sortOrder === 'desc' ? toggleSorting('asc') : toggleSorting('desc');
  };

  // Sort
  if (sortOrder) {
    rows.sort((rowA, rowB) => {
      const keyA = Object.keys(rowA).find(key => key.toLowerCase() === SORTED_KEY);
      const keyB = Object.keys(rowB).find(key => key.toLowerCase() === SORTED_KEY);

      if (!keyA || !keyB) return 0; // For favorites table

      if (rowA[keyA] > rowB[keyB]) return sortOrder === 'asc' ? 1 : -1;
      if (rowA[keyA] < rowB[keyB]) return sortOrder === 'asc' ? -1 : 1;
      return 0;
    });
  }

  const onFavoriteClick = row => () => {
    entitiesActions.toggleFavorite({row});
  };

  //@TODO: data transformation logic has to be moved up to container
  //@TODO: provider definition logic could be implemented more 'clearly'
  return (
    <TableContainer component={Paper} className={className}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            {colls.filter(col => INNER_FIELDS.indexOf(col) === -1).map((name, idx) => (
              <StyledTableCell key={name} align={idx ? "right" : "left"}>
                <div style={{display: 'flex'}}>
                  {idx === 0 && <SortIcon style={{cursor: 'pointer'}} onClick={handleSortingClick}/>}
                  {name}
                </div>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row._innerID}>
              <StyledTableCell>
                {row.isFavorite ?
                  <FavoriteIcon className={classes.icon} onClick={onFavoriteClick(row)}/>
                  :
                  <FavoriteBorderIcon className={classes.icon} onClick={onFavoriteClick(row)}/>
                }
              </StyledTableCell>

              {colls.filter(col => INNER_FIELDS.indexOf(col) === -1).map((colName, idx) => (
                <StyledTableCell align={idx ? "right" : "left"} key={colName}>
                  <div>{row[colName] || '-'}</div>
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const objPropsToLowerCase = (obj) => {
  // Local function
  const newObj = {};

  for (let key in obj) {
    if (INNER_FIELDS.includes(key)) {
      newObj[key] = obj[key];
      continue;
    }

    newObj[key.toLowerCase()] = obj[key];
  }
  return newObj;
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  icon: {
    cursor: 'pointer',
  },
});

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

export default DataTable;