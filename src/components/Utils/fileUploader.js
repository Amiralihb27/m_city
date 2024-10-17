import React, { Component } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Firebase Storage imports
import { CircularProgress } from  '@mui/material';

class FileUploaderComponent extends Component {

    state = { 
        name: '', // Name of the file
        isUploading: false,
        fileURL: '' // URL of the uploaded file
    };

    handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            this.handleUploadStart();
            this.uploadFile(file);
        }
    };

    handleUploadStart = () => {
        this.setState({ isUploading: true });
    };

    handleUploadError = (error) => {
        console.error(error);
        this.setState({ isUploading: false });
    };

    handleUploadSuccess = (filename, downloadURL) => {
        this.setState({
            name: filename,
            fileURL: downloadURL,
            isUploading: false
        });
    };

    uploadFile = (file) => {
        const storage = getStorage(); // Initialize Firebase Storage
        const storageRef = ref(storage, `${this.props.dir}/${file.name}`); // Create a reference to the file location

        const uploadTask = uploadBytesResumable(storageRef, file); // Start the file upload

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Optional: handle progress if you want
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                // Handle error during upload
                this.handleUploadError(error);
            },
            () => {
                // On successful upload, get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    this.handleUploadSuccess(file.name, downloadURL);
                });
            }
        );
    };

    render() {
        const { isUploading, fileURL } = this.state;

        return (
            <div>
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={this.handleFileChange}
                    />
                </div>
                {isUploading && <CircularProgress />}
                {fileURL && (
                    <div>
                        <p>File uploaded successfully!</p>
                        <img src={fileURL} alt="Uploaded file" style={{ width: '200px' }} />
                    </div>
                )}
            </div>
        );
    }
}

export default FileUploaderComponent;
