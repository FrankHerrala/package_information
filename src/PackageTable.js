import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import statusReal from "./status.real"
const reader = new FileReader();

function PackageTable(props) {

  return (
        <div className="table">
          <div className="table-header">
            <span style={{width: "10%"}}>
              No.
            </span>
            <span style={{width: "90%"}}>
              Package
            </span>
          </div>
          {props.packages.map( (item, i) =>
            <div key={item.Package} className="table-row">
              <span style={{width: "10%"}}>{i+1}.</span>
              <button style={{width: "90%"}} onClick={() => props.onSelectPackage(item)}>{item.package}</button>
            </div>
          )}
        </div>
  );
}

export default PackageTable;
