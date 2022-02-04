import React, { ReactNode } from 'react';

interface IProps {
    orig: string;
}

const paleYellowColourClass = '#C9D68B';
const goldColourClass = '#B09857';
const darkRedColourClass = '#AE615E';
const paleBlueColourClass = '#83BCDB';
const greenColourClass = '#AADE9B';
const purpleColourClass = '#B0A5DD';
const offWhiteColourClass = '#F5F5F5';
const orangeColourClass = '#F3A923';
const redColourClass = '#C03022';

const getColourValueFromTag = (tag: string) => {

    switch (tag.toUpperCase()) {
        case 'IMG': return '';

        case 'EARTH':
        case 'TITLE':
        case 'TRANS_EXP':
        case 'TEMPERATURE':
        case 'TECHNOLOGY':
        case 'TECHNOLOLY': return paleBlueColourClass;

        case 'TRANS_TRA':
        case 'TRADEABLE': return greenColourClass;

        case 'TRANS_WAR':
        case 'WARNING': return darkRedColourClass;

        case 'FUEL': return redColourClass;
        case 'STELLAR': return paleYellowColourClass;
        case 'COMMODITY': return goldColourClass;
        case 'SPECIAL': return purpleColourClass;
        case 'VAL_ON': return offWhiteColourClass;
        case 'CATALYST': return orangeColourClass;

        /*
            [<TEMPERATURE>, tech170]
        */
    }

    console.warn('unknown tag', tag);
    return '';
}

export const DecriptionRegexHighlightText: React.FC<IProps> = (props: IProps) => {
    console.log(props.orig);

    const groupRegex = new RegExp(/(<\w+>(\w+\s*)*<>)/);
    const tagStartRegex = new RegExp(/(.*)<(\w+)>(.*)/);
    const tagEndRegex = new RegExp(/(.*)<>(.*)/);

    let currentColourValue = '';
    let paragraphNodes: Array<ReactNode> = [];
    let groupMatches: Array<any> | null = groupRegex.exec(props.orig);
    if (groupMatches == null) return (<>{props.orig}</>);

    const renderNode = (paragraphIndex: number, wordIndex: number, word: string, colour: string, wordChain: string) => (
        <span key={`paragraph-${paragraphIndex}-word-${wordIndex}-${word}`} style={{ color: colour }}>{wordChain}</span>
    );

    const paragraphs = props.orig.split(/\r?\n/);
    for (let paragraphIndex = 0; paragraphIndex < paragraphs.length; paragraphIndex++) {
        const paragraph = paragraphs[paragraphIndex];
        if (paragraph.length < 2) continue;

        let nodes: Array<ReactNode> = [];
        let wordChain = '';
        const words = paragraph.split(' ');
        for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
            const word = words[wordIndex];
            let displayWord = word;
            let localTag = '<unused>';
            let leftOverDisplayWord = '';

            let startMatches: Array<any> | null = tagStartRegex.exec(word);
            if (startMatches != null && startMatches.length === 4) {
                displayWord = startMatches[3];
                localTag = '<' + startMatches[2] + '>';
                currentColourValue = getColourValueFromTag(startMatches[2]);
            }

            let endMatches: Array<any> | null = tagEndRegex.exec(word);
            let hasEndMatch = endMatches != null && endMatches.length >= 2;
            if (hasEndMatch) {
                displayWord = (endMatches?.[1] ?? '').replace(localTag, '');
            }
            if (endMatches != null && endMatches.length === 3) {
                leftOverDisplayWord = endMatches![2] + ' ';
            }

            if (currentColourValue.length > 1) {
                if (wordChain.length > 1) {
                    nodes.push(renderNode(paragraphIndex, wordIndex, word, '', wordChain));
                }
                nodes.push(renderNode(paragraphIndex, wordIndex + 999, displayWord, currentColourValue, displayWord + ((leftOverDisplayWord.length > 0) ? '' : ' ')));
                if (leftOverDisplayWord.length > 0) {
                    nodes.push(renderNode(paragraphIndex, wordIndex + 9999, leftOverDisplayWord, '', leftOverDisplayWord));
                }
                wordChain = '';
            } else {
                wordChain += displayWord + ' ';
            }

            if (hasEndMatch) {
                currentColourValue = '';
            }
        }

        if (wordChain.length > 1) {
            nodes.push(renderNode(paragraphIndex, 999, wordChain.length.toString(), '', wordChain));
        }

        paragraphNodes.push(
            <p key={`paragraph-${paragraphIndex}`}>
                {nodes}
            </p>
        );
    }

    return (
        <span className="highlight-text">
            {paragraphNodes}
        </span>
    );
}
