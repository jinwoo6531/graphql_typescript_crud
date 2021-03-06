import React from 'react';
import { GET_ALL_USERS } from '../Graphql/Queries';
import { useQuery } from '@apollo/client';

const ListOfUsers = () => {
  const { data } = useQuery(GET_ALL_USERS);
  console.log(data);

  return (
    <div>
      {data &&
        data.getAllUsers.map((user: any) => {
          return (
            <div>
              {user.name} / {user.username} / {user.password}
            </div>
          );
        })}
    </div>
  );
};

export default ListOfUsers;
