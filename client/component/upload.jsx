import React from 'react';
import { Component } from 'react';
import FileDrop from 'react-file-drop';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      name: '',
      size: '',
      type: ''
    };
    this.handleUpload = this.handleUpload.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrop(files) {
    console.log(files);
    const file = files[0];
    const name = file.name;
    const size = file.size;
    const type = file.type;

    console.log(name, size, type);

    this.setState({
      file,
      name,
      size,
      type
    });
  }

  handleUpload(e) {
    // prevent reload
    e.preventDefault();

    // create new multi formdata
    const data = new FormData();

    //apend whole file and filename into data 
    data.append('file', this.state.file);
    data.append('filename', this.state.name);
   
    //send file to backend
    fetch('/upload', {
      method: 'POST',
      body: data
    })
    .then(res => {
      console.log('Uploaded!');
      // reset page
      this.setState({
        name: '',
        size: '',
        type: ''
      })
    })
    .catch(err => {
      console.log('Err in POST')
    })
  }
  

  render() {
  
    return (
      <div>
        <form onSubmit={this.handleUpload}>
          <div id="uploadContainer">
             <div style={{ border: '2px dashed black', width: 600, height: 100, color: 'black', textAlign: 'center', padding: 20 }}>
                <FileDrop onDrop={this.handleDrop}>
                  <strong> Drop some files here! </strong>
                </FileDrop>
            </div>
          </div>
          <br />

          <div id="name">
            Name: {this.state.name}
          </div>

          <div id="type">
            Size: {this.state.size}
          </div>

          <div id="size">
            Type: {this.state.type}
          </div>

          <div>
            <button>Upload</button>
          </div>

        </form>
        </div>
    )
  }
}

export default Upload;