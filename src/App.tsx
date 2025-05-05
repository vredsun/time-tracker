import * as React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import AppContainer from '~components/AppContainer';
import { persistor, store } from '~modules/configureStore';

const App: React.FC<React.PropsWithChildren> = () => {
  return (
    <React.Suspense fallback={null}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer />
          <AppContainer />
        </PersistGate>
      </Provider>
    </React.Suspense>
  );
};

export default App;

