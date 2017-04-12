// import React from 'react';
import * as React from 'react'; // typescript

import fetch from 'unfetch';
import AutoComplete from 'material-ui/AutoComplete';

import Config from '../../config/config.js';

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


class Searchbox extends React.Component<any, any> {
  state = {
    dataSource: [],
    errorText: null
  };
  serverRequest = null;
  componentWillUnmount() {
      if (this.serverRequest) {
          this.serverRequest.abort();
      }
  }
  handleUpdateInput = (value) => {

    let searchterm = value;
    if (!value) {
      searchterm = '*';
    }

    // fetch the data
    const URL = `${Config.elasticsearch}/${Config.index}/_search?q=${searchterm}&pretty`; // TODO
    this.serverRequest = fetch(URL, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(r => r.json())
      .then((response) => {
          console.log(URL, response);

          let autosuggestData = [],
              errorText = null;

          if (response.hits.total) {
            autosuggestData = response.hits.hits;
          } else {
            if (value !== '') {
              errorText = 'Nothing found';
            }
          }

          this.setState({
            dataSource: autosuggestData,
            errorText
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
          errorText={this.state.errorText}
          animated={true}
        />
      </div>
    );
  }
}

export default Searchbox;
