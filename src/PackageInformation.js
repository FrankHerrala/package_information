import React from 'react';
import './App.css';

function PackageInformation(props) {

  return (
        <div>
          <div className="package-header">{props.selectedPackage.package}</div>
          <div>{props.selectedPackage.description}</div>
          <div className="sub-header">Depends:</div>
          {props.selectedPackage.depends.map(item =>
            item === "Nothing"
              ? <div>Nothing</div>
              : <button key={item} onClick={() => props.onSelectPackage(item)}>{item}</button>
          )}
          <div className="sub-header">Reverse Dependencies:</div>
          {props.selectedPackage.reverse_dependencies.map(item =>
            item === "Nothing"
              ? <div>Nothing</div>
              : <button key={item} onClick={() => props.onSelectPackage(item)}>{item}</button>
          )}
        </div>
  );
}

export default PackageInformation;
