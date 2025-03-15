import { Pagination } from '@mui/material';
import clsx from 'clsx';
import React from 'react';

import useStyles from './styles';

interface PaginationCustomProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  paginationStyle?: string;
}

const PaginationCustom: React.FC<PaginationCustomProps> = ({ count, page, onChange, paginationStyle }) => {
  const classes = useStyles();

  return (
    <Pagination
      count={count}
      page={page}
      onChange={onChange}
      variant="outlined"
      shape="rounded"
      color="primary"
      className={clsx(classes.pagination, paginationStyle)}
      size="large"
    />
  );
};

export default PaginationCustom;
