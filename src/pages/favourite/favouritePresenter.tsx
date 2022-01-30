import i18next from 'i18next';
import React from 'react';
import { connect } from 'react-redux';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { RequiredItemListTile } from '../../components/tilePresenter/requiredItemListTile/requiredItemListTile';
import { FavouriteItem } from '../../contracts/favourite/favouriteItem';
import { RequiredItem } from '../../contracts/RequiredItem';
import { withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { mapDispatchToProps, mapStateToProps, IReduxProps } from './favourite.Redux';

interface IWithDepInj { }
interface IWithoutDepInj { }
interface IProps extends IWithoutDepInj, IReduxProps { }

export const FavouritePresenterUnconnected = (props: IProps) => {

    const displayFavourites = (favourites: Array<FavouriteItem>) => {
        if (favourites == null || favourites.length === 0) return (
            <h2>{i18next.t(LocaleKey.noItems)}</h2>
        );

        const connectedPresenter = (localProps: RequiredItem | any, index: number) => {
            const funcs = {
                removeItem: () => props.removeItemFromFavourites(localProps.Id)
            };
            return RequiredItemListTile({ ...localProps, ...funcs });
        }

        return <GenericListPresenter list={favourites} presenter={connectedPresenter} identifier={(item: FavouriteItem) => item.Id} />;
    };

    const title = i18next.t(LocaleKey.favourites);
    return (
        <>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div className="content">
                <div className="row full pt1">
                    <div className="col-12">
                        {displayFavourites(props.favourites)}
                    </div>
                </div>
            </div>
        </>
    );
};

export const FavouritePresenter = withServices<IWithoutDepInj, IWithDepInj>(
    connect(mapStateToProps, mapDispatchToProps)(FavouritePresenterUnconnected),
    () => ({})
);