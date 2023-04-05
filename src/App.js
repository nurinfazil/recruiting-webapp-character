import { useState } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts.js";

import AttributesSection from "./Components/AttributesSection";
import ClassesSection from "./Components/ClassesSection";

function App() {
  const [attributeVals, setAttributeVals] = useState(
    changeAttributeFromListToObj()
  );
  const [classesAchieved, setClassesAchieved] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  function changeAttributeFromListToObj() {
    var initialObj = {};
    return ATTRIBUTE_LIST.reduce((obj, curr) => {
      return Object.assign(obj, { [curr]: 0 });
    }, initialObj);
  }

  // Called when attribute counters are incremented or decremented
  function handleAttributeCounter(e, attribute, type) {
    // Handle incrementing and decrementing
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

    // Check if any classes have been achieved
    for (let classType in CLASS_LIST) {
      let matchedAttributes = 0;

      // Count how many attributes meet the min requirment for the class
      for (let attribute in CLASS_LIST[classType]) {
        if (attributeVals[attribute] >= CLASS_LIST[classType][attribute]) {
          matchedAttributes += 1;
        }
      }

      let updatedClassesAchieved = classesAchieved;

      // Update classesAchieved state with classes that have been achieved
      if (matchedAttributes == 6 && !classesAchieved.includes(classType)) {
        updatedClassesAchieved.push(classType);
        setClassesAchieved(updatedClassesAchieved);
        // Remove from classesAchieved if no longer meet min requirements
      } else if (
        matchedAttributes != 6 &&
        classesAchieved.includes(classType)
      ) {
        updatedClassesAchieved = classesAchieved.filter((c) => c != classType);
        setClassesAchieved(updatedClassesAchieved);
      }
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
        <br></br>
        <hr></hr>
        <ClassesSection
          classesAchieved={classesAchieved}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
        />
      </section>
    </div>
  );
}

export default App;
