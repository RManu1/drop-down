import * as React from 'react';
import Dropdown from './dropDown';

const options = ["Apple", "Banana", "Coconut", "Date", "Empanada", "Fig", "Grape", "Haus", "Iridescent", "Juice", "Kale", "Lemon", "Night"];
const ops = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function App() {
  const [multiSelected, setMultiSelected] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  //the following 2 functions retreieve the selected options from the Dropdown component by using the selected prop
  const getMultiSelected = (selections) => {
    setMultiSelected(selections);
    console.log(multiSelected);
  }

  const getSelected = (selections) => {
    setSelected(selections);
    console.log(selected);
  }

  return (
    <div  style={{position: "absolute", top: "30%", right: "40%"}}>
      <div style={{display: "flex", flexBasis: "row", gap: "10px"}}>
        <Dropdown width={{width: "300px"}} title={"Multi-Select"} options={options} selected={getMultiSelected} isMultiSelect/>
        <Dropdown width={{width: "100px"}} title={"Select"} options={ops} selected={getSelected}/>
      </div>
    </div>
  );
}

export default App;
