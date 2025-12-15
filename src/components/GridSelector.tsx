import { createContext, useEffect, useState } from 'react';
import './GridSelector.css'

interface GridSelectorProps {
    title: string;
    multiple?: boolean;
    name: string;
    children?: React.ReactNode;
    selected?: [];
    onOptionChange?: (value: string | string[]) => void;
}

export const GridSelectorContext = createContext<{
    multiple?: boolean;
    name: string;
    selected: string | string[];
    setSelected: React.Dispatch<React.SetStateAction<string | string[]>>;
}>
({
    multiple: undefined,
    name: '',
    selected: "",
    setSelected: () => { },
});

function GridSelector({ title, multiple, name, children, onOptionChange }: GridSelectorProps) {
    const [selected, setSelected] = useState<string | string[]>(multiple ? [] : '');

    useEffect(() => {
        onOptionChange?.(selected);
    }, [multiple, selected, onOptionChange]);

    return (
        <fieldset className="grid_selector">
            <legend>{title}</legend>
            <div className="options_container">
                <GridSelectorContext.Provider value={ {multiple: multiple, name: name, selected: selected, setSelected} }>
                    {children}
                </GridSelectorContext.Provider>
            </div>
        </fieldset>
    )
}

export default GridSelector 