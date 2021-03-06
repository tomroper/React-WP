import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, browserHistory, Redirect} from 'react-router';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data : [],
    }
  }

  componentWillMount(){
    this._fetchData();
  }


  _fetchData() {
      jQuery.ajax({
        method: 'GET',
        url: 'http://fourth.academy.red/wp-json/wp/v2/posts',
        success: data => this.setState({
          data: data
          })
      })

  }

  _stripTags(input){
    input = input.replace(/(<([^>]+)>)/ig,"");
    return input
  }

  render() {
    const {data} = this.state;
    if (data.length > 0 ){
    return (
      <div>
        <h1 className="page_title">The Final Frontier...</h1>
        <h2>Content in this page is from <a href="http://fourth.academy.red/" target="_blank">fourth.academy.red</a>, a really great blog about heading to space</h2>
        {data.map((d, i) => <div key={i}><h1 className="post_title">{d.title.rendered}</h1><p>{this._stripTags(d.content.rendered)}</p></div>)}
        <h3>Powered with React & Wordpress for your viewing pleasure</h3>
        <h3>Made by Tom Roper</h3>
      </div>);

  } else {
      return <p>no data - loading</p>;
  }


  } //render close
} //App close
