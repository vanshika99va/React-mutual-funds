import React, { Component } from 'react'
import './Search.styles.scss'

import SearchBox from '../../components/search-box/searchBox.component';
import CardsContainer from '../../components/cardsContainer/cardsContainer.component';

export class SearchPage extends Component {

 
    render() {
        const { mutualFundsList, currentSearchInput, getSearchInput, selectedForComparision, bringInForComparision, removeFromComparision } = this.props;
        
        return (
            <div className='search-page'>
                <SearchBox currentSearchInput={currentSearchInput} onSubmitSearch={getSearchInput}/>
                <h3>Mutual Funds selected for comparision: {selectedForComparision.length}</h3>
                <h4>{mutualFundsList.length?`Here are your mutual fund results`:`No Result Found`}</h4>
                <CardsContainer 
                    list = {mutualFundsList}
                    selectedForComparision={selectedForComparision} 
                    bringInForComparision={bringInForComparision}
                    removeFromComparision={removeFromComparision}/>
            </div>
        )
    }
}

export default SearchPage
