import { useState } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts.js";

import AttributesSection from "./Components/AttributesSection";

function App() {
  const [attributeVals, setAttributeVals] = useState(
    changeAttributeFromListToObj()
  );

  function changeAttributeFromListToObj() {
    var initialObj = {};
    return ATTRIBUTE_LIST.reduce((obj, curr) => {
      return Object.assign(obj, { [curr]: 0 });
    }, initialObj);
  }

  // Called when attribute counters are incremented or decremented
  function handleAttributeCounter(e, attribute, type) {
    if (type == "-") {
      setAttributeVals({
        ...attributeVals,
        [attribute]: (attributeVals[attribute] -= 1),
      });
    } else {
      setAttributeVals({
        ...attributeVals,
        [attribute]: (attributeVals[attribute] += 1),
      });
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>CHARACTER SHEET</h3>
      </header>
      <section className="App-section">
        <AttributesSection
          attributeVals={attributeVals}
          setAttributeVals={setAttributeVals}
          handleAttributeCounter={handleAttributeCounter}
        />
      </section>
    </div>
  );
}

export default App;
