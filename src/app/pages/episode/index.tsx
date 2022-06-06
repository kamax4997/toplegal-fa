import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import type { TablePaginationConfig } from 'antd/lib/table';
import { EPISODESQUERY } from 'utils/graphql/queries';
import EpisodeTable from 'app/components/EpisodeTable';
import { IEpisode } from 'utils/types';

const Episode: React.FC = () => {
  const [data, setData] = useState<IEpisode[]>([]);
  const [filter, setFilter] = useState({});
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 20,
  });
  const { loading: moreLoading, data: pageData } = useQuery(EPISODESQUERY, {
    variables: {
      page: pagination.current,
      filter,
    },
  });

  useEffect(() => {
    if (pageData?.episodes?.results?.length > 0) {
      let episodes:IEpisode[] = [];
      episodes = episodes.concat(
        pageData.episodes.results.map((episode: IEpisode) => ({
          key: episode.id,
          name: episode.name,
          air_date: episode.air_date,
          episode: episode.episode,
          created: episode.created,
        })),
      );
      setData(episodes);
      setPagination({
        ...pagination,
        total: pageData?.episodes?.info.count,
      });
    }
  }, [pageData]);

  return (
    <EpisodeTable
      data={data}
      pagination={pagination}
      moreLoading={moreLoading}
      filter={filter}
      setFilter={setFilter}
      setPagination={setPagination}
    />
  );
};

export default Episode;
