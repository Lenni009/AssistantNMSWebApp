import i18next from 'i18next';
import React from 'react';

import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { GenericItemWithRequirementsListTile } from '../../components/tilePresenter/genericItemListTile/genericItemWithRequirementsListTile';
import { ProcessorItemListTile } from '../../components/tilePresenter/processorItemListTile/processorItemListTile';
import { ChargeByItemListTile } from '../../components/tilePresenter/recharge/chargeByItemListTile';
import { RechargeItemListTile } from '../../components/tilePresenter/recharge/rechargeItemListTile';
import { RequiredItemDetailsListTile } from '../../components/tilePresenter/requiredItemListTile/requiredItemDetailsListTile';
import { ProceduralStatBonusItemListTile, StatBonusItemListTile } from '../../components/tilePresenter/statBonusTile/statBonusItemListTile';
import { GameItemModel } from '../../contracts/GameItemModel';
import { ProceduralStatBonus } from '../../contracts/ProceduralStatBonus';
import { Processor } from '../../contracts/Processor';
import { ChargeBy } from '../../contracts/recharge/chargeBy';
import { Recharge } from '../../contracts/recharge/recharge';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { StatBonus } from '../../contracts/StatBonus';
import { LocaleKey } from '../../localization/LocaleKey';

export const displayRequiredItems = (resArray: Array<RequiredItemDetails>) => {
    if (resArray == null || resArray.length < 1) return null;

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h3>{i18next.t(LocaleKey.craftedUsing)}</h3>
                </div>
                <div className="col-12">
                    <GenericListPresenter list={resArray} presenter={RequiredItemDetailsListTile} />
                </div>
            </div>
            <hr className="mt-3em" />
        </>
    );
}

export const displayUsedToCreateItems = (usedToCreateArray: Array<GameItemModel>) => {
    if (usedToCreateArray == null || usedToCreateArray.length < 1) return null;

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h3>{i18next.t(LocaleKey.usedToCreate)}</h3>
                </div>
                <div className="col-12">
                    <GenericListPresenter list={usedToCreateArray} presenter={GenericItemWithRequirementsListTile} />
                </div>
            </div>
            <hr className="mt-3em" />
        </>
    );
}

export const displayRechargedByItems = (rechargedBy: Recharge) => {
    if (rechargedBy == null || rechargedBy.ChargeBy == null || rechargedBy.ChargeBy.length < 1) return null;

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h3>{i18next.t(LocaleKey.rechargeThisUsing)}</h3>
                </div>
                <div className="col-12">
                    <GenericListPresenter list={rechargedBy.ChargeBy} presenter={(item: ChargeBy) => <ChargeByItemListTile {...item} totalChargeAmount={rechargedBy.TotalChargeAmount} />} />
                </div>
            </div>
            <hr className="mt-3em" />
        </>
    );
}

export const displayUsedToRechargeItems = (id: string, name: string, usedToRechargeArray: Array<Recharge>) => {
    if (usedToRechargeArray == null || usedToRechargeArray.length < 1) return null;

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h3>{i18next.t(LocaleKey.useXToRecharge).replace('{0}', name)}</h3>
                </div>
                <div className="col-12">
                    <GenericListPresenter list={usedToRechargeArray} presenter={(item: Recharge) => <RechargeItemListTile {...item} currentItemId={id} />} />
                </div>
            </div>
            <hr className="mt-3em" />
        </>
    );
}

export const displayRefItems = (refRecipesArray: Array<Processor>) => {
    if (refRecipesArray == null || refRecipesArray.length < 1) return null;
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h3>{i18next.t(LocaleKey.refinedUsing)}</h3>
                </div>
                <div className="col-12">
                    <GenericListPresenter list={refRecipesArray} presenter={ProcessorItemListTile} />
                </div>
            </div>
            <hr className="mt-3em" />
        </>
    );
}

export const displayUsedToRefItems = (name: string, usedToRefArray: Array<Processor>) => {
    if (usedToRefArray == null || usedToRefArray.length < 1) return null;

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h3>{i18next.t(LocaleKey.refineToCreate).replace('{0}', name)}</h3>
                </div>
                <div className="col-12">
                    <GenericListPresenter list={usedToRefArray} presenter={ProcessorItemListTile} />
                </div>
            </div>
            <hr className="mt-3em" />
        </>
    );
}

export const displayCookItems = (cookRecipesArray: Array<Processor>) => {
    if (cookRecipesArray == null || cookRecipesArray.length < 1) return null;
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h3>{i18next.t(LocaleKey.cookingRecipe)}</h3>
                </div>
                <div className="col-12">
                    <GenericListPresenter list={cookRecipesArray} presenter={ProcessorItemListTile} />
                </div>
            </div>
            <hr className="mt-3em" />
        </>
    );
}

export const displayUsedToCookItems = (name: string, usedToCookArray: Array<Processor>) => {
    if (usedToCookArray == null || usedToCookArray.length < 1) return null;

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h3>{i18next.t(LocaleKey.cookToCreate).replace('{0}', name)}</h3>
                </div>
                <div className="col-12">
                    <GenericListPresenter list={usedToCookArray} presenter={ProcessorItemListTile} />
                </div>
            </div>
            <hr className="mt-3em" />
        </>
    );
}

export const displayStatBonuses = (statBonuses: Array<StatBonus>) => {
    if (statBonuses == null || statBonuses.length < 1) return null;

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h3>{i18next.t(LocaleKey.stats)}</h3>
                </div>
                <div className="col-12">
                    <GenericListPresenter list={statBonuses} presenter={StatBonusItemListTile} />
                </div>
            </div>
            <hr className="mt-3em" />
        </>
    );
}

export const displayProceduralStatBonuses = (numStatsMin: number, numStatsMax: number, proceduralStatBonuses: Array<ProceduralStatBonus>) => {
    if (proceduralStatBonuses == null || proceduralStatBonuses.length < 1) return null;

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h3>{i18next.t(LocaleKey.proceduralStats)
                        .replace('{0}', numStatsMin.toString())
                        .replace('{1}', numStatsMax.toString())}</h3>
                </div>
                <div className="col-12">
                    <GenericListPresenter list={proceduralStatBonuses} presenter={ProceduralStatBonusItemListTile} />
                </div>
            </div>
            <hr className="mt-3em" />
        </>
    );
}