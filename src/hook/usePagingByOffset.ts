import {AxiosRequestConfig} from 'axios';
import {useEffect, useRef, useState} from 'react';

const SIZE_LIMIT = 20;

const usePagingByOffset = (
  requestPaging: (config: AxiosRequestConfig) => Promise<any>,
  otherParams?: any,
) => {
  const [pagingData, setPagingData] = useState({
    refreshing: false,
    loadingMore: false,
    offset: 0,
    list: [],
    noMore: false,
  });
  const [params, setParams] = useState<any>(otherParams);
  const isFirstRun = useRef<any>(true);

  useEffect(() => {
    runRequest(pagingData.offset, SIZE_LIMIT, {
      ...params,
      ...otherParams,
    });
  }, [pagingData.offset]);

  useEffect(() => {
    if (isFirstRun?.current) {
      isFirstRun.current = false;
      return;
    }
    onRefresh();
  }, [otherParams]);

  const runRequest = async (
    offset: number,
    limit?: number,
    otherParams?: any,
  ) => {
    const res = await requestPaging({
      offset: offset,
      limit: limit || SIZE_LIMIT,
      ...otherParams,
    });
    handleOnSuccess(res);
  };

  const onRefresh = () => {
    if (pagingData.offset > 0) {
      setPagingData({
        ...pagingData,
        refreshing: true,
        offset: 0,
        ...otherParams,
      });
    } else {
      runRequest(0, SIZE_LIMIT, {...params, ...otherParams});
    }
  };

  const onLoadMore = () => {
    if (pagingData.noMore) return;
    setPagingData({
      ...pagingData,
      loadingMore: true,
      offset: pagingData.list.length,
    });
  };

  const handleOnSuccess = (data: any) => {
    const responseData = data || {};
    const newList: [] = responseData.data || [];

    if (pagingData.offset === 0) {
      setPagingData({
        ...pagingData,
        list: newList,
        noMore: pagingData.offset >= responseData?.meta?.total,
        refreshing: false,
        loadingMore: false,
      });
    } else if (newList.length >= 0) {
      setPagingData({
        ...pagingData,
        list: [...pagingData.list, ...newList],
        noMore: pagingData.offset >= responseData?.meta?.total,
        refreshing: false,
        loadingMore: false,
      });
    }
  };

  return {
    pagingData,
    onRefresh,
    onLoadMore,
    params,
    setParams,
    setPagingData,
    loadingMore: pagingData.loadingMore,
  };
};

export default usePagingByOffset;
