import React, { useState } from 'react';
import { getStorage } from 'firebase/storage';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { CircularProgress } from '@mui/material';
import { app } from '../../firebase';
import { showSuccessToast } from './tools';

const FileUploaderComponent = ({ dir, onUploadSuccess }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [fileURL, setFileURL] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            alert('File size must be less than 5MB');
            return;
        }

        uploadFile(file);
    };

    const uploadFile = (file) => {
        setIsUploading(true);
        setUploadProgress(0);

        const storage = getStorage(app);
        const timestamp = new Date().getTime();
        const uniqueFilename = `${timestamp}_${file.name}`;
        const storageRef = ref(storage, `${dir}/${uniqueFilename}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error('Upload error:', error);
                setIsUploading(false);
                alert('Error uploading file. Please try again.');
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        setFileURL(downloadURL);
                        onUploadSuccess(uniqueFilename, downloadURL);
                        setIsUploading(false);
                        // Show success toast only once after successful upload
                        showSuccessToast("Image uploaded successfully!");
                    })
                    .catch((error) => {
                        console.error('Error getting download URL:', error);
                        setIsUploading(false);
                        alert('Error getting file URL. Please try again.');
                    });
            }
        );
    };

    return (
        <div className="file-uploader">
            <div className="upload-container">
                <div className="input-container">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="file-input"
                    />
                </div>
                
                {isUploading && (
                    <div className="progress-container">
                        <CircularProgress 
                            variant="determinate" 
                            value={uploadProgress} 
                            size={24}
                            className="progress-spinner"
                        />
                        <span className="progress-text">
                            {Math.round(uploadProgress)}%
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUploaderComponent;