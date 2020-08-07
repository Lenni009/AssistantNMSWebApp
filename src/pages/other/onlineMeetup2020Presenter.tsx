import i18next from 'i18next';
import React from 'react';
import { HeadComponent } from '../../components/core/headComponent';
import { SmallLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { NetworkState } from '../../constants/NetworkState';
import { OnlineMeetup2020SubmissionViewModel } from '../../contracts/generated/onlineMeetup2020SubmissionViewModel';
import { LocaleKey } from '../../localization/LocaleKey';
import './_onlineMeetup.scss';

interface IProps {
    history: any;
    items: Array<OnlineMeetup2020SubmissionViewModel>;
    status: NetworkState;
}

export const OnlineMeetup2020SubmissionPresenter: React.FC<IProps> = (props: IProps) => {
    const handleLoadingOrError = (displayFunc: (props: IProps) => void) => {
        if (props.status === NetworkState.Loading) return SmallLoading();
        if (props.status === NetworkState.Error ||
            props.items == null || props.items.length < 1) {
            return (<h2 className="pt1">{i18next.t(LocaleKey.somethingWentWrong)}</h2>);
        }
        return displayFunc(props);
    }

    const displayMeetupSubmissions = (items: Array<OnlineMeetup2020SubmissionViewModel>) => {
        var submissions = [];
        for (const item of items) {
            submissions.push(
                <div key={item.guid} className="col-12 col-lg-3 col-md-4 col-sm-6 col-xs-12 card">
                    <div className="card-image">
                        <img src={item.imageUrl} alt="Submission" />
                    </div>
                    <div className="card-content row">
                        <div className="col-3 col-lg-2 col-md-3 col-sm-3 col-xs-4 user-details">
                            <img src={item.userImage} className="user" alt="User Icon" />
                        </div>
                        <div className="col-9 col-lg-10 col-md-9 col-sm-9 col-xs-8 user-name">
                            <h3>{item.userName}</h3>
                        </div>
                        {
                            (item.text != null && item.text.length > 1)
                                ? <div className="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <hr />
                                    <p className="user-text">{item.text}</p>
                                </div>
                                : null
                        }
                    </div>
                </div>
            );
        }
        return (
            <div className="row">
                <div className="col-12">
                    {submissions}
                </div>
            </div>
        );
    }
    return (
        <>
            <HeadComponent title="Online Meetup 2020" />
            <NavBar title="Online Meetup 2020" />
            <div className="content">
                <div className="container full pt1">
                    {handleLoadingOrError((localProps: IProps) => displayMeetupSubmissions(localProps.items))}
                    <br />
                </div>
            </div>
        </>
    );

}
