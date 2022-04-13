
import i18next from 'i18next';
import React, { } from 'react';
import { AppImage } from '../../../constants/AppImage';
import { LocaleKey } from '../../../localization/LocaleKey';
import { ImageContainer } from '../../common/tile/imageContainer';
import { TextContainer } from '../../common/tile/textContainer';

interface IProps {
    campaignId: string;
}

export const RewardFromTwitchTile: React.FC<IProps> = (props: IProps) => {
    const text = i18next.t(LocaleKey.twitchCampaignNum).replace('{0}', props.campaignId);
    const descrip = i18next.t(LocaleKey.twitchDrop);
    return (
        <div data-id="RewardFromTwitchTile" className="gen-item-container" draggable={false}>
            <ImageContainer Name="Twitch" Icon={AppImage.twitch} />
            <div className="gen-item-content-container">
                <TextContainer text={text} />
                <div className="quantity-container">{descrip}</div>
            </div>
        </div>
    );
}