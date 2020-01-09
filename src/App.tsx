import React from 'react';
import i18next from 'i18next';
import classNames from "classnames";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { ScrollToTop } from "./components/core/scrollToTop/scrollToTop";

import { Drawer } from "./components/core/drawer/drawer";

import { HomePresenter } from "./pages/home/homePresenter";
import { AboutPresenter } from "./pages/about/aboutPresenter";
import { LanguagePresenter } from "./pages/language/languagePresenter";
import { CataloguePresenter } from "./pages/catalogue/cataloguePresenter";
import { CatalogueListPresenter } from "./pages/catalogue/catalogueListPresenter";
import { NotFoundPresenter } from "./pages/notFound/notFoundPresenter";

import './App.css';
import { home, about, language, catalogue } from './constants/Route';

const App: React.FC = () => {
  return (
    <div id="app"
      className={classNames(
        'menu-on-left',
        i18next.language,
        {
          isDark: false,
        })}>
      <BrowserRouter>
        <ScrollToTop>
          <Drawer />
          <div className="main-panel ps-container ps-theme-default">
            <Switch>
              <Route exact={true} path={home} component={HomePresenter} />
              <Route path={`${catalogue}/:types`} component={CatalogueListPresenter} />
              <Route path={catalogue} component={CataloguePresenter} />
              <Route path={about} component={AboutPresenter} />
              <Route path={language} component={LanguagePresenter} />
              <Route path={home} component={NotFoundPresenter} />
            </Switch>
          </div>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
