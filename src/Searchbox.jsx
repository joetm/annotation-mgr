import React from 'react';

import fetch from 'unfetch';
import AutoComplete from 'material-ui/AutoComplete';


const styles = {
  wrapper: {
    margin: '2em',
    textAlign: 'center',
  },
  input: {
    width: '80%',
  },
  autocomplete: {
    wrapper: {
      width: '100%',
    }
  }
};


class Searchbox extends React.Component {
  state = {
    dataSource: [],
    serverRequest: null,
  };
  componentWillUnmount() {
      if (this.state.serverRequest) {
          serverRequest.abort();
      }
  }
  handleUpdateInput = (value) => {
    // fetch the data
    const URL = "http://10.10.10.10:9200/"; // TODO
    this.serverRequest = fetch(URL, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(r => r.json())
      .then((autosuggestData) => {
          console.log(URL, autosuggestData);
          this.setState({
            dataSource: [
              value,
              value + value,
              value + value + value,
            ],
          }
      );
    });
  };
  render() {
    return (
      <div style={styles.wrapper}>
        <AutoComplete
          textFieldStyle={styles.input}
          hintText="Search Keyword"
          style={styles.autocomplete.wrapper}
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}
          animated={true}
        />
      </div>
    );
  }
}

export default Searchbox;
