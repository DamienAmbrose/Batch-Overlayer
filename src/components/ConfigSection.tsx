import { useState, useContext } from 'react';
import './ConfigSection.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage as rImage, faEye as rEye, faPaperPlane as rPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faImage as sImage, faEye as sEye, faPaperPlane as sPaperPlane } from '@fortawesome/free-solid-svg-icons';

import FilePicker from './FilePicker.tsx';
import FieldSelector from './FieldSelector.tsx';
import GridSelector from './GridSelector.tsx';
import GridSelectorOption from './GridSelectorOption.tsx';
import { CanvasContext } from '../App.tsx';

function ConfigSection() {
    const [
        openPanel,
        setOpenPanel,
    ] = useState("import");

    const { setCanvasAspectRatio, setColumns, setImages, setOverlay} = useContext(CanvasContext);

    return (
        <aside className="config">
            <nav className="tab-row">
                <input type="radio" id="import_radio" name="config_pane_group" className="hidden" value='import' onChange={(e) => setOpenPanel(e.target.value)} checked={openPanel === 'import'} />
                <label htmlFor="import_radio" className='clickable'>
                    <FontAwesomeIcon icon={openPanel === 'import' ? sImage : rImage} />
                    Import
                </label>

                <input type="radio" id="adjust_radio" name="config_pane_group" className="hidden" value='adjust' onChange={(e) => setOpenPanel(e.target.value)} checked={openPanel === 'adjust'} />
                <label htmlFor="adjust_radio" className='clickable'>
                    <FontAwesomeIcon icon={openPanel === 'adjust' ? sEye : rEye} />
                    Adjust
                </label>

                <input type="radio" id="export_radio" name="config_pane_group" className="hidden" value='export' onChange={(e) => setOpenPanel(e.target.value)} checked={openPanel === 'export'} />
                <label htmlFor="export_radio" className='clickable'>
                    <FontAwesomeIcon icon={openPanel === 'export' ? sPaperPlane : rPaperPlane} />
                    Export
                </label>
            </nav>

            <main className="content">
                <section className="config_pane" id="import_pane" inert={openPanel !== 'import'}>
                    <FilePicker id='photos_picker' accept='image/*' multiple
                        text='Photos'
                        note='Max 20 files, 2.5 MB each'
                        onUpload={async (files) => {
                            if (!files) return;

                            const bitmaps = await Promise.all(
                                Array.from(files).map(file => createImageBitmap(file))
                            );

                            setImages(bitmaps);
                        }} />

                    <FilePicker id='overlay_picker' accept='image/*'
                        text='Overlay'
                        note='Max 2.5 MB' 
                        onUpload={async(file) => {
                            if (!file) return;
                            setOverlay(await createImageBitmap(file[0]));
                        }}/>

                    <GridSelector title='Dimensions' name='dimensions_selector' onOptionChange={(aspectRatio) => setCanvasAspectRatio(Number(aspectRatio))}>
                        <GridSelectorOption id='legal'
                            text='Legal'
                            description='8.5in x 14in'
                            value={1.65} />

                        <GridSelectorOption id='A4' checked
                            text='A4'
                            description='21cm x 29.7cm'
                            value={1.414} />

                        <GridSelectorOption id='letter'
                            text='Letter'
                            description='8.5in x 11in'
                            value={1.294} />
                    </GridSelector>

                    <FieldSelector type='number' subtype='number' id='columns_field' onChange={(columns) => setColumns(columns)}
                        min={1} max={20} value={1}
                        text='Columns'
                        note='Range: 0-20' />
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