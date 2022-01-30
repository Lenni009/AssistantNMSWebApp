import { CommunityMissionViewModel } from '../../contracts/generated/communityMissionViewModel';
import { GuideMetaViewModel } from '../../contracts/generated/guideMetaViewModel';
import { OnlineMeetup2020SubmissionViewModel } from '../../contracts/generated/onlineMeetup2020SubmissionViewModel';
import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { BaseApiService } from './BaseApiService';
import { WeekendMissionViewModel } from '../../contracts/generated/Model/HelloGames/weekendMissionViewModel';
import { ExpeditionSeasonViewModel } from '../../contracts/generated/Model/HelloGames/expeditionSeasonViewModel';
import { NmsfmTrackDataViewModel } from '../../contracts/generated/Model/nmsfmTrackDataViewModel';
import { anyObject } from '../../helper/typescriptHacks';
import { getHashForObject } from '../../helper/hashHelper';
import i18next from 'i18next';

export class ApiService extends BaseApiService {

    private _hashLookup: any;

    constructor() {
        super();
        this._hashLookup = anyObject;
    }

    async _getOrAdd<T>(promise: () => Promise<T>, argsArray: Array<any>) {
        const hash = getHashForObject([argsArray, i18next.language]);

        if (this._hashLookup != null && this._hashLookup[hash] != null) {
            return this._hashLookup[hash];
        }

        const jsonResult = await promise();
        this._hashLookup[hash] = jsonResult;
        return jsonResult;
    }

    async getCommunityMission(): Promise<ResultWithValue<CommunityMissionViewModel>> {
        return this._getOrAdd(() => this._getCommunityMission(), ['_getCommunityMission', (new Date()).getMinutes().toString()]);
    }

    async _getCommunityMission(): Promise<ResultWithValue<CommunityMissionViewModel>> {
        return await this.get<CommunityMissionViewModel>('HelloGames/CommunityMission/');
    }

    async getGuideMetaData(guid: string): Promise<ResultWithValue<GuideMetaViewModel>> {
        return await this.get<GuideMetaViewModel>(`guide/${guid}`);
    }

    async likeGuide(guid: string): Promise<ResultWithValue<GuideMetaViewModel>> {
        return await this.post(`guide/${guid}`, '{}');
    }

    async getOnlineMeetupSubmissions(): Promise<ResultWithValue<Array<OnlineMeetup2020SubmissionViewModel>>> {
        return await this.get<Array<OnlineMeetup2020SubmissionViewModel>>('OnlineMeetup2020Submission');
    }

    async getWeekendMission(): Promise<ResultWithValue<WeekendMissionViewModel>> {
        return await this.get<WeekendMissionViewModel>('HelloGames/WeekendMission');
    }

    async getNmsfm(): Promise<ResultWithValue<Array<NmsfmTrackDataViewModel>>> {
        return await this.get<Array<NmsfmTrackDataViewModel>>('NMSFM');
    }

    async getCurrentExpedition(): Promise<ResultWithValue<ExpeditionSeasonViewModel>> {
        return await this.get<ExpeditionSeasonViewModel>('HelloGames/Expedition');
    }
}
