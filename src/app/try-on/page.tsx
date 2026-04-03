"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import styles from './TryOn.module.css';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/lib/currency';
import { getSpectacleImageUrl } from '@/lib/spectacleImages';

export default function TryOn() {
    const vtoProducts = products.filter(p => !p.isNew || p.isBestSeller).slice(0, 10);
    const [activeProduct, setActiveProduct] = useState(vtoProducts[0]);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [cameraError, setCameraError] = useState<string | null>(null);
    const [isSecure, setIsSecure] = useState(true);
    const [isFrontCamera, setIsFrontCamera] = useState(true);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
    const [showOverlay, setShowOverlay] = useState(true);
    const [loading, setLoading] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const { addToCart } = useCart();

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isCameraOn) return;
        const { currentTarget, clientX, clientY } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;
        setMousePos({ x, y });
    };

    useEffect(() => {
        if (typeof window !== 'undefined' && !window.isSecureContext && window.location.hostname !== 'localhost') {
            setIsSecure(false);
        }
    }, []);

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then(d => {
            const videoDevices = d.filter(device => device.kind === 'videoinput');
            setDevices(videoDevices);
            if (videoDevices.length > 0) setSelectedDeviceId(videoDevices[0].deviceId);
        });
    }, []);

    const stopCamera = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    }, []);

    const startCamera = useCallback(async (useFront?: boolean, deviceId?: string) => {
        setLoading(true);
        setCameraError(null);
        setCapturedImage(null);
        stopCamera();

        try {
            const constraints: MediaStreamConstraints = {
                video: deviceId ? { deviceId: { exact: deviceId } } : {
                    facingMode: useFront ? 'user' : 'environment'
                },
                audio: false
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setTimeout(() => {
                    videoRef.current?.play().catch(e => console.error("Video play failed:", e));
                }, 100);
            }
            setIsCameraOn(true);
            setLoading(false);
            if (!deviceId) {
                const videoTrack = stream.getVideoTracks()[0];
                if (videoTrack?.getSettings()?.deviceId) {
                    setSelectedDeviceId(videoTrack.getSettings().deviceId!);
                }
            }
            console.log("Camera successfully started using device:", deviceId || "default");
        } catch (err: unknown) {
            setLoading(false);
            const error = err as Error;
            if (error.name === 'NotAllowedError') {
                setCameraError('Camera access was denied. Please allow camera access in your browser settings.');
            } else if (error.name === 'NotFoundError') {
                setCameraError('No camera found on this device.');
            } else if (error.name === 'NotReadableError') {
                setCameraError('Camera is in use by another application.');
            } else {
                setCameraError('Unable to access camera. Please check your permissions.');
            }
        }
    }, [stopCamera]);

    const handleSwitchCamera = useCallback(() => {
        const newFront = !isFrontCamera;
        setIsFrontCamera(newFront);
        startCamera(newFront);
    }, [isFrontCamera, startCamera]);

    const handleCapture = useCallback(() => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                // Mirror the capture if front camera
                if (isFrontCamera) {
                    ctx.translate(canvas.width, 0);
                    ctx.scale(-1, 1);
                }
                ctx.drawImage(video, 0, 0);
                const dataUrl = canvas.toDataURL('image/png');
                setCapturedImage(dataUrl);
            }
        }
    }, [isFrontCamera]);

    const handleStopCamera = useCallback(() => {
        stopCamera();
        setIsCameraOn(false);
        setCapturedImage(null);
        setCameraError(null);
    }, [stopCamera]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, [stopCamera]);

    return (
        <div className={styles.tryOnPage}>
            <div className={styles.container}>
                <div className={styles.vtoSidebar}>
                    <div className={styles.sidebarHeader}>
                        <Link href="/" className={styles.backBtn}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                            Back Home
                        </Link>
                        <div className={styles.header}>
                            <h1>3D Try-On</h1>
                            <p>Experience our premium frames on your face with simulated 3D depth tracking.</p>
                        </div>
                    </div>

                    <div className={styles.productPicker}>
                        {vtoProducts.map(p => (
                            <div
                                key={p.id}
                                className={`${styles.pickerItem} ${activeProduct.id === p.id ? styles.active : ""}`}
                                onClick={() => setActiveProduct(p)}
                            >
                                <div className={styles.pickerImage}>
                                    <Image src={getSpectacleImageUrl(p.id, p.variants[0].name)} alt={p.name} fill />
                                </div>
                                <div className={styles.pickerInfo}>
                                    <h4>{p.name}</h4>
                                    <span>{p.category} • {formatINR(p.price)}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.sidebarFooter}>
                        <button
                            className="btn btn-primary"
                            style={{ width: '100%' }}
                            onClick={() => addToCart(activeProduct, activeProduct.variants[0])}
                        >
                            Add {activeProduct.name} to Bag
                        </button>
                    </div>
                </div>

                <div className={styles.vtoMain}>
                    <div className={styles.vtoOverlay} onMouseMove={handleMouseMove}>
                        {!isCameraOn ? (
                            <div className={styles.vtoPlaceholder}>
                                <div className={styles.vtoIcon}>
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                                </div>
                                <h2>Real-time Try On</h2>
                                <p>Allow camera access to see how our frames look on your face in real-time. Works on laptops, phones &amp; tablets. We never store your camera data.</p>
                                {!isSecure && (
                                    <div className={styles.cameraError}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                                        <span><strong>Security Warning:</strong> Camera access requires HTTPS or localhost. Please use http://localhost:3000 instead of an IP address.</span>
                                    </div>
                                )}
                                {cameraError && (
                                    <div className={styles.cameraError}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                                        <span>{cameraError}</span>
                                    </div>
                                )}
                                <div className={styles.vtoMainBtns}>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => startCamera(true)}
                                        disabled={loading}
                                    >
                                        {loading ? "Accessing Camera..." : "Enable Live Camera"}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.cameraView}>
                                <div className={styles.cameraHeader}>
                                    <select
                                        className={styles.deviceSelect}
                                        value={selectedDeviceId}
                                        onChange={(e) => {
                                            const newId = e.target.value;
                                            setSelectedDeviceId(newId);
                                            startCamera(undefined, newId);
                                        }}
                                    >
                                        {devices.map(device => (
                                            <option key={device.deviceId} value={device.deviceId}>
                                                {device.label || `Camera ${devices.indexOf(device) + 1}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className={styles.liveVideo}>
                                    {capturedImage ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={capturedImage}
                                            alt="Captured"
                                            className={styles.capturedImg}
                                        />
                                    ) : (
                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            playsInline
                                            muted
                                            className={`${styles.videoFeed} ${isFrontCamera ? styles.mirrored : ''}`}
                                        />
                                    )}
                                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                                    {showOverlay && (
                                        <div
                                            className={styles.arFrame}
                                            style={{
                                                transform: `translate(calc(-50% + ${mousePos.x * 40}px), calc(-50% + ${mousePos.y * 40}px)) rotateY(${mousePos.x * 15}deg) rotateX(${-mousePos.y * 10}deg)`
                                            }}
                                        >
                                            <Image
                                                src={activeProduct.variants[0].image}
                                                alt="AR Frame"
                                                width={400}
                                                height={200}
                                                className={styles.frameOverlay}
                                                priority
                                            />
                                        </div>
                                    )}
                                    <div className={styles.scanLine} />
                                </div>
                                <div className={styles.cameraControls}>
                                    <button
                                        className={styles.controlBtn}
                                        onClick={() => setShowOverlay(!showOverlay)}
                                        style={{ border: showOverlay ? '1px solid var(--primary)' : '1px solid transparent', color: showOverlay ? 'var(--primary)' : 'white' }}
                                    >
                                        {showOverlay ? "Hide Frames" : "Show Frames"}
                                    </button>
                                    <button className={styles.controlBtn} onClick={handleStopCamera}>
                                        Stop
                                    </button>
                                    {capturedImage ? (
                                        <button
                                            className={styles.retakeBtn}
                                            onClick={() => setCapturedImage(null)}
                                        >
                                            Retake
                                        </button>
                                    ) : (
                                        <button className={styles.captureBtn} onClick={handleCapture} />
                                    )}
                                    <button className={styles.controlBtn} onClick={handleSwitchCamera}>
                                        Flip Camera
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={styles.vtoFooter}>
                        <div className={styles.currentFrame}>
                            <span>{isCameraOn ? 'Live Camera Active' : 'Waiting for Initialization'}</span>
                            <strong>{activeProduct.name} - {activeProduct.variants[0].name}</strong>
                            <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>
                                Tip: Center your face in the guide for the best fit.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
