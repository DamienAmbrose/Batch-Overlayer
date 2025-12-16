import { useEffect, useContext } from 'react';
import { GridSelectorContext } from './GridSelector'
import './GridSelector.css'

interface GridSelectorOptionData {
	id: string
	text: string;
	description?: string;
	checked?: boolean;
	value?: string | number;
}

function toggleSelection(
	previous: string | string[],
	value: string,
	multiple?: boolean
): string | string[] 
{
	if (multiple) {
		const list = Array.isArray(previous) ? previous : [];

		return list.includes(value)
			? list.filter(v => v !== value)
			: [...list, value];
	}
	return value;
}

function GridSelectorOption({ id, text, description, checked, value }: GridSelectorOptionData) {
	const { multiple, name, selected, setSelected } = useContext(GridSelectorContext);
	const trueValue = value ? value.toString() : id;

	useEffect(() => {
		checked && 
			setSelected(previous => toggleSelection(previous, trueValue, multiple))
	}, []);

	return (
		<>
			<input
				type={multiple ? 'checkbox' : 'radio'}
				className='hidden'
				id={id} name={name}
				onChange={() => { 
					setSelected(previous => toggleSelection(previous, trueValue, multiple))
				}}
				checked={(multiple && selected?.includes(trueValue)) || (!multiple && selected === trueValue)}
				value={trueValue} />
			<label htmlFor={id} className='clickable'>
				<div className="option_title">{text}</div>
				<div className='option_content'>{description}</div>
			</label>
		</>
	)
}

export default GridSelectorOption