import { useState } from 'react';
import './ConfigSection.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage as rImage, faEye as rEye, faPaperPlane as rPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faImage as sImage, faEye as sEye, faPaperPlane as sPaperPlane } from '@fortawesome/free-solid-svg-icons';

function ConfigSection() {
    const [
        openPanel,
        setOpenPanel,
    ] = useState("import");

    return (
    <section className="config">
        <div className="tab-row">
            <input type="radio" id="import_radio" name="config_pane_group" value='import' onChange={(e) => setOpenPanel(e.target.value)} checked={openPanel === 'import'}/> 
            <label htmlFor="import_radio">
                {openPanel === 'import' ? <FontAwesomeIcon icon={sImage}/> : <FontAwesomeIcon icon={rImage}/> }
                <div className="label_text"> Import </div>
            </label>

            <input type="radio" id="adjust_radio" name="config_pane_group" value='adjust' onChange={(e) => setOpenPanel(e.target.value)} checked={openPanel === 'adjust'}/> 
            <label htmlFor="adjust_radio">
                {openPanel === 'adjust' ? <FontAwesomeIcon icon={sEye}/> : <FontAwesomeIcon icon={rEye}/> }
                <div className="label_text"> Adjust </div>
            </label>

            <input type="radio" id="export_radio" name="config_pane_group" value='export' onChange={(e) => setOpenPanel(e.target.value)} checked={openPanel === 'export'}/> 
            <label htmlFor="export_radio">
                {openPanel === 'export' ? <FontAwesomeIcon icon={sPaperPlane}/> : <FontAwesomeIcon icon={rPaperPlane}/> }
                <div className="label_text"> Export </div>
            </label>
        </div>

        <div className="content">
            <div className="config_pane" id="import_pane" inert={openPanel !== 'import'}>

            </div>

            <div className="config_pane" id="adjust_pane" inert={openPanel !== 'adjust'}>

            </div>

            <div className="config_pane" id="export_pane" inert={openPanel !== 'export'}>

            </div>
        </div>
    </section>
    )
}

export default ConfigSection 