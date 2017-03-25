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
    errorText: null
  };
  componentWillUnmount() {
      if (this.state.serverRequest) {
          serverRequest.abort();
      }
  }
  handleUpdateInput = (value) => {
    // fetch the data
    const index = 'papers'; // TODO
    const URL = `http://10.10.10.10:9200/${index}/_search?q=*&pretty`; // TODO
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
