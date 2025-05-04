import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppContainer from '~components/AppContainer';
import { persistor, store } from '~modules/configureStore';

// const GamePage = React.lazy(() => (
//   import('~components/game_page/GamePage')
// ));

const App: React.FC<React.PropsWithChildren> = () => {
  return (
    <React.Suspense fallback={null}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    </React.Suspense>
  );
};

export default App;

