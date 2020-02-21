import React from 'react';
import i18next from 'i18next';

import { LocaleKey } from '../../localization/LocaleKey';
import { AnalyticsEvent } from '../../constants/AnalyticsEvent';
import { ExternalUrls } from '../../constants/ExternalUrls';

import { NavBar } from '../../components/core/navbar/navbar';
import { CardButton } from '../../components/core/button/cardButton';

export const LanguagePresenter: React.FC = () => {
    const buttons = [
        { title: i18next.t(LocaleKey.email), event: AnalyticsEvent.externalLinkKurtLourensEmail, url: ExternalUrls.kurtLourensEmail },
        { title: i18next.t(LocaleKey.github), event: AnalyticsEvent.externalLinkGitHubLanguage, url: ExternalUrls.githubLanguageRepo }
    ];
    return (
        <>
            <NavBar title={i18next.t(LocaleKey.language)} />
            <div className="content">
                <div className="container" style={{ paddingTop: '1em', maxWidth: 'unset' }}>
                    <div className="row">
                        <div className="col-12">
                            <h3>{i18next.t(LocaleKey.languageContent)}</h3>
                        </div>
                    </div>
                    <div className="row justify">
                        {
                            buttons.map((button) => {
                                return (
                                    <div key={button.title} className="col-12 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6">
                                        <CardButton
                                            title={button.title}
                                            url={button.url}
                                        />
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}