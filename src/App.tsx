import './App.css'
import { useState, createContext } from 'react'
import Canvas from './components/Canvas'
import ConfigSection from './components/ConfigSection'

export const CanvasContext = createContext<{
	canvasArea: number;
	canvasAspectRatio: number;
	columns: number;
	images: ImageBitmap[];
	overlay: ImageBitmap | undefined;
    setCanvasArea: React.Dispatch<React.SetStateAction<number>>;
    setCanvasAspectRatio: React.Dispatch<React.SetStateAction<number>>;
    setColumns: React.Dispatch<React.SetStateAction<number>>;
    setImages: React.Dispatch<React.SetStateAction<ImageBitmap[]>>;
    setOverlay: React.Dispatch<React.SetStateAction<ImageBitmap | undefined>>;
}>
({
	canvasArea: 0,
	canvasAspectRatio: 1,
	columns: 1,
	images: [],
	overlay: undefined,
    setCanvasArea: () => {},
    setCanvasAspectRatio: () => {},
    setColumns: () => {},
    setImages: () => {},
    setOverlay: () => {}
});

function App() {
	const [canvasArea, setCanvasArea] = useState(353555);
	const [canvasAspectRatio, setCanvasAspectRatio] = useState(1.41429);
	const [columns, setColumns] = useState(1);
	const [images, setImages] = useState([] as ImageBitmap[]);
	const [overlay, setOverlay] = useState(undefined as ImageBitmap | undefined);

	return (
		<CanvasContext.Provider value={{ canvasArea: canvasArea, canvasAspectRatio: canvasAspectRatio, columns: columns, images: images, overlay: overlay, setCanvasArea, setCanvasAspectRatio, setColumns, setImages, setOverlay }}>
			<ConfigSection/>
			<main>
				<Canvas id='main_canvas'/>
			</main>
		</CanvasContext.Provider>
	)
}

export default App