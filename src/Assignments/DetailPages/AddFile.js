import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions,  CardMedia, CardTitle} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import {Redirect} from 'react-router';

import targetUrl from '../../util/targetUrl.js';
import {getUsername, setUsername} from '../../util/username.js';
import {getCourseID, setCourseID } from '../../util/courseInfo.js';
import {getMaterialID, setMaterialID} from '../../util/materialInfo.js';

class AddFile extends Component {
    constructor(props) {
      super(props);
      this.state = {
        userID: getUsername(),
        classID: getCourseID(),
        materialID: getMaterialID(),
        file: ''
      };
      this._handleChange = this._handleChange.bind(this);
      this._handleSubmit = this._handleSubmit.bind(this);
    }
  
    _handleSubmit(e) {
      e.preventDefault();
      var data = new FormData();
      var doc = this.state.file;
      
      var f = new File([""], "filename.txt", {type: "text/plain"});

      console.log(doc);

      var key = doc.name;
      var value = doc;
      data.set(key, doc);
  
      for(var pair of data.entries()){
        console.log(pair[0]+', '+pair[1]);
      }
  
      
  
      fetch(targetUrl + '/users/' + this.state.userID + '/classes/' + this.state.classID + '/assignments/' + this.state.materialID + '/files/', {
        method: "POST",
        headers: {
        //   'Content-Type': 'application/json',
        //   'Accept': 'application/json'
        },
        body: data
      })
      .then((response) => {
        console.log(response.json());
      });
      this.forceUpdate();
    }
  
    _handleChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
      reader.readAsDataURL(file)
    }
  
    render() {

      return (
        <div>
          <form onSubmit={this._handleSubmit}>
            <input type="file" onChange={this._handleChange} />
            <button type="submit" onClick={this._handleSubmit}>Upload File</button>
          </form>
        </div>
      )
    }
  
  }

  export default AddFile;