import React, { useState } from 'react';
import './FilePicker.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud as rCloud } from '@fortawesome/free-regular-svg-icons';

interface FilePickerProps {
    id: string;
    accept: string;
    text: string;
    note?: string;
    multiple?: boolean;
    disabled?: boolean;
	onUpload?: (v: FileList | undefined) => void;
}

function FilePicker({id, accept, note, multiple, disabled, text, onUpload}: FilePickerProps) {
    const [
        fileCount,
        setFileCount
    ] = useState(0);

    function handleFileInput(event:React.ChangeEvent<HTMLInputElement>) {
        event.target.files && setFileCount(event.target.files?.length);
        onUpload?.(event.target.files?? undefined);
    }

    return (
    <fieldset className='file_picker_field' disabled={disabled}>
        <input type="file" className="hidden" id={id} accept={accept} multiple={multiple} onChange={handleFileInput}/>
        <label htmlFor={id}>
            {text} {multiple && <>({fileCount})</>}
            {note && <small>{note}</small>}
        </label>
        <button onClick={() => document.getElementById(id)?.click()} className='clickable' aria-hidden='true' tabIndex={-1}>
            <FontAwesomeIcon icon={rCloud}/>
            Upload file
        </button>
    </fieldset>
    )
}

export default FilePicker