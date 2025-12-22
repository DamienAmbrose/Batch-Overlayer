import './App.css'
import { useState, createContext } from 'react'
import Canvas from './components/Canvas'
import ConfigSection from './components/ConfigSection'

export const CanvasContext = createContext<{
	canvasArea: number;
	canvasAspectRatio: number;
	portraitMode: boolean;
	columns: number;
	images: ImageBitmap[];
	overlay: ImageBitmap | undefined;
	canvas: HTMLCanvasElement | null;
    setCanvasArea: React.Dispatch<React.SetStateAction<number>>;
    setCanvasAspectRatio: React.Dispatch<React.SetStateAction<number>>;
    setPortraitMode: React.Dispatch<React.SetStateAction<boolean>>;
    setColumns: React.Dispatch<React.SetStateAction<number>>;
    setImages: React.Dispatch<React.SetStateAction<ImageBitmap[]>>;
    setOverlay: React.Dispatch<React.SetStateAction<ImageBitmap | undefined>>;
    setCanvas: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>;
}>
({
	canvasArea: 0,
	canvasAspectRatio: 1,
	portraitMode: false,
	columns: 1,
	images: [],
	overlay: undefined,
	canvas: null,
    setCanvasArea: () => {},
    setCanvasAspectRatio: () => {},
	setPortraitMode: () => {},
    setColumns: () => {},
    setImages: () => {},
    setOverlay: () => {},
	setCanvas: () => {}
});

function App() {
	const [canvasArea, setCanvasArea] = useState(353555);
	const [canvasAspectRatio, setCanvasAspectRatio] = useState(1.41429);
	const [columns, setColumns] = useState(1);
	const [images, setImages] = useState([] as ImageBitmap[]);
	const [overlay, setOverlay] = useState(undefined as ImageBitmap | undefined);
	const [canvas, setCanvas] = useState(null as HTMLCanvasElement | null);
	const [portraitMode, setPortraitMode] = useState(false);

	return (
		<CanvasContext.Provider value={{ canvasArea: canvasArea, canvasAspectRatio: canvasAspectRatio, portraitMode: portraitMode, columns: columns, images: images, overlay: overlay, canvas: canvas, setCanvasArea, setCanvasAspectRatio, setPortraitMode, setColumns, setImages, setOverlay, setCanvas }}>
			<ConfigSection/>
			<main>
				<Canvas id='main_canvas'/>
			</main>
		</CanvasContext.Provider>
	)
}

export default App