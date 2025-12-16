import React, { useState } from 'react';
import './FieldSelector.css'

type FieldSelectorTypes = 'number' | 'string' | 'boolean'

type NumberFieldProps = {
    type: 'number';
    value?: number;
    min?: number;
    max?: number;
	onChange?: (v: number) => void;
};

type StringFieldProps = {
    type: 'string';
    value?: string;
    placeholder?: string;
	onChange?: (v: string) => void;
};

type BooleanFieldProps = {
    type: 'boolean';
    value?: boolean;
	onChange?: (v: boolean) => void;
};

type BaseProps = {
	id: string;
    type: FieldSelectorTypes;
	subtype: React.HTMLInputTypeAttribute
    text: string;
    note?: string;
}

type FieldSelectorProps = 
	| (BaseProps & NumberFieldProps)
	| (BaseProps & StringFieldProps)
	| (BaseProps & BooleanFieldProps)

function FieldSelector(props: FieldSelectorProps) {
	const [fieldValue, setFieldValue] = useState(props.value); 
	const {id, type, subtype, text, note} = props; 

	if (type === 'number')
	return (
		<fieldset className='input_field'>
			<label htmlFor="id">
				{text}
				{note && <small>{note}</small>}
			</label>

			{props.type === 'number' &&
				<input className='clickable' type={subtype} id={id}
					min={props.min} 
					max={props.max}
					value={fieldValue as number}
					onChange={(v) => { 
						const inValue = Number(v.target.value);
						const trueValue = 
							(props.max && inValue > props.max ? props.max : inValue) || 
							(props.min && inValue < props.min ? props.min : inValue);

						setFieldValue(trueValue);
						props.onChange?.(trueValue);
					}}/>
			}
		</fieldset>
	)
}

export default FieldSelector