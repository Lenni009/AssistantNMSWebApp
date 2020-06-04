import i18next from 'i18next';
import * as React from 'react';
import { TextContainer } from '../../common/tile/textContainer';
import { LocaleKey } from '../../../localization/LocaleKey';
import { LazyLoadImage } from '../lazyLoadImage/lazyLoadImage';


export const Loading = () => {

    return (
        <>
            <div className="full-page-loader opacity80"></div>
            <div className="full-page-loader">
                <div className="cssload-container">
                    <ul className="cssload-flex-container">
                        <li style={{ listStyleType: 'none' }}>
                            <img
                                src="/assets/images/loader.svg"
                                draggable="false"
                                alt="loading-animation"
                            />
                            <h2 className="largeHeading">Loading...</h2>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export const SmallLoading = () => {

    return (
        <div className="container">
            <ul className="row">
                <div className="col-12" style={{ textAlign: 'center' }}>
                    <img
                        src="/assets/images/loader.svg"
                        draggable="false"
                        alt="loading-animation"
                        style={{ maxWidth: '100px' }}
                    />
                    <h2 className="largeHeading">Loading...</h2>
                </div>
            </ul>
        </div>
    );
}

export const TileLoading = () => {
    return (
        <div className="gen-item-container">
            <div className="image-container" style={{ paddingRight: '1em' }}>
                <LazyLoadImage src="/assets/images/loader.svg" alt="loading" draggable={false} style={{
                    width: '100px', maxHeight: '100px',
                    padding: '0.25em 1em'
                }} />
            </div>
            <div className="gen-item-content-container">
                <TextContainer text={i18next.t(LocaleKey.loading)} additionalCss="full" />
            </div>
        </div>
    );
}
