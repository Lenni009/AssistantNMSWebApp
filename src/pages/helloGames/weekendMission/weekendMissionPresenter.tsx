import i18next from 'i18next';
import React from 'react';
import { PositiveButton } from '../../../components/common/button/positiveButton';
import { GameItemImage } from '../../../components/common/gameItem/gameItemImage';
import { GenericListPresenter } from '../../../components/common/genericListPresenter/genericListPresenter';
import { HeadComponent } from '../../../components/core/headComponent';
import { SmallLoading } from '../../../components/core/loading/loading';
import { NavBar } from '../../../components/core/navbar/navbar';
import { RequiredItemListTile } from '../../../components/tilePresenter/requiredItemListTile/requiredItemListTile';
import { NetworkState } from '../../../constants/NetworkState';
import { WeekendMissionStage } from '../../../contracts/helloGames/weekendMissionStage';
import { RequiredItem } from '../../../contracts/RequiredItem';
import { anyObject } from '../../../helper/typescriptHacks';
import { LocaleKey } from '../../../localization/LocaleKey';
import { WeekendMissionDialog } from './weekendMissionDialog';
import { WeekendMissionDialogContent } from './weekendMissionDialogContent';


interface IProps {
    // Container Props

    // Container State
    title: string;
    weekendMissionStage: WeekendMissionStage;
    status: NetworkState;

    // Container Specific
    level: number;
    maxLevel: number;
    minLevel: number;
    navigateToWeekendMissionLevel: (newLevel: number) => void;
}

export const WeekendMissionPresenter: React.FC<IProps> = (props: IProps) => {
    const [isOpen, setOpen] = React.useState(false);
    const [currentMessageFlow, setMessageFlow] = React.useState(anyObject);

    const handleLoadingOrError = (displayFunc: (props: IProps) => void) => {
        if (props.status === NetworkState.Loading) return SmallLoading();
        if (props.status === NetworkState.Error ||
            !props.weekendMissionStage ||
            !props.weekendMissionStage.AppId) {
            return (<h2 className="pt1">{i18next.t(LocaleKey.somethingWentWrong)}</h2>);
        }
        return displayFunc(props);
    }

    const displayWeekendMissionData = (weekendMission: WeekendMissionStage) => {
        const weekendMissionRequirements: Array<RequiredItem> = [];
        weekendMissionRequirements.push({
            Id: weekendMission.AppId,
            Quantity: weekendMission.Quantity,
        });
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <h3 style={{ margin: 0 }}>
                            {weekendMission.Level}<br />
                        </h3>
                    </div>
                    <div className="col-12">
                        <GameItemImage id={weekendMission.IterationAppId} />
                    </div>
                    <div className="col-12 pt1">
                        {weekendMission.NpcMessage}
                    </div>
                    <div className="col-12 pt1">
                        <PositiveButton onClick={() => {
                            const timeStamp = (new Date()).getTime();
                            setMessageFlow({ ...weekendMission.NpcMessageFlows, timeStamp });
                            setOpen(true)
                        }} >
                            <i className="material-icons">chat</i>
                            <span>{i18next.t(LocaleKey.readConversation).toString()}</span>
                        </PositiveButton>
                    </div>
                </div >
                <hr />
                <div className="row">
                    <div className="col-12">
                        {i18next.t(LocaleKey.requiresTheFollowing)}
                    </div>
                    <div className="col-12">
                        <GenericListPresenter
                            list={weekendMissionRequirements}
                            presenter={RequiredItemListTile}
                            isCentered={true}
                        />
                    </div>
                    <div className="col-12 pt1">
                        <PositiveButton onClick={() => {
                            setMessageFlow(weekendMission.PortalMessageFlows);
                            setOpen(true)
                        }} >
                            <i className="material-icons">chat</i>
                            <span>{i18next.t(LocaleKey.readConversation).toString()}</span>
                        </PositiveButton>
                    </div>
                </div>
                <hr />
                <div className="row justify noselect">
                    {
                        props.level > props.minLevel &&
                        <div className="col-6">
                            <PositiveButton additionalClass="full"
                                onClick={() => { props.navigateToWeekendMissionLevel(props.level - 1) }} >
                                <span>&lt;&lt;&nbsp;{i18next.t(LocaleKey.previousWeekendMission).toString()}</span>
                            </PositiveButton>
                        </div>
                    }
                    {
                        props.level < props.maxLevel &&
                        <div className="col-6">
                            <PositiveButton additionalClass="full"
                                onClick={() => { props.navigateToWeekendMissionLevel(props.level + 1) }} >
                                <span>{i18next.t(LocaleKey.nextWeekendMission).toString()}&nbsp;&gt;&gt;</span>
                            </PositiveButton>
                        </div>}
                </div>
            </>
        );
    }

    return (
        <>
            <HeadComponent title={props.title} />
            <NavBar title={props.title} />
            <div className="content">
                <div className="container full pt1">
                    <div className="row">
                        <div className="col-12">
                        </div>
                    </div>
                    {handleLoadingOrError((localProps: IProps) => displayWeekendMissionData(localProps.weekendMissionStage))}
                </div>
            </div>
            <WeekendMissionDialog isOpen={isOpen} close={() => setOpen(false)}>
                <WeekendMissionDialogContent
                    messageFlow={currentMessageFlow}
                    close={() => setOpen(false)}
                />
            </WeekendMissionDialog>
        </>
    );
}
