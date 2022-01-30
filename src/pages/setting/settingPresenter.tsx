import i18next from 'i18next';
import React from 'react';
import { connect } from 'react-redux';

import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { mapDispatchToProps, mapStateToProps, IReduxProps } from './setting.Redux';
import { BoolSettingTile, LangSettingTile, FontSettingTile } from './settingComponent';


interface IWithDepInj { }
interface IWithoutDepInj { }
interface IProps extends IWithoutDepInj, IReduxProps { }

const SettingPresenterUnconnected: React.FC<IProps> = (props: IProps) => {
    const title = i18next.t(LocaleKey.settings);
    return (
        <>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div className="content">
                <div className="container full pt1">
                    <div className="row">
                        <LangSettingTile title={i18next.t(LocaleKey.appLanguage)}
                            value={props.selectedLanguage}
                            onClick={props.setLanguage}
                        />
                        <BoolSettingTile
                            title={i18next.t(LocaleKey.useAltGlyphs)}
                            value={props.useAltGlyphs}
                            onClick={props.toggleAltGlyphs}
                        />
                        <FontSettingTile title={i18next.t(LocaleKey.settingsFont)}
                            value={props.selectedFont}
                            onClick={props.setFont}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export const SettingPresenter = withServices<IWithoutDepInj, IWithDepInj>(
    connect(mapStateToProps, mapDispatchToProps)(SettingPresenterUnconnected),
    () => ({})
);
