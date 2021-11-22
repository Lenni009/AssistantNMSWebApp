import i18next from 'i18next';
import React, { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';

import { PositiveButton } from '../../components/common/button/positiveButton';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { PortalGlyphGridDisplay } from '../../components/common/portal/portalGlyphGrid';
import { ProgressBar } from '../../components/common/progressBar/progressBar';
import { ImageContainer } from '../../components/common/tile/imageContainer';
import { Error } from '../../components/core/error/error';
import { LazyLoadImage } from '../../components/core/lazyLoadImage/lazyLoadImage';
import { SmallLoading } from '../../components/core/loading/loading';
import { ExpeditionSeasonRewardsOnlyTile } from '../../components/tilePresenter/rewardTile/expeditionSeasonRewardsOnlyTile';
import { ExpeditionSeasonRewardTile } from '../../components/tilePresenter/rewardTile/expeditionSeasonRewardTile';
import { AppImage } from '../../constants/AppImage';
import { ExistingExpeditions, IExistingExpeditions } from '../../constants/Expedition';
import { NetworkState } from '../../constants/NetworkState';
import * as routes from '../../constants/Route';
import { ExpeditionSeasonViewModel } from '../../contracts/generated/Model/HelloGames/expeditionSeasonViewModel';
import { ExpeditionSeason, ExpeditionSeasonPhase, ExpeditionSeasonReward } from '../../contracts/helloGames/expeditionSeason';
import { friendlyTimeLeft, guideFormatDate, percentageProgress } from '../../helper/dateHelper';
import { shouldListBeCentered } from '../../helper/mathHelper';
import { LocaleKey } from '../../localization/LocaleKey';

interface ICurrentExpeditionSeasonHeaderProps {
    seasonDetails?: ExpeditionSeasonViewModel;
    networkState: NetworkState;
}

export const CurrentExpeditionSeasonHeader: React.FC<ICurrentExpeditionSeasonHeaderProps> = (props: ICurrentExpeditionSeasonHeaderProps) => {

    if (props.networkState === NetworkState.Loading)
        return (<><SmallLoading maxWidth="50px" hideText={true} /><hr /></>);

    if (props.networkState === NetworkState.Error || props.seasonDetails == null)
        return (<span></span>);

    return (
        <>
            <div data-id="CurrentExpeditionSeasonHeader" className="row noselect">
                <div className="col-12 col-lg-2 col-md-2 col-sm-4 col-xs-3 image-container generic-item-image-container">
                    <LazyLoadImage src={props.seasonDetails.imageUrl ?? ''} alt={props.seasonDetails.name} style={{ width: '100%', maxWidth: '200px' }} />
                </div>
                <div className="col-12 col-lg-10 col-md-10 col-sm-8 col-xs-9">
                    <h2>{props.seasonDetails.name}</h2>
                    <ProgressBar
                        percentage={percentageProgress(props.seasonDetails.startDate, props.seasonDetails.endDate)}
                        additionalText={friendlyTimeLeft(new Date(), props.seasonDetails.endDate)}
                    />
                    <div className="mt-2em">
                        <h4 style={{ display: 'inline-block', float: 'left' }}>{guideFormatDate(props.seasonDetails.startDate)}</h4>
                        <h4 style={{ display: 'inline-block', float: 'right' }}>{guideFormatDate(props.seasonDetails.endDate)}</h4>
                    </div>
                </div>
            </div>
            <hr />
        </>
    );
}

interface ISeasonExpeditionCardsProps {
}

export const SeasonExpeditionCards: React.FC<ISeasonExpeditionCardsProps> = (props: ISeasonExpeditionCardsProps) => {
    return (
        <div data-id="SeasonExpeditionCards" className="row">
            {
                ExistingExpeditions.map((data) => {
                    return <SeasonExpeditionCard details={data} />
                })
            }
        </div>
    );
}

interface ISeasonExpeditionCardProps {
    details: IExistingExpeditions;
}

export const SeasonExpeditionCard: React.FC<ISeasonExpeditionCardProps> = (props: ISeasonExpeditionCardProps) => {
    const history = useHistory();

    const navigateToExpSeason = (seasId: string) => () => {
        history.push(`${routes.seasonExpedition}/${seasId}`);
    }
    return (
        <div data-id="SeasonExpeditionCard" className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div className="card exp pointer noselect" onClick={navigateToExpSeason(`seas-${props.details.seasonNum}`)} draggable={false}>
                <div className="card-image exp">
                    <img src={`/${props.details.background}`} draggable={false} alt={props.details.name} />
                </div>

                <img src={`/${props.details.icon}`} className="card-image-overlay" draggable={false} alt={props.details.name + ' icon'} />

                <div className="card-top-right-content">
                    <span>Season {props.details.seasonNum}</span>
                </div>

                <div className="card-content row">
                    <div className="col-12">
                        <div className="user-details exp">
                            <div className="user-name">
                                <h3 style={{ width: '100%', textAlign: 'center' }}>{props.details.name}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


interface IExpeditionSeasonHeaderProps {
    seasonDetails?: ExpeditionSeason;
    useAltGlyphs: boolean;
    networkState: NetworkState;
}

export const ExpeditionSeasonHeader: React.FC<IExpeditionSeasonHeaderProps> = (props: IExpeditionSeasonHeaderProps) => {

    if (props.networkState === NetworkState.Loading)
        return (<SmallLoading />);

    if (props.networkState === NetworkState.Error || props.seasonDetails == null)
        return (<Error />);

    return (
        <div data-id="ExpeditionSeasonHeader" className="row expedition-season-header noselect">
            <div className="col-12 col-lg-3 col-md-3 col-sm-12 col-xs-3">
                <LazyLoadImage src={`/${AppImage.base}${props.seasonDetails.Icon}`} alt={props.seasonDetails.Title} style={{ width: '100%', maxWidth: '250px' }} />
                <h4><b>{i18next.t(LocaleKey.startDate)}:</b>&nbsp;{guideFormatDate(props.seasonDetails.StartDate)}</h4>
                <h4><b>{i18next.t(LocaleKey.endDate)}:</b>&nbsp;{guideFormatDate(props.seasonDetails.EndDate)}</h4>
            </div>
            <div className="col-12 col-lg-9 col-md-9 col-sm-12 col-xs-9">
                <h2>{props.seasonDetails.Title}</h2>
                <PortalGlyphGridDisplay
                    codes={props.seasonDetails.PortalCode.split('').map(p => parseInt(p, 16)) || []}
                    columnMultiplier={2}
                    useAltGlyphs={props.useAltGlyphs}
                />
            </div>
        </div>
    );
}


interface IExpeditionSeasonPhaseProps {
    networkState: NetworkState;
    phases?: Array<ExpeditionSeasonPhase>;
    setDetailPane: (newNode: ReactNode, snapPoint: number) => void;
}

export const ExpeditionSeasonPhases: React.FC<IExpeditionSeasonPhaseProps> = (props: IExpeditionSeasonPhaseProps) => {

    if (props.networkState === NetworkState.Loading)
        return (<SmallLoading />);

    if (props.networkState === NetworkState.Error || props.phases == null)
        return (<Error />);

    return (
        <div data-id="ExpeditionSeasonPhases" className="row expedition-season-phases">
            <div className="col-12">
                {
                    props.phases.map((phase: ExpeditionSeasonPhase, index: number) => (
                        <ExpeditionSeasonPhaseWithMilestones
                            key={`${phase?.Id}-${index}`}
                            phase={phase}
                            setDetailPane={props.setDetailPane}
                        />
                    ))
                }
            </div>
        </div>
    );
}

interface IExpeditionSeasonPhaseWithMilestonesProps {
    phase: ExpeditionSeasonPhase;
    setDetailPane: (newNode: ReactNode, snapPoint: number) => void;
}

export const ExpeditionSeasonPhaseWithMilestones: React.FC<IExpeditionSeasonPhaseWithMilestonesProps> = (props: IExpeditionSeasonPhaseWithMilestonesProps) => {
    if (props.phase == null) return (<span></span>);

    const openDetailPane = () => {
        if (props.phase == null) return;

        props.setDetailPane(
            <GenericListPresenter
                isCentered={shouldListBeCentered(props.phase.Rewards.length)}
                list={props.phase.Rewards}
                presenter={ExpeditionSeasonRewardTile}
                identifier={(item: ExpeditionSeasonReward) => item.Id}
            />,
            props.phase.Rewards.length > 6 ? 600 : 400,
        );
    }

    return (
        <div data-id="ExpeditionSeasonPhaseWithMilestones" className="row expedition-season-phase noselect">
            <div className="col-12 col-lg-3 col-md-3 col-sm-12 col-xs-3">
                <LazyLoadImage src={`/${AppImage.base}${props.phase.Icon}`} alt={props.phase.Title} className="phase-icon" style={{ width: '100%', maxWidth: '250px' }} />
                <h3 className="phase-title">{props.phase.Title}</h3>
                <PositiveButton icon="info" iconPosition="left" additionalClass="mt-2em mb-2em" onClick={openDetailPane}>
                    <span>{i18next.t(LocaleKey.rewards).toString()}</span>
                </PositiveButton>
            </div>
            <div className="col-12 col-lg-9 col-md-9 col-sm-12 col-xs-9">
                {
                    (props.phase.Milestones ?? []).map((milestone: ExpeditionSeasonPhase, index: number) => (
                        <ExpeditionSeasonPhaseMilestone
                            key={`${milestone?.Id}-${index}`}
                            milestone={milestone}
                            setDetailPane={props.setDetailPane}
                        />
                    ))
                }
            </div>
        </div>
    );
}

interface IExpeditionSeasonPhaseMilestonesProps {
    milestone?: ExpeditionSeasonPhase;
    setDetailPane: (newNode: ReactNode, snapPoint: number) => void;
}

export const ExpeditionSeasonPhaseMilestone: React.FC<IExpeditionSeasonPhaseMilestonesProps> = (props: IExpeditionSeasonPhaseMilestonesProps) => {
    if (props.milestone == null) return (<span></span>);

    const openDetailPane = () => {
        if (props.milestone == null) return;

        props.setDetailPane(
            <GenericListPresenter
                isCentered={shouldListBeCentered(props.milestone.Rewards.length)}
                list={props.milestone.Rewards}
                presenter={ExpeditionSeasonRewardTile}
                identifier={(item: ExpeditionSeasonReward) => item.Id}
            />,
            props.milestone.Rewards.length > 6 ? 600 : 400,
        );
    }

    return (
        <div data-id="ExpeditionSeasonPhaseMilestone" className="expedition-season-milestone noselect">
            <ImageContainer Icon={props.milestone.Icon} Name={props.milestone.Title} />
            <div className="text-container pointer" onClick={openDetailPane}>
                <h3>{props.milestone.Title}</h3>
                <p>{props.milestone.Description}</p>
            </div>
            <div className="text-container rewards pointer" onClick={openDetailPane}>
                <ExpeditionSeasonRewardsOnlyTile rewards={props.milestone.Rewards} />
            </div>
            <div className="rewards-container">
                <i className="material-icons x2 pointer" onClick={openDetailPane}>info</i>
            </div>
        </div>
    );
}