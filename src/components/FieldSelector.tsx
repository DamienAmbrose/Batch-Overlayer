import React, {  useRef, useState } from 'react';
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
				<label htmlFor={id}>
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
	else if (type === 'string') 
		return (
		<fieldset className='input_field'>
			<label htmlFor={id}>
				{text}
				{note && <small>{note}</small>}
			</label>

			{props.type === 'string' &&
				<input className='clickable' type={subtype} id={id}
					value={fieldValue as number}
					placeholder={props.placeholder}
					onChange={(v) => { 
						setFieldValue(v.target.value);
						props.onChange?.(v.target.value);
					}}/>
			}
		</fieldset>
	)
	else if (type === 'boolean') {
		let checkbox = useRef<HTMLDivElement | null>(null);
		let checkboxInner = useRef<HTMLDivElement | null>(null);

		const handleMouseMove = (event: MouseEvent) => {
			if (!checkbox.current || !checkboxInner.current) return;
			const checkboxRect = checkbox.current.getBoundingClientRect();
			const checkboxInnerRect = checkboxInner.current.getBoundingClientRect();

			const offsetX = event.clientX - checkboxRect.x;
			const paddingRight = parseFloat(getComputedStyle(checkbox.current).paddingRight || '0');

			const maxX = checkboxRect.width - checkboxInnerRect.width - paddingRight;
			const clampedX = Math.min(Math.max(0, offsetX), maxX);

			checkboxInner.current.style.setProperty('margin-left', `${clampedX}px`);
			setFieldValue(clampedX > maxX / 2);
			props.onChange?.(clampedX > maxX / 2);
		}

		return (
		<fieldset className='input_field'>
			{props.type === 'boolean' &&
				<input className='hidden' type={subtype} id={id}
					checked={fieldValue as boolean}
					onChange={(v) => { 
						setFieldValue(v.target.checked);
						props.onChange?.(v.target.checked);
					}}/>
			}

			<label htmlFor={id}>
				{text}
				{note && <small>{note}</small>}
			</label>

			<div className='checkbox_visual' ref={checkbox} 
				onMouseDown={() => { 
					document.body.addEventListener('mousemove', handleMouseMove);
					document.body.addEventListener('mouseup', () => {
						document.body.removeEventListener('mousemove', handleMouseMove);
						checkboxInner.current!.style.removeProperty('margin-left');
					}, { once: true });
				}} 
				onClick={() => { setFieldValue(!(fieldValue as boolean)); props.onChange?.(!(fieldValue as boolean)) }}>
				<div className='checkbox_inner' ref={checkboxInner} />
			</div>
		</fieldset>
		)
	}
}

export default FieldSelector