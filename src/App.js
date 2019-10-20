import React from 'react';

import './App.css';
import Navbar from './components/navbar/navbar.component';
import SearchPage from './pages/Search/Search.page';
import ComparisonPage from './pages/Comparision/Comparision.page';

class  App extends React.Component {

  constructor(){
    super();
    this.state={
      mutualFunds: [],
      currentRoute:'search',
      selectedForComparision:[],
      currentSearchInput:''
    }
  }

  changeRoute = (route) => {

    this.setState({
      currentRoute:route
    })
  }

  componentDidMount=()=>{
      fetch('https://api.piggy.co.in/v2/mf/search/',{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          search:'',
          rows : 2,
          offset: 1
        })
      })
      .then(response => response.json())
      .then(queryResult => queryResult.data.search_results)
      .then(funds => {

          this.setState({
            mutualFunds:funds,
            
          })
      })
      .catch(err => console.error('Something went wrong!'))
  }
 
  
  getSearchInput = (text) => {

    fetch('https://api.piggy.co.in/v2/mf/search/',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        search:text,
        rows : 2,
        offset: 1
      })
    })
    .then(response => response.json())
    .then(queryResult => queryResult.data.search_results)
    .then(funds => {

        this.setState({
          mutualFunds:funds,
          currentSearchInput:text
        })
    })
    .catch(err => console.error('Something went wrong!'))
  }

  bringInForComparision = (mutualFund) => {

    let array = this.state.selectedForComparision;

    array.push(mutualFund);

    this.setState({
      selectedForComparision:array
    })
  }

  removeFromComparision = (mutualFund) => {
    let array = this.state.selectedForComparision.filter(fund => (
      fund.id !== mutualFund.id
    ))

    this.setState({
      selectedForComparision:array
    })
  }

  render() {
    const { mutualFunds, currentRoute, selectedForComparision, currentSearchInput } = this.state;
    
    let currentPage = null;
    
    if(currentRoute === 'search'){
      currentPage = <SearchPage 
                        currentSearchInput={currentSearchInput}
                        getSearchInput={this.getSearchInput} 
                        mutualFundsList = {mutualFunds}
                        selectedForComparision={selectedForComparision}
                        bringInForComparision={this.bringInForComparision} 
                        removeFromComparision={this.removeFromComparision}    
                    />
    }
    else if(currentRoute === 'compare'){
      currentPage = <ComparisonPage fundsToBeCompared={this.state.selectedForComparision}/>
    }

    return (
      <div className="App">
          <Navbar changeRoute={this.changeRoute}/>
          {
            
            currentPage
            
          }
          
      </div>
    );
  }
  
}

export default App;
