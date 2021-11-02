import React from 'react';

import { Fab } from '@material/react-fab'
import { Tooltip } from 'react-tippy';

interface IProps {
    keyString: string;
    icon: React.ReactElement<HTMLElement, string | React.JSXElementConstructor<any>>;
    tooltipText?: string;
    onClick: (e: any) => void;
}

export const BaseFloatingActionButton = (props: IProps) => {
    const child = (
        <Fab className="fab-bg-color fab-margin"
            key={props.keyString}
            icon={props.icon}
            onClick={props.onClick}
        />
    );

    if (props.tooltipText != null) {
        return (
            <Tooltip
                key={props.keyString + 'tooltip'}
                title={props.tooltipText}
                arrow={true}
                theme="light"
                position="bottom-start"
            >
                {child}
            </Tooltip>
        );
    }
    return (child);
}