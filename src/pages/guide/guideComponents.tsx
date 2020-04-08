import React from 'react';
import { LazyLoadImage } from '../../components/core/lazyLoadImage/lazyLoadImage';

import { GuideSectionItem } from '../../contracts/guide/guideSectionItem';

const ReactMarkdown = require('react-markdown')

export const displaySectionTextItem = (sectionItem: GuideSectionItem, index: number) => {
    return <div key={`${sectionItem.type}-${index}`} className="col-xl-7 col-lg-10 col-md-12 col-sm-12 col-xs-12 item">
        <p className="content">{sectionItem.content}</p>
    </div>
}

export const displaySectionLinkItem = (sectionItem: GuideSectionItem, index: number) => {
    return <div key={`${sectionItem.type}-${index}`} className="col-xl-7 col-lg-10 col-md-12 col-sm-12 col-xs-12 item minHeight">
        <a href={sectionItem.content} className="link">
            {sectionItem.name}&nbsp;<i className="material-icons">open_in_new</i>
        </a>
    </div>
}

export const displaySectionImageItem = (sectionItem: GuideSectionItem, folder: string | undefined, index: number) => {
    let imageString = sectionItem.image.includes('assets/images') ? `/${sectionItem.image}` : `/assets/guide/${folder}/${sectionItem.image}`;
    return <div key={`${sectionItem.type}-${index}`} className="col-xl-7 col-lg-10 col-md-12 col-sm-12 col-xs-12 item">
        <LazyLoadImage src={imageString} alt={sectionItem.name} className="image" draggable={false} />
    </div>
}

export const displaySectionMarkdownItem = (sectionItem: GuideSectionItem, index: number) => {
    return <div key={`${sectionItem.type}-${index}`} className="col-xl-7 col-lg-10 col-md-12 col-sm-12 col-xs-12 item ta-left">
        <ReactMarkdown
            source={sectionItem.content}
            escapeHtml={false}
        />
    </div>
}