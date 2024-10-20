import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { CircularProgress } from '@mui/material';

const FileUploaderComponent = forwardRef(({ onFileSelect }, ref) => {
    const [previewURL, setPreviewURL] = useState('');
    const fileInputRef = useRef(null);

    // Expose methods to parent component through ref
    useImperativeHandle(ref, () => ({
        resetInput: () => {
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }));

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

        // Revoke the previous URL if it exists
        if (previewURL) {
            URL.revokeObjectURL(previewURL);
        }

        // Create temporary preview
        const tempURL = URL.createObjectURL(file);
        setPreviewURL(tempURL);
        onFileSelect(file, tempURL);
    };

    // Cleanup effect
    useEffect(() => {
        return () => {
            if (previewURL) {
                URL.revokeObjectURL(previewURL);
            }
        };
    }, [previewURL]);

    return (
        <div className="file-uploader">
            <div className="upload-container">
                <div className="input-container">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="file-input"
                    />
                </div>
            </div>
        </div>
    );
});

FileUploaderComponent.displayName = 'FileUploaderComponent';

export default FileUploaderComponent;