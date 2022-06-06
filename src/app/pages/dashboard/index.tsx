import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import type { TablePaginationConfig } from 'antd/lib/table';
import { CHARACTERSQUERY } from 'utils/graphql/queries';
import DashBoardTable from 'app/components/CharacterTable';

import { ICharacter } from 'utils/types';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<ICharacter[]>([]);
  const [filter, setFilter] = useState({});
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 20,
  });
  const { loading: moreLoading, data: pageData } = useQuery(CHARACTERSQUERY, {
    variables: {
      page: pagination.current,
      filter,
    },
  });

  useEffect(() => {
    if (pageData?.characters?.results?.length > 0) {
      let characters:ICharacter[] = [];
      characters = characters.concat(
        pageData.characters.results.map((character:ICharacter) => ({
          key: character.id,
          avatar: character.image,
          name: character.name,
          created: character.created,
          status: character.status,
          species: character.species,
          type: character.type,
          gender: character.gender,
          origin: character.origin.name,
          location: character.location.name,
        })),
      );
      setData(characters);
      setPagination({
        ...pagination,
        total: pageData?.characters?.info.count,
      });
    }
  }, [pageData]);

  return (
    <DashBoardTable
      data={data}
      pagination={pagination}
      moreLoading={moreLoading}
      filter={filter}
      setFilter={setFilter}
      setPagination={setPagination}
    />
  );
};

export default Dashboard;
