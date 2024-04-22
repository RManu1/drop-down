import * as React from 'react';
import './dropDown.css';
import classNames from 'classnames';

//This component take the following props: width (style element), title (string), options (array), selected (function), isMultiselect (boolean) 

export default function Dropdown(props) {
    const [isOpen, setOpen] = React.useState(false); //state variable for menu open
    const [selected, setSelected] = React.useState([]); //state variable for selected options

    //this useEffect passes the selected options array from this component to the parent component by using the selected prop
    React.useEffect(() => {
        props.selected(selected);
      }, [selected, props]);

    
    //function for toggling menu
    const toggle = () => {
        setOpen(!isOpen);
    };

    //function to close menu
    const close = () => {
        setOpen(false);
    }

    //handle select function 
    const handleSelect = (option) => {
        if (props.isMultiSelect){    //multi-select logic
            const copy = [...selected];    
            copy.includes(option) ? copy.splice(copy.indexOf(option), 1) : copy.push(option); //decides whether to push or remove option from shallow copy based on if it is already selected
            setSelected(copy);
        }
        else {    //single select object
           selected.includes(option) ? setSelected([]) : setSelected([option]);  //decides whether to add selection or remove pre-exisiting selection
           toggle();   //single select can close after selection
        }
    }

    //remove all selections 
    const removeSelection = (e) => {
        e.stopPropagation();      //need to prevent parent onClick from firing
        setSelected([]);
    };

    //this function renders individual cell of menu
    const renderOption = (option) => {
        const isSelected = selected.includes(option);    //checks for selection to apply selected background color 
        const optionClasses = classNames('option', {    
            'option-selected': isSelected,  
        });

        return(
            <div className={optionClasses} onClick={() => {handleSelect(option)}}>
                {option}
            </div>
        );
    };

    //function to render either title or selected options on top level of dropdown
    const renderDisplay = () => {
       if (selected.length === 0 && !isOpen) {  //return title if no selectiosn and closed
            return props.title;
       }

       return selected.join(", ");   //otherwise return all selected options seperated by commas
    };

    const menuClasses = classNames('menu', {
        'menu-open': isOpen,
        'menu-closed': !isOpen,
        'menu-empty': selected.length === 0
    });
  
    return (
      <div tabIndex={0} onBlur={close}> 
        <div className={menuClasses} style={props.width} onClick={toggle}>
            <div className={'selection-display'}>
                {renderDisplay()}
            </div>
            <div className={'icons'}>
                 {(selected.length > 0 &&             //only render clear icon if there are selected options
                    <span className={'delete'}  onClick={removeSelection}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="red" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </span>
                )}
                <span className={'chevron'}>
                    {!isOpen ? (          //check if chevron points up or down
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-chevron-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-chevron-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"/>
                        </svg>
                    )}
                </span>
            </div>
        </div>
        {(isOpen &&            //this block iterates through options and renders each cell within the dropdown body
            <div className={'container'}>
                {props.options.map((option) => (
                    renderOption(option)
                ))}
            </div>
        )}
      </div>
    );
};
  