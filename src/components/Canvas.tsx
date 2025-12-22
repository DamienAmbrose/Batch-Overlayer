import { useContext, useEffect, useRef } from "react";
import { CanvasContext } from "../App";

interface CanvasProps {
    id: string;
}

function Canvas({ id }: CanvasProps) {
    const { setCanvas, portraitMode, canvasArea, canvasAspectRatio, columns, images, overlay } = useContext(CanvasContext);

    function getYPos(images: ImageBitmap[], i: number, cols: number): number {
        if (i < cols) return 0; 
        const aboveIndex = i - cols;
        const aboveImage = images[aboveIndex];
        const scaledHeight = aboveImage.height * ((width / columns) / aboveImage.width);
        return getYPos(images, aboveIndex, cols) + scaledHeight;
    }

    useEffect(() => {
        const context = contextRef.current;
        if (!context) return;

        context.clearRect(0, 0, width, height);
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);
        for (var i = 0; i < images.length; i++) {
            const image = images[i];
            const imageWidth = width / columns;
            const xPos = (i % columns);
            const yPos = (Math.trunc(i / columns) > 0) ? getYPos(images, i, columns) : 0;
            context.drawImage(image, xPos * imageWidth, yPos, imageWidth, image.height * (imageWidth / image.width))
            overlay && context.drawImage(overlay, xPos * imageWidth, yPos, imageWidth, overlay.height * (imageWidth / overlay.width))
        }
    }, [canvasArea, canvasAspectRatio, columns, images, overlay]);

    let width_tmp = Math.sqrt(canvasArea * canvasAspectRatio);
    let height_tmp = canvasArea / width_tmp;

    let width = portraitMode ? height_tmp : width_tmp;
    let height = portraitMode ? width_tmp : height_tmp;

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        contextRef.current = canvas.getContext('2d');

        setCanvas(canvas);
    }, []);

    return (
        <canvas id={id} width={width} height={height} ref={canvasRef} />
    )
}

export default Canvas