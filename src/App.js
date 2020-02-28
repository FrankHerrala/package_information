import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import statusReal from "./status.real"
import PackageTable from "./PackageTable"
import PackageInformation from "./PackageInformation"
const reader = new FileReader();

function App() {
  const [isPackageSelected, setSelection] = useState(null);
  const [packagesLoaded, setLoadState] = useState(false);
  const [packages, setPackages] = useState([]);

  function onSelectPackage(packageData){
    console.log("jahuu")
    if (typeof packageData === "string"){
      setSelection(packages.find(selection => selection.package === packageData))
    }else{
      setSelection(packageData)
    }
  }

  async function getPackages(){
    let response = await fetch(statusReal);
    let text = await response.text();
    var packageBlob = new Blob([text])
    var allPackages = []
    packageBlob.text().then( text => {
      var contents = text;
      var packagesArray = contents.split(/\s\n/)
      packagesArray.map( item => {
        var packageInfo = {package: "",
                                  description: "",
                                  depends: []}
        packageInfo.package = item.slice(item.search("Package: ")+9, item.search(/\n/));
        packageInfo.description = item.slice(item.search("Description: ")+13,item.search("Original-Maintainer:"))
        var depends = item.match(/(?<=\nDepends:).*\n/);

        if ( depends === null){
          packageInfo.depends = ["Nothing"];
        }else{
          depends = depends[0]
          var dependantPackages = depends.match(/(?<=\s)[^\(\),\s]*(?=[\s,\,])/)
          packageInfo.depends = dependantPackages;

        }
        allPackages.push(packageInfo);

      })
      allPackages.sort((a,b) => {
        if (a.package < b.package){
          return -1;
        }else if (a.package > b.package) {
          return 1;
        }else{
          return 0;
        }
      });
      setPackages(allPackages)
    })
  }

  return (
    <div className="App">
        {isPackageSelected === null
          ? <PackageTable onSelectPackage={onSelectPackage} packages={packages}/>
          : <div>
              <PackageInformation selectedPackage={isPackageSelected} onSelectPackage={onSelectPackage}/>
              <button onClick={() => setSelection(null)}>Back to list</button>
            </div>}
        {packagesLoaded === false
          ?<button onClick={() => {
            getPackages();
            setLoadState(true);
          }}>Get packages</button>
          :null}
    </div>
  );
}

export default App;
