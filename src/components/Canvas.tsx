import { useContext } from "react";
import { CanvasContext } from "../App";

function Canvas() {
	const { canvasArea, canvasAspectRatio } = useContext(CanvasContext);

    let width = Math.sqrt(canvasArea * canvasAspectRatio);
    let height = canvasArea / width;

    return (
        <canvas width={width} height={height}/>
    )
}

export default Canvas