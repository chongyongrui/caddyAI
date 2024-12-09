import React, { useRef, useEffect } from 'react';

const CameraPage = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    useEffect(() => {
        // Check if OpenCV.js is already loaded
        if (window.cv) {
            console.log('OpenCV.js is already loaded');
            return;
        }

        // Dynamically load the OpenCV.js library from the CDN
        const script = document.createElement('script');
        script.src = 'https://docs.opencv.org/4.x/opencv.js';
        script.async = true;
        script.onload = () => {
            if (window.cv && window.cv.getBuildInformation) {
                console.log('OpenCV.js is ready!');
            } else {
                console.error('Failed to load OpenCV.js.');
            }
        };
        script.onerror = () => console.error('Error loading OpenCV.js.');
        document.body.appendChild(script);

        // Cleanup on component unmount
        return () => {
            stopCamera();
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, []);

    // Function to detect faces and overlay them
    const detectAndDraw = (src) => {
        // Create a canvas to draw on top of the video
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Convert image to grayscale for face detection
        const gray = new window.cv.Mat();
        window.cv.cvtColor(src, gray, window.cv.COLOR_RGBA2GRAY);

        // Load the Haar Cascade classifier for face detection
        const faceCascade = new window.cv.CascadeClassifier();
        faceCascade.load('haarcascade_frontalface_default.xml');  // Update the path to where you store the xml file

        // Detect faces
        const faces = new window.cv.RectVector();
        faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, new window.cv.Size(30, 30));

        // Draw rectangles around the detected faces
        for (let i = 0; i < faces.size(); i++) {
            const face = faces.get(i);
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 3;
            ctx.strokeRect(face.x, face.y, face.width, face.height);
        }

        // Free memory
        gray.delete();
        faceCascade.delete();
    };

    // Function to capture each frame and apply face detection
    const processFrame = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            // Ensure the canvas matches the video size
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Draw the current video frame onto the canvas
            ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

            // Convert the canvas to OpenCV Mat
            const src = window.cv.imread(canvas);
            detectAndDraw(src);
            src.delete();
        }
    };

    useEffect(() => {
        const interval = setInterval(processFrame, 100); // Update the frame every 100ms for real-time processing

        // Cleanup when the component is unmounted
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline style={{ width: '100%' }} />
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
            <div>
                <button onClick={startCamera}>Start Recording</button>
                <button onClick={stopCamera}>Stop Recording</button>
            </div>
        </div>
    );
};

export default CameraPage;
