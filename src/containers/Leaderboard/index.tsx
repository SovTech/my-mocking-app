import * as React from 'react';
import { Query } from 'react-apollo';
import { ALL_USERS } from '../../graphql/queries';
import styled from 'styled-components';

interface User {
    email: string;
    firstName: string;
}

const UserRow = styled.div`
  color: white;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  width: 300px;
  max-width: 100%;
  
  span {
      display: flex;
      flex: 1;
  }
`;

export default class Leaderboard extends React.Component {
    render() {
        return (
            <div>
                <Query query={ALL_USERS}>
                    {({loading, error, data}) => {
                        if (loading) {
                            return <h2>Loading...</h2>;
                        }
                        if (error) {
                            return <h2>Error 😭</h2>;
                        }
                        if (!data.allUsers) {
                            return <h2>There are no users to display 😭</h2>;
                        }

                        return data.allUsers.map((user: User, index: number) =>
                            <UserRow key={user.email}>
                                <span>{`${index + 1}.`}</span>
                                <span>
                                    {user.firstName.toUpperCase()
                                    + (index === 0 ? '🏆' : '')
                                    + (index === data.allUsers.length - 1 ? '🥔👑' : '')}
                                </span>
                            </UserRow>
                        );
                    }}
                </Query>
            </div>
        );
    }
}
