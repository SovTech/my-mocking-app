import * as React from 'react';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { client } from './apollo';
import Leaderboard from './containers/Leaderboard';

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Switch>
                <Route path='/leaderboard' component={Leaderboard}/>
            </Switch>
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root') as HTMLElement);
registerServiceWorker();
