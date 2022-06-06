import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import type { TablePaginationConfig } from 'antd/lib/table';
import { LOCATIONSQUERY } from 'utils/graphql/queries';
import { ILocation } from 'utils/types';
import LocationTable from '../../components/LocationTable';

const Location: React.FC = () => {
  const [data, setData] = useState<ILocation[]>([]);
  const [filter, setFilter] = useState({});
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 20,
  });
  const { loading: moreLoading, data: pageData } = useQuery(LOCATIONSQUERY, {
    variables: {
      page: pagination.current,
      filter,
    },
  });

  useEffect(() => {
    if (pageData?.locations?.results?.length > 0) {
      let locations: ILocation[] = [];
      locations = locations.concat(
        pageData.locations.results.map((location:ILocation) => ({
          key: location.id,
          name: location.name,
          type: location.type,
          dimension: location.dimension,
          created: location.created,
        })),
      );
      setData(locations);
      setPagination({
        ...pagination,
        total: pageData?.locations?.info.count,
      });
    }
  }, [pageData]);

  return (
    <LocationTable
      data={data}
      pagination={pagination}
      moreLoading={moreLoading}
      filter={filter}
      setFilter={setFilter}
      setPagination={setPagination}
    />
  );
};

export default Location;
