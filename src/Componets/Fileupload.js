import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './Fileupload.css';
import Webcam from 'react-webcam';
import { saveIdentification } from '../utils/storage';

function FileUpload() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [showWebcam, setShowWebcam] = useState(false);
    const webcamRef = useRef(null);

    useEffect(() => {
        // Check if the device is mobile
        const checkMobile = () => {
            setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const fileInputRef = useRef(null);
    const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB in bytes

    const handleFileUpload = async (event) => {
        try {
            setLoading(true);
            setError(null);

            const file = event.target.files[0];
            if (!file) {
                throw new Error('No file selected');
            }

            if (!file.type.startsWith('image/')) {
                throw new Error('Please select an image file');
            }

            if (file.size > MAX_FILE_SIZE) {
                throw new Error('File size exceeds 20MB limit');
            }

            // Create image preview
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);

            if (!process.env.REACT_APP_GOOGLE_API_KEY) {
                throw new Error('API key is not configured');
            }

            const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            
            // Convert the file to base64
            const reader = new FileReader();
            reader.readAsDataURL(file);
            
            const result = await new Promise((resolve, reject) => {
                reader.onload = async () => {
                    try {
                        const base64Data = reader.result.split(',')[1];
                        const response = await model.generateContent([
                            "Describe this plant image all about ,in which family it belongs and everything and also give it india local anme or hindi name",
                            {
                                inlineData: {
                                    data: base64Data,
                                    mimeType: file.type
                                }
                            }
                        ]);

                        if (!response || !response.response) {
                            throw new Error('Invalid response from the API');
                        }

                        resolve(response);
                    } catch (error) {
                        reject(error);
                    }
                };
                reader.onerror = (error) => reject(new Error('Error reading file: ' + error));
            });

            const response = await result.response;
            const text = response.text();
            if (!text) {
                throw new Error('No analysis result received');
            }
            setAnalysisResult(text);
            
            // Save the result and image to localStorage
            saveIdentification(imagePreview, text);

        } catch (err) {
            console.error('Error during file upload and analysis:', err);
            setError(err.message || 'An error occurred during file upload and analysis. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const files = e.dataTransfer.files;
        if (files.length) {
            const event = { target: { files: files } };
            handleFileUpload(event);
        }
    };

    return (
        <div className="file-upload-container">
            <h2>Try it</h2>
            <div className="button-container">
                <button 
                    className="action-button"
                    onClick={() => fileInputRef.current.click()}
                >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="button-icon">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                    Upload Image
                </button>
                <button 
                    className="action-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowWebcam(!showWebcam);
                    }}
                >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="button-icon">
                        <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"/>
                    </svg>
                    Take Photo
                </button>
                {showWebcam && (
                    <div className="camera-container">
                        <div className="camera-view">
                            <Webcam
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={{
                                    facingMode: isMobile ? 'environment' : 'user'
                                }}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div className="camera-controls">
                                <button 
                                    className="camera-button" 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const imageSrc = webcamRef.current.getScreenshot();
                                        if (imageSrc) {
                                            fetch(imageSrc)
                                                .then(res => res.blob())
                                                .then(blob => {
                                                    const file = new File([blob], 'webcam-capture.jpg', { type: 'image/jpeg' });
                                                    handleFileUpload({ target: { files: [file] } });
                                                    setShowWebcam(false);
                                                });
                                        }
                                    }}
                                >
                                    📸
                                </button>
                                <button 
                                    className="close-button" 
                                    onClick={() => setShowWebcam(false)}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    capture={isMobile ? 'environment' : undefined}
                />
            </div>
            {/* Remove the duplicate mobile button since we already have a "Take Photo" button in the button-container */}
            {/* {isMobile && (
                <button 
                    onClick={() => fileInputRef.current.click()}
                    style={{
                        marginTop: '20px',
                        padding: '8px 16px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        margin: '20px auto'
                    }}
                >
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px' }}>
                        <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"/>
                    </svg>
                    Take Photo
                </button>
            )} */}

            {loading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                </div>
            )}
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {imagePreview && (
                <div className="image-preview">
                    <img 
                        src={imagePreview} 
                        alt="Preview" 
                        style={{ 
                            maxWidth: '300px', 
                            maxHeight: '300px', 
                            marginTop: '20px',
                            borderRadius: '8px'
                        }} 
                    />
                </div>
            )}

            {analysisResult && (
                <div className="analysis-result">
                    <h3 style={{ fontFamily: '"Montserrat", "Helvetica Neue", sans-serif', color: '#00885a' }}>Species Identification</h3>
                    <p style={{ whiteSpace: 'pre-wrap', fontFamily: '"Montserrat", "Helvetica Neue", sans-serif' }}>{analysisResult}</p>
                </div>
            )}
        </div>
    );
}

export default FileUpload;