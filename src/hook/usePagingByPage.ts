import {AxiosRequestConfig} from 'axios';
import {useEffect, useState} from 'react';

const SIZE_LIMIT = 2;

const usePagingByPage = (
  requestPaging: (config: AxiosRequestConfig) => Promise<any>,
  otherParams?: any,
) => {
  const [pagingData, setPagingData] = useState({
    refreshing: false,
    loadingMore: false,
    page: 0,
    noMore: false,
  });
  const [list, setList] = useState([]);
  const [params, setParams] = useState<any>(otherParams);

  useEffect(() => {
    runRequest(pagingData.page, SIZE_LIMIT, {
      ...params,
    });
  }, [pagingData.page]);

  const runRequest = async (page: number, size?: number, params?: any) => {
    const res = await requestPaging({
      page,
      size: size || SIZE_LIMIT,
      ...params,
    });

    handleOnSuccess(res?.result);
  };

  const onRefresh = () => {
    if (pagingData.page > 0) {
      setPagingData({
        ...pagingData,
        refreshing: true,
        page: 0,
      });
    } else {
      runRequest(0, SIZE_LIMIT, {...params});
    }
  };

  const onLoadMore = () => {
    if (pagingData.noMore && !pagingData.loadingMore) return;
    setPagingData({
      ...pagingData,
      loadingMore: true,
      page: pagingData.page + 1,
    });
  };
  const handleOnSuccess = (data: any) => {
    const responseData = data || {};
    const newList: [] = responseData?.records || [];

    if (pagingData.page === 0) {
      setList(newList);
    } else if (newList.length >= 0) {
      setList([...list, ...newList]);
    }
    setPagingData({
      ...pagingData,
      noMore: pagingData.page >= responseData?.meta?.total,
      refreshing: false,
      loadingMore: false,
    });
  };
  const onChangeParams = data => {
    setParams(data);
    if (pagingData.page > 0) {
      setPagingData({
        ...pagingData,
        refreshing: true,
        page: 0,
      });
    } else {
      runRequest(0, SIZE_LIMIT, {...data});
    }
  };
  return {
    onRefresh,
    onLoadMore,
    params,
    onChangeParams,
    list,
    setList,
    ...pagingData,
  };
};

export default usePagingByPage;
