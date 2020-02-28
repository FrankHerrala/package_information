import React, {useState} from 'react';
import './App.css';
import statusReal from "./status.real"
import PackageTable from "./PackageTable"
import PackageInformation from "./PackageInformation"

function App() {
  const [isPackageSelected, setSelection] = useState(null);
  const [packagesLoaded, setLoadState] = useState(false);
  const [packages, setPackages] = useState([]);

  function onSelectPackage(packageData){
    if (typeof packageData === "string"){
      setSelection(packages.find(selection => selection.package === packageData))
    }else{
      setSelection(packageData)
    }
  }

  async function getPackages(){
    let response = await fetch(statusReal);
    let text = await response.text();
    let packageBlob = new Blob([text])
    let allPackages = []
    packageBlob.text().then( text => {
      let contents = text;
      let packagesArray = contents.split(/\s\n/)
      packagesArray.map( item => {
        let packageInfo = {package: "",
                                  description: "",
                                  depends: [],
                                  reverse_dependencies: []}
        packageInfo.package = item.slice(item.search("Package: ")+9, item.search(/\n/));
        packageInfo.description = item.slice(item.search("Description: ")+13,item.search("Original-Maintainer:"))
        var depends = item.match(/(?<=\nDepends:).*\n/);

        if ( depends === null){
          packageInfo.depends = ["Nothing"];
        }else{
          depends = depends[0]
          let dependantPackages = depends.match(/(?<=\s)[^(),\s]*(?=[\s,\,])/g)
          dependantPackages.map( dependant => {
            packageInfo.depends.push(dependant)
          })
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
      allPackages.map( item => {
        let reverse_dependencies = allPackages.filter(data => data.depends.find(dependant => item.package === dependant))
        if (reverse_dependencies.length === 0){
          item.reverse_dependencies.push("Nothing")
        }else{
          reverse_dependencies.map(element => {
            item.reverse_dependencies.push(element.package);
          })
        }
      })
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
