import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { Error } from '../../../components/core/error/error';
import { SmallLoading } from '../../../components/core/loading/loading';
import { NetworkState } from '../../../constants/NetworkState';
import { IWeekendMissionMeta, WeekendMissions } from '../../../constants/WeekendMission';
import { WeekendMissionStage } from '../../../contracts/helloGames/weekendMissionStage';
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { LocaleKey } from '../../../localization/LocaleKey';
import { getCurrentLanguage } from '../../../redux/modules/setting/selector';
import { State } from '../../../redux/state';
import { GameItemService } from '../../../services/json/GameItemService';
import { WeekendMissionPresenter } from './weekendMissionPresenter';

interface IWithDepInj {
    gameItemService: GameItemService;
}

interface IFromRedux {
    selectedLanguage: string;
}

interface IWithoutDepInj {
    location: any;
    match: any;
    history: any;
}

interface IProps extends IFromRedux, IWithDepInj, IWithoutDepInj { }


export const WeekendMissionContainerUnconnected: React.FC<IProps> = (props: IProps) => {
    const history = useHistory();

    const [weekendMission, setWeekendMission] = useState<WeekendMissionStage>();
    const [weekendMissionMeta, setWeekendMissionMeta] = useState<IWeekendMissionMeta>();
    const [weekendMissionStatus, setWeekendMissionStatus] = useState<NetworkState>(NetworkState.Loading);

    useEffect(() => {
        fetchWeekendMissionStage();
        // eslint-disable-next-line
    }, [props.selectedLanguage, history.location.pathname]);


    const fetchWeekendMissionStage = async (newLevel?: number) => {
        const url = history.location.pathname;
        const seasIdSlashIndex = url.lastIndexOf('/');
        const seasId = url.substring(seasIdSlashIndex + 1, url.length);

        let wmSeasonObj;
        for (const seasObj of WeekendMissions) {
            if (seasObj.id !== seasId) continue;
            wmSeasonObj = seasObj;
        }
        if (wmSeasonObj == null) return;

        if (newLevel != null && newLevel != 0) {
            wmSeasonObj.level = newLevel;
        }

        const weekendMissionResult = await props.gameItemService.getWeekendMissionStage(wmSeasonObj.weekendMissionJson, wmSeasonObj.season, wmSeasonObj.level);
        if (!weekendMissionResult.isSuccess) {
            setWeekendMissionStatus(NetworkState.Error);
            return;
        }

        setWeekendMissionMeta({
            level: wmSeasonObj.level,
            maxLevel: wmSeasonObj.maxLevel,
            minLevel: wmSeasonObj.minLevel,
        });
        setWeekendMission(weekendMissionResult.value)
        setWeekendMissionStatus(NetworkState.Success);
    }

    const navigateToWeekendMissionLevel = (newLevel: number) => {
        setWeekendMissionStatus(NetworkState.Loading);
        fetchWeekendMissionStage(newLevel);
    }


    if (weekendMissionStatus === NetworkState.Loading || weekendMissionMeta == null)
        return (<SmallLoading />);

    if (weekendMissionStatus === NetworkState.Error)
        return (<Error />);


    return (
        <WeekendMissionPresenter
            key={`weekend-missin-presenter-${props.selectedLanguage}`}
            {...props}
            weekendMissionStage={weekendMission!}
            status={weekendMissionStatus}
            level={(weekendMissionMeta!).level}
            maxLevel={(weekendMissionMeta!).maxLevel}
            minLevel={(weekendMissionMeta!).minLevel}
            navigateToWeekendMissionLevel={navigateToWeekendMissionLevel}
        />
    );
}

export const mapStateToProps = (state: State) => {
    return {
        selectedLanguage: getCurrentLanguage(state),
    };
};

export const WeekendMissionContainer = withServices<IWithoutDepInj, IWithDepInj>(
    connect(mapStateToProps)(withRouter(WeekendMissionContainerUnconnected)),
    (services: IDependencyInjection) => ({
        gameItemService: services.gameItemService,
    })
);