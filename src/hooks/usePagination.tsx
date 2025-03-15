import { useSearchParams } from 'react-router-dom';

const usePagination = (total, pageSize, param = 'page') => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get(param)) || 1;
  const totalPage = Math.ceil(total / pageSize);

  const onPageChange = (page) => {
    if (page <= 1) {
      searchParams.delete(param);
      setSearchParams(searchParams);
      return;
    }

    searchParams.set(param, page);
    setSearchParams(searchParams);
  };

  return { page, totalPage, onPageChange };
};

export default usePagination;
