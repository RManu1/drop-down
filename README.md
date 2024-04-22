To run this project please use
    > npm install
    > npm start

The dropdown component should not be altered.

The base project demonstrates both a single select and multi-select dropdown.nThe dropdown values and selection behavior 
can be modified in App.js, or a new dropdown can be added to any component in the project.

The dropdown has the following props:
    width - can adjust width from parent component by passing styles
    title - string that is default display of dropdown
    options - pass array of options 
    selected - a function with access to the dropdowns selected values as argument
    isMultiSelect - boolean to specify single vs multi select (default is single)

The dropdown will also have a selectable chevron. If selections are made, it will have a clear all "x" that will empty 
the selections array. Clicking the dropdown display should toogle the dropdown. Clicking outside of dropdown should close it. 

NOTE: please pass an array with unique values as the dropdown's options. I did not implement filtering or use the index values 
for selections because I don't think duplicate options is a realistic case.