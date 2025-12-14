"use client"

import {upload, ImageKitAbortError, ImageKitInvalidRequestError, ImageKitServerError, ImageKitUploadNetworkError,} from "@imagekit/next";
import config from "@/lib/config";
import {useCallback, useRef, useState} from "react";
import Image from "next/image";

const { env: {imagekit: {publicKey, urlEndpoint}}} = config;
// Ensure urlEndpoint has no trailing slash to avoid accidental double slashes
const safeUrlEndpoint = (urlEndpoint || '').replace(/\/+$/, "");
const authenticator = async ()=> {
    try{
        // Use relative API route to avoid reliance on NEXT_PUBLIC_API_ENDPOINT being set
        const response = await fetch(`/api/auth/imagekit`)

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Request failed with status ${response.status}: ${errorText}`)
        }

        const {signature, expire, token} = await response.json()
        return {signature, expire, token}

    } catch (error: any) {
        throw new Error(`Authentication request failed: ${error.message}`)
    }
}
type ImageUploadProps = {
    // Called with the uploaded file path (e.g., from ImageKit) so parent forms can store it
    onFileChange?: (value: string) => void;
}

const ImageUpload = ({ onFileChange }: ImageUploadProps) => {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const abortController = new AbortController();

    const [file, setFile] = useState<{filePath: string; url?: string; previewSrc?: string} | null>(null)
    const [progress, setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] ?? null;
        setSelectedFile(f);
        setProgress(0);
        setFile(null);
        setErrorMsg(null);
    }, []);

    const handleUpload = async () => {
        // If no file is chosen, open the file picker so the user sees a reaction
        if (!selectedFile) {
            fileInputRef.current?.click();
            return;
        }

        try {
            setUploading(true);
            setErrorMsg(null);
            const auth = await authenticator();

            const result = await upload({
                file: selectedFile,
                fileName: selectedFile.name,
                publicKey,
                token: auth.token,
                signature: auth.signature,
                expire: auth.expire,
                onProgress: (e) => {
                    setProgress(Math.round((e.loaded / e.total) * 100));
                },
                abortSignal: abortController.signal,
            });

            // Debug: inspect upload result shape (remove after verification)
            // eslint-disable-next-line no-console
            console.log("ImageKit upload result:", result);

            // Normalize filePath and construct a safe preview src
            const normalizedPath = (result.filePath ?? '').replace(/^\/+/, '');
            const fullUrl = (result as any).url as string | undefined;
            const previewSrc = fullUrl || (safeUrlEndpoint && normalizedPath ? `${safeUrlEndpoint}/${normalizedPath}` : '');

            if (!fullUrl && !normalizedPath) {
                setErrorMsg("Upload completed but preview URL is unavailable.");
                setFile(null);
                return;
            }

            setFile({ filePath: normalizedPath, url: fullUrl, previewSrc });
            // Notify parent about the new file path for form state binding (only when non-empty)
            if (normalizedPath) onFileChange?.(normalizedPath);
        } catch (error) {
            if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted");
                setErrorMsg("Upload aborted");
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
                setErrorMsg(`Invalid request: ${error.message}`);
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
                setErrorMsg("Network error. Please check your connection and try again.");
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
                setErrorMsg("Server error. Please try again later.");
            } else {
                console.error("Unknown upload error:", error);
                setErrorMsg("Unexpected error during upload.");
            }
        } finally {
            setUploading(false);
        }
    }

    return(
        <div className="flex flex-col gap-4">

            <input
                type="file"
                ref={fileInputRef}
                onChange={onInputChange}
                accept="image/*"
                className="hidden"
            />

            <button
                type="button"
                className="upload-btn"
                onClick={handleUpload}
                disabled={uploading}
                aria-busy={uploading}
            >
                <Image src="/icons/upload.svg" alt="upload-icon" width={20} height={20} className="object-contain"/>
                <p className="text-base text-light-100">
                    {selectedFile ? (uploading ? "Uploading..." : "Upload Selected Card") : "Upload Student Card"}
                </p>
                {file && <p className="upload-filename">{file.filePath}</p>}
            </button>

            {progress > 0 && <progress value={progress} max={100} />}

            {!selectedFile && (
                <p className="text-sm text-light-100/70">No file selected. Click the button to choose a file.</p>
            )}

            {selectedFile && !file && !uploading && (
                <p className="text-sm text-light-100/90">Selected: {selectedFile.name}</p>
            )}

            {errorMsg && (
                <p className="text-sm text-red-500">{errorMsg}</p>
            )}

            {/* Guarded preview: render only with a non-empty src */}
            {file?.previewSrc ? (
                <Image
                    src={file.previewSrc}
                    alt={file.filePath || 'uploaded-image'}
                    width={500}
                    height={500}
                    unoptimized
                />
            ) : (
                selectedFile && !uploading && !file?.previewSrc && (
                    <p className="text-sm text-light-100/80">Preview unavailable. The image will still be attached to the form.</p>
                )
            )}

        </div>
    )
}
export default ImageUpload
