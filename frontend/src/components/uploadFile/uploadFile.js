import React, { Component } from 'react';
import { postAPI } from '../../services/serviceapi';


class Upload extends Component {

    state = {
        // Initially, no file is selected
        selectedFile: null,
        report_bin: null,
        nome: "",
        tipo: ""
    };

    binaryUpload = () => {
        const file = this.state.selectedFile;
        console.log(file); //I can see the file's info
        
        console.log(file instanceof Blob);

        this.setState({
            nome: file.name,
            report_bin: this.state.selectedFile,
            tipo: this.state.selectedFile.type
        },
            function () {
                postAPI("http://127.0.0.1:8000/filetransfer/relatorio", this.state)
            }
        )
        
    }

    base64 = selectedFile => {
        return new Promise(resolve => {
            let selFile = this.state.selectedFile;
            //console.log(selFile);

            let file = null;
            //let fileName = "";
            //Check File is not Empty
            if (selFile.size > 0) {
                // Select the very first file from list
                //fileName = selFile.name;
                // FileReader function for read the file.
                let fileReader = new FileReader();
                fileReader.readAsDataURL(selFile);

                // Onload of file read the file content
                fileReader.onload = function (fileLoadedEvent) {
                    file = fileLoadedEvent.target.result;
                    //console.log("B64: " + file);
                    resolve(file);
                    
                    // Print data in console
                    //console.log(file);
                };
            }
        })
    }

    handleUploadFile = event => {
        let file = this.state.selectedFile;

        this.base64(file)
            .then(result => {
                let fileName = file.name;
                //console.log("File Is", file);
                console.log("B64: " + result);
                this.setState({
                    nome: fileName,
                    report_bin: result,
                    tipo: this.state.selectedFile.type
                },
                    function () {
                        postAPI("http://127.0.0.1:8000/filetransfer/relatorio", this.state)
                    }
                )
            })
            .catch(err => {
                console.log(err);
            });
    }

    // On file select (from the pop up)
    onFileChange = event => {

        // Update the state
        this.setState({ selectedFile: event.target.files[0] });

    };

    // File content to be displayed after
    // file upload is complete
    fileData = () => {
        if (this.state.selectedFile) {
            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>

                    <p>File Type: {this.state.selectedFile.type}</p>

                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    render() {
        return (
            <div>
                <h1>
                    Upload File
                </h1>
                <h3>
                    File Upload using React!
                </h3>
                <div>
                    <input type="file" onChange={this.onFileChange} />
                    <button onClick={this.handleUploadFile}>
                        Upload!
                    </button>
                </div>
                {this.fileData()}
            </div>
        );
    }
}

export default Upload;