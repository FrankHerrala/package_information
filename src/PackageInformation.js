import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import statusReal from "./status.real"
const reader = new FileReader();

function PackageInformation(props) {

  return (
        <div>
          <div>{props.selectedPackage.package}</div>
          <a>{props.selectedPackage.description}</a>
          <div>Depends:</div>
          {props.selectedPackage.depends.map(item =>
            item === "Nothing"
              ? <div>Nothing</div>
              : <button onClick={() => props.onSelectPackage(item)}>{item}</button>
          )}
        </div>
  );
}

export default PackageInformation;
