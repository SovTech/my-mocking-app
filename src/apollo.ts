import { createHttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';

const httpLink = createHttpLink({
    uri: 'GRAPHCOOL_HTTP_ENDPOINT',
});

const authLink = setContext((_, {headers}: any) => {
    // Get the authentication token from local storage if it exists
    const token = localStorage.getItem('JWT_LOCAL_STORAGE_KEY');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        }
    };
});

const wsLink = () => {
    // Get the authentication token from local storage if it exists
    const token = localStorage.getItem('JWT_LOCAL_STORAGE_KEY');
    return new WebSocketLink({
        uri: 'GRAPHCOOL_WS_ENDPOINT',
        options: {
            reconnect: true,
            connectionParams: {
                Authorization: `Bearer ${token}`,
                authToken: token,
            },
        }
    });
};

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
    // split based on operation type
    ({query}) => {
        const {kind, operation} = getMainDefinition(query as any) as any;
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink(),
    authLink.concat(httpLink as any) as any,
);

export const client = new ApolloClient({
    link: link as any,
    cache: new InMemoryCache()
});