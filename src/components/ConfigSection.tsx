import { useState, useContext } from 'react';
import './ConfigSection.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage as rImage, faEye as rEye, faPaperPlane as rPaperPlane} from '@fortawesome/free-regular-svg-icons';
import { faImage as sImage, faEye as sEye, faPaperPlane as sPaperPlane } from '@fortawesome/free-solid-svg-icons';

import FilePicker from './FilePicker.tsx';
import GridSelector from './GridSelector.tsx';
import { GridSelectorOption } from './GridSelectorOption.tsx';
import { CanvasContext } from '../App.tsx';

const AspectRatios = {
    'A4': 1.414,
    'legal': 1.65,
    'letter': 1.294
}

function ConfigSection() {
    const [
        openPanel,
        setOpenPanel,
    ] = useState("import");

    const { setCanvasAspectRatio } = useContext(CanvasContext);

    return (
    <aside className="config">
        <nav className="tab-row">
            <input type="radio" className="hidden" id="import_radio" name="config_pane_group" value='import' onChange={(e) => setOpenPanel(e.target.value)} checked={openPanel === 'import'}/> 
            <label htmlFor="import_radio" className='clickable'>
                <FontAwesomeIcon icon={openPanel === 'import' ? sImage : rImage}/>
                Import
            </label>

            <input type="radio" className="hidden" id="adjust_radio" name="config_pane_group" value='adjust' onChange={(e) => setOpenPanel(e.target.value)} checked={openPanel === 'adjust'}/> 
            <label htmlFor="adjust_radio" className='clickable'>
                <FontAwesomeIcon icon={openPanel === 'adjust' ? sEye : rEye}/>
               Adjust
            </label>

            <input type="radio" className="hidden" id="export_radio" name="config_pane_group" value='export' onChange={(e) => setOpenPanel(e.target.value)} checked={openPanel === 'export'}/> 
            <label htmlFor="export_radio" className='clickable'>
                <FontAwesomeIcon icon={openPanel === 'export' ? sPaperPlane : rPaperPlane}/>
                Export
            </label>
        </nav>

        <main className="content">
            <section className="config_pane" id="import_pane" inert={openPanel !== 'import'}>
                <FilePicker id='photos_picker' name='image_picker' accept='image/*' text='Photos' note='Max 20 files, 2.5 MB each' multiple/>

                <FilePicker id='overlay_picker' name='overlay_picker' accept='image/*' text='Overlay' note='Max 2.5 MB'/>

                <GridSelector title='Dimensions' name='dimensions_selector' onOptionChange={(value) => {setCanvasAspectRatio(AspectRatios[value as keyof typeof AspectRatios])}}>
                    <GridSelectorOption id='legal' text='Legal' description='8.5in x 14in'/>
                    <GridSelectorOption id='A4' text='A4' description='21cm x 29.7cm' checked/>
                    <GridSelectorOption id='letter' text='Letter' description='8.5in x 11in'/>
                </GridSelector>
            </section>

            <section className="config_pane" id="adjust_pane" inert={openPanel !== 'adjust'}>

            </section>

            <section className="config_pane" id="export_pane" inert={openPanel !== 'export'}>

            </section>
        </main>
    </aside>
    )
}

export default ConfigSection 