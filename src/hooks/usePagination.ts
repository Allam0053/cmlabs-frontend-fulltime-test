import React from 'react';

// type Deps<T> = Array<T>;
export type PaginationType<T> = {
  pagesToRender: number[];
  totalData: number;
  totalPage: number;
  dataPerPage: number;
  currentData: T[];
};
export default function usePagination<T>(deps: Array<T> | undefined) {
  const processedData = deps;
  const [currentPage, setCurrentPage] = React.useState(1);

  const pagination: PaginationType<T> = React.useMemo(() => {
    if (!processedData) {
      return {
        pagesToRender: [1],
        totalData: 0,
        totalPage: 1,
        dataPerPage: 10,
        currentData: [],
      };
    }
    const dataPerPage = 10;
    const totalData = processedData?.length ?? 0;
    const totalPage = Math.ceil(totalData / dataPerPage);

    const currentData: Array<T> = [];
    for (
      let START_INDEX = (currentPage - 1) * dataPerPage,
        i = (currentPage - 1) * dataPerPage;
      i < Math.min(START_INDEX + dataPerPage, totalData);
      i++
    ) {
      currentData.push(processedData[i]);
    }

    const pagesToRender: number[] = [];
    for (
      let i = Math.max(1, currentPage - 2);
      i <= totalPage && i <= currentPage + 2;
      i++
    ) {
      pagesToRender.push(i);
    }

    return {
      pagesToRender,
      totalData,
      totalPage,
      dataPerPage,
      currentData,
    };
  }, [currentPage, processedData]);

  return {
    pagination,
    currentPage,
    setCurrentPage,
  };
}
