import React from 'react';
import { forceCheck } from 'react-lazyload';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GameItemModel } from '../../contracts/GameItemModel';
import { State } from '../../redux/state';
import { AllGameItemsService } from '../../services/AllGameItemsService';
import './catalogue.scss';
import { CatalogueListPresenter } from './catalogueListPresenter';

interface IProps {
    location: any;
    match: any;
    history: any;
    selectedLanguage?: string;
}

interface IState {
    items: Array<GameItemModel>;
    displayItems: Array<GameItemModel>;
    searchTerm: string;
    types: string;
}

export class CatalogueListContainerUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            items: new Array<GameItemModel>(),
            displayItems: new Array<GameItemModel>(),
            searchTerm: '',
            types: props.match?.params?.types ?? ''
        }
    }

    componentDidMount() {
        this.fetchData(this.state.types);
    }

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        const newTypes = this.props.match?.params?.types ?? '';
        const prevSelectedLanguage = prevProps.selectedLanguage;
        if (this.state.types !== newTypes || this.props.selectedLanguage !== prevSelectedLanguage) {
            this.fetchData(newTypes);
        }
    }

    fetchData = async (newTypes: string) => {
        const allGameItemsService = new AllGameItemsService();
        var itemsResult = await allGameItemsService.getSelectedCatalogueItems(newTypes.split('-'));
        if (!itemsResult.isSuccess) {
            // Error
            return;
        }
        forceCheck();
        this.setState(() => {
            return {
                displayItems: itemsResult.value,
                items: itemsResult.value,
                searchTerm: '',
                types: newTypes
            }
        });
    }

    onSearchTextChange = (e: any) => {
        e.persist();

        const searchValue = e?.target?.value || '';
        this.search(null, searchValue);
    }

    search = (e: any, searchText: string) => {
        if (e) e.preventDefault();

        if (this.state.searchTerm === searchText) return;

        const newDisplayItems = new Array<GameItemModel>();
        for (const itemIndex in this.state.items) {
            if (this.state.items.hasOwnProperty(itemIndex)) {
                const item = this.state.items[itemIndex];
                if (!item.Name.toLowerCase().includes(searchText.toLowerCase())) continue;
                newDisplayItems.push(item);
            }
        }
        this.setState(() => {
            return {
                displayItems: newDisplayItems,
                searchTerm: searchText
            };
        }, () => {
            forceCheck();
        });
    }

    render() {
        return (
            <CatalogueListPresenter {...this.state} {...this.props}
                onSearchTextChange={this.onSearchTextChange}
                search={this.search}
            />
        );
    }
}


export const mapStateToProps = (state: State) => {
    return {
        selectedLanguage: state.settingReducer.selectedLanguage,
    };
};

export const CatalogueListContainer = connect(mapStateToProps)(withRouter(CatalogueListContainerUnconnected));