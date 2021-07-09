/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'; 
import { SearchingText } from '../../components/inputs'; 
import { BarHomepage } from '../../components/bars';
import { TableSearching } from '../../components/tables';
import { Container } from '@material-ui/core'
import { retrieveWording } from '../../api'

export class HomeContainer extends React.Component {
  constructor(props){
    super(props) 
    this.state = {
      valueSearch: '',
      rows: [],
      isLoading: true
    }
  }

  async componentDidMount() { 
    try { 
      const resp = await retrieveWording();
        this.setState({ rows: resp.data, isLoading: false})
      
    } catch(err) {
      // error handling
      console.log(err.message)
    }
      
    
  }

  handleInputSearch = e => {
    const { value: valueSearch } = e.target;   
    this.setState({ valueSearch });
  }

  formatCompareSearch = s => {
    return s.trim().toLowerCase();
  }

  filterRows = () => {
    return this.state.rows
      .filter(word => this.formatCompareSearch(word).includes(this.formatCompareSearch(this.state.valueSearch)))
      .map((word, index) => ({ word, id: index + 1 })) 
  }

  render() { 
    return (
      <React.Fragment>
        <BarHomepage />
        <Container fixed>
          <SearchingText handleInputSearch= {this.handleInputSearch} /> 
          <TableSearching rows= {this.filterRows()} isLoading= {this.state.isLoading} />
        </Container>
      </React.Fragment>
    )
  }
} 

 