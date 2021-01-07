import React, {useCallback, useState} from 'react';
import {HomeIcon, Logo, LogoInverse} from './images';
import {Link} from './components';
import {Routes} from './Routes';
import {Navigation, TopBar} from '@shopify/polaris';
import {
  CameraMajor,
  HintMajor,
  HomeMajor,
} from '@shopify/polaris-icons';
import enTranslations from '@shopify/polaris/locales/en.json';
import {
  AppProvider,
  Frame,
} from '@shopify/polaris';
import { useLocation } from 'react-router';

export function App() {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const toggleDarkMode = useCallback(() => setIsDarkMode(!isDarkMode),[isDarkMode]);
  const toggleMenuOpen = useCallback(() => setIsMenuOpen(!isMenuOpen),[isMenuOpen]);
  const toggleNavigation = useCallback(() => setIsMobile(!isMobile),[isMobile]);

  const colorScheme = isDarkMode ? 'dark' : 'light';
  const logo = {
    width: 200,
    topBarSource: isDarkMode ? LogoInverse : Logo,
    url: 'https://hub.home.pulsifer.ca',
    accessibilityLabel: 'home hub',
  }

  const menuMarkup = (
    <TopBar.UserMenu
      actions={[
        {
          items: [
            { content: isDarkMode ? 'Light Mode' : 'Dark Mode', onAction: toggleDarkMode, icon: HintMajor, }
          ]
        },
      ]}
      name='Home Hub 9000'
      detail='Welcome Home'
      initials='HH'
      avatar={HomeIcon}
      open={isMenuOpen}
      onToggle={toggleMenuOpen}
    />
  );
  return (
    <AppProvider
      i18n={enTranslations}
      linkComponent={Link}
      features={{newDesignLanguage: true}} 
      theme={{ colorScheme: colorScheme, logo: logo }}
    >
      <Frame
        showMobileNavigation={isMobile}
        onNavigationDismiss={toggleNavigation}
        navigation={
          <Navigation location={location.pathname}>
            <Navigation.Section
              title="Home Hub 9000"
              items={[
                {
                  url: '/',
                  label: 'Home',
                  exactMatch: true,
                  icon: HomeMajor,
                },
                {
                  url: '/cam',
                  label: 'Cameras',
                  exactMatch: true,
                  icon: CameraMajor,
                },
              ]}
            />
          </Navigation>
        }
        topBar={
          <TopBar
            showNavigationToggle
            onNavigationToggle={toggleNavigation}
            userMenu={menuMarkup}
          />
        }
      >
        <Routes />
      </Frame>
  </AppProvider>
  );
}
