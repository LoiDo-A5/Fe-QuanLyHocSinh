import { useRouter } from 'next/router';

const usePagination = (total: number, pageSize: number, param: string = 'page') => {
  const router = useRouter();
  const { query } = router;

  const page = Number(query[param]) || 1;
  const totalPage = Math.ceil(total / pageSize);

  const onPageChange = (page: number) => {
    // Cập nhật tham số URL khi thay đổi trang
    router.push({
      pathname: router.pathname,
      query: { ...query, [param]: page }, // Thêm hoặc cập nhật tham số trang
    });
  };

  return { page, totalPage, onPageChange };
};

export default usePagination;
