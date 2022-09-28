import StyledIndicator from 'components/common/StyledIndicator';
import StyledNoData from 'components/common/StyledNoData';
import React, {useMemo, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, RefreshControl, View} from 'react-native';

const StyledFlatList = (props, ref) => {
  const list = useRef(null);
  const {t} = useTranslation();
  const {
    loading,
    loadingMore,
    data,
    ListHeaderComponent,
    refreshing,
    customStyle,
  } = props;
  const contentContainerStyle: any = {};
  const hasData = data?.length !== 0;

  if (!hasData) {
    contentContainerStyle.flex = 1;
  }

  let styles;
  if (typeof ListHeaderComponent === 'undefined' && !hasData) {
    styles = [contentContainerStyle, customStyle];
  } else {
    styles = customStyle;
  }

  function keyExtractor(item, i) {
    return `${i}`;
  }

  function handleRefresh() {
    if (props.onRefresh) props.onRefresh();
  }

  // Bởi vì onEnReached call nhiều lần nên phải trick để chỉ call 1 lần thôi

  function handleEndReached(info) {
    if (props.onLoadMore) props.onLoadMore();
  }

  function handleNoDataRefresh() {
    const {onNoDataRefresh} = props;
    if (onNoDataRefresh) onNoDataRefresh();
  }

  function renderFooter() {
    if (hasData && loadingMore) {
      return (
        <View style={{alignItems: 'center', marginVertical: 8}}>
          <StyledIndicator size={24} />
        </View>
      );
    }
    return null;
  }

  function renderNoData() {
    const {noDataText, noDataTextI18Key, noDataCanRefresh, onPressEmptyData} =
      props;
    return (
      <StyledNoData
        customStyle={props.noDataStyle}
        loading={loading}
        text={
          noDataTextI18Key ? t(noDataTextI18Key, props.i18Params) : noDataText
        }
        canRefresh={noDataCanRefresh}
        onRefresh={handleNoDataRefresh}
        onPressEmptyData={onPressEmptyData}
      />
    );
  }

  const FlatListComponent = useMemo(() => {
    return props?.FlatListComponent || FlatList;
  }, [props?.FlatListComponent]);

  return (
    <FlatListComponent
      ref={ref || list}
      contentContainerStyle={styles}
      keyExtractor={keyExtractor}
      initialNumToRender={10}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      ListEmptyComponent={renderNoData}
      showsVerticalScrollIndicator={true}
      refreshControl={
        <RefreshControl refreshing={!!refreshing} onRefresh={handleRefresh} />
      }
      ListFooterComponent={renderFooter}
      keyboardShouldPersistTaps={'never'}
      {...props}
    />
  );
};

export default React.forwardRef(StyledFlatList);
