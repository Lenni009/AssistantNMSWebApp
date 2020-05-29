
import React from 'react';
import { Helmet } from 'react-helmet';
import { getNewDocumentTitle } from '../../helper/documentHelper';

interface IProps {
    title?: string;
    description?: string;
}

export const HeadComponent: React.FC<IProps> = (props: IProps) => {
    if (props.title == null) return null;
    if (props.title != null && props.description == null) return (
        <Helmet>
            <title>{getNewDocumentTitle(props.title)}</title>
        </Helmet>
    );

    return (
        <Helmet>
            <title>{getNewDocumentTitle(props.title)}</title>
            <meta name="description" content={props.description}></meta>
            <meta name="subject" content={props.description}></meta>
            <meta itemProp="description" content={props.description}></meta>
            <meta property="og:description" content={props.description}></meta>
            <meta name="twitter:description" content={props.description}></meta>
        </Helmet>
    );
}
