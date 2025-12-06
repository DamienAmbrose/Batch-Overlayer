import './App.css'
import ConfigSection from './components/ConfigSection'

function App() {
  return (
    <>
		<ConfigSection/>

    	<section className="workspace">
			<header className="actions">

			</header>

			<main className="preview">
				<canvas></canvas>
			</main> 
    	</section>
    </>
  )
}

export default App