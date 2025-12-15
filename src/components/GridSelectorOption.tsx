import { useEffect, useContext } from 'react';
import { GridSelectorContext } from './GridSelector'
import './GridSelector.css'

export interface GridSelectorOptionData {
	id: string
	text: string;
	description?: string;
	checked?: boolean;
}

export function GridSelectorOption({ id, text, description, checked }: GridSelectorOptionData) {
	const { multiple, name, selected, setSelected } = useContext(GridSelectorContext);

	function toggleSelection(
		previous: string | string[],
		id: string,
		multiple?: boolean
	): string | string[] 
	{
		if (multiple) {
			const list = Array.isArray(previous) ? previous : [];

			return list.includes(id)
				? list.filter(v => v !== id)
				: [...list, id];
		}
		return id;
	}

	useEffect(() => {
		checked && 
			setSelected(previous => toggleSelection(previous, id, multiple))
	}, []);

	return (
		<>
			<input
				type={multiple ? 'checkbox' : 'radio'}
				className='hidden'
				id={id} name={name} value={id}
				onChange={() => setSelected(previous => toggleSelection(previous, id, multiple))}
				checked={(multiple && selected?.includes(id)) || (!multiple && selected === id)} />
			<label htmlFor={id} className='clickable'>
				<div className="option_title">{text}</div>
				<div className='option_content'>{description}</div>
			</label>
		</>
	)
}