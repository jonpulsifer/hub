import React from 'react';
import {hydrate, render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {AppProvider} from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import {App} from '../App';
import {Link} from '../components';
import '@shopify/polaris/dist/styles.css';
import 'video.js/dist/video-js.css';


function WrappedApp() {
  return (
    <BrowserRouter>
      <AppProvider
        i18n={enTranslations}
        linkComponent={Link}
        features={{newDesignLanguage: true}} 
        theme={{ colorScheme: 'dark', }}
      >
        <App data='Welcome!' />
      </AppProvider>
    </BrowserRouter>
  );
}

const root = document.getElementById('root');
if (root !== null && root.hasChildNodes() === true) {
  // If it's an SSR, we use hydrate to get fast page loads by just
  // attaching event listeners after the initial render.
  hydrate(<WrappedApp />, root);
} else {
  // If we're not running on the server, just render like normal
  render(<WrappedApp />, root);
}
