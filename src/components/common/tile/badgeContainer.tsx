
import * as React from 'react';
import classNames from 'classnames';

interface IProps {
    Quantity: number;
    Colour?: string;
}

export const BadgeContainer = (props: IProps) => {
    let styleObj: any = {};
    if (props.Colour != null) {
        styleObj.backgroundColor = `#${props.Colour}`;
    }
    let classObj = {
        large: props.Quantity > 9,
        xlarge: props.Quantity > 99,
        xxlarge: props.Quantity > 999,
    };
    return (
        <div className={classNames('badge-container', classObj)} style={styleObj}>
            {props.Quantity}
        </div>
    );
};
