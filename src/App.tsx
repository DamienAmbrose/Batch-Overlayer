import './App.css'
import { useState, createContext } from 'react'
import Canvas from './components/Canvas'
import ConfigSection from './components/ConfigSection'

export const CanvasContext = createContext<{
	canvasArea: number;
	canvasAspectRatio: number;
    setCanvasArea: React.Dispatch<React.SetStateAction<number>>;
    setCanvasAspectRatio: React.Dispatch<React.SetStateAction<number>>;
}>
({
	canvasArea: 0,
	canvasAspectRatio: 1,
    setCanvasArea: () => {},
    setCanvasAspectRatio: () => {}
});

function App() {
	const [canvasArea, setCanvasArea] = useState(353555);
	const [canvasAspectRatio, setCanvasAspectRatio] = useState(1.41429);

	return (
		<CanvasContext.Provider value={{ canvasArea: canvasArea, canvasAspectRatio: canvasAspectRatio, setCanvasArea, setCanvasAspectRatio }}>
			<ConfigSection/>
			<main>
				<Canvas/>
			</main>
		</CanvasContext.Provider>
	)
}

export default App