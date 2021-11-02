
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { anyObject } from '../../../helper/typescriptHacks';

import { Processor } from '../../../contracts/Processor';
import { processorItem } from '../../../constants/Route';

import { TextContainer } from '../../common/tile/textContainer';
import { ImageContainer } from '../../common/tile/imageContainer';
import { GameItemService } from '../../../services/json/GameItemService';
import { RequiredItem } from '../../../contracts/RequiredItem';
import { RequiredItemDetails } from '../../../contracts/RequiredItemDetails';
import { TileLoading } from '../../core/loading/loading';
import { RequiredItemsQuantityContainer } from '../../common/tile/quantityContainer';


interface IProps extends Processor {
    singleItemImage: string;
    doubleItemImage: string;
    tripleItemImage: string;
}

interface IState {
    item: Processor;
    colour: string;
    requiredItems: Array<RequiredItemDetails>;
    gameItemService: GameItemService;
}

class ProcessorItemListTileClass extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            item: anyObject,
            colour: '',
            requiredItems: [],
            gameItemService: new GameItemService()
        }

        this.fetchData([this.props.Output, ...this.props.Inputs]);
    }

    fetchData = async (items: Array<RequiredItem>) => {
        const requiredItemsTasks = items.map(async (item: RequiredItem) => {
            const itemDetails = await this.state.gameItemService.getItemDetails(item.Id);
            if (!itemDetails.isSuccess) return null;

            const requiredItemDetails: RequiredItemDetails = {
                Id: itemDetails.value.Id,
                Icon: itemDetails.value.Icon,
                Name: itemDetails.value.Name,
                Colour: itemDetails.value.Colour,
                Quantity: item.Quantity
            }
            return requiredItemDetails;
        });
        const requiredItemsResults = await Promise.all(requiredItemsTasks);
        const requiredItems: Array<RequiredItemDetails | any> = requiredItemsResults.filter(r => r);

        if (requiredItems.length < 1) {
            console.error('Could not fetch data for all refiner inputs');
            return;
        }

        this.setState((prev: IState) => {
            return {
                requiredItems: requiredItems,
                colour: requiredItems.length === 1 ? requiredItems[0].Colour : prev.colour
            }
        });
    }

    render() {
        if (!this.state.requiredItems || this.state.requiredItems.length === 0) {
            return (<TileLoading />);
        }

        const output = this.state.requiredItems[0];
        const requiredItems = this.state.requiredItems;
        return (
            <Link to={`${processorItem}/${this.props.Id}`} data-id="ProcessorItemListTile" className="gen-item-container" draggable={false}>
                <ImageContainer Name={output.Name} Icon={output.Icon} Colour={this.state.colour} OutputQuantity={output.Quantity} />
                <div className="gen-item-content-container">
                    <TextContainer text={output.Name} />
                    <RequiredItemsQuantityContainer requiredItems={requiredItems} />
                </div>
            </Link>
        );
    }
}


export const ProcessorItemListTile = (props: any | Processor): JSX.Element => <ProcessorItemListTileClass {...props} />;