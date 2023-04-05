import { useState } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts.js";

import AttributesSection from "./Components/AttributesSection";
import ClassesSection from "./Components/ClassesSection";
import SkillsSection from "./Components/SkillsSection";

function App() {
  const [attributeVals, setAttributeVals] = useState(
    changeAttributeFromListToObj(0)
  );
  const [attributeMods, setAttributeMods] = useState(
    changeAttributeFromListToObj(-5)
  );
  const [classesAchieved, setClassesAchieved] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [pointsSpendingMax, setPointsSpendingMax] = useState(10);
  const [skillPoints, setSkillPoints] = useState(createSkillList());
  const [skillTotals, setSkillTotals] = useState(createSkillList());

  // Creates an object where key is attribute and value is initialValue
  // {[attribute]: initialValue}
  function changeAttributeFromListToObj(initialValue) {
    var initialObj = {};
    return ATTRIBUTE_LIST.reduce((obj, curr) => {
      return Object.assign(obj, { [curr]: initialValue });
    }, initialObj);
  }

  // Creates an object where key is skill and value is the points (before modifier)
  function createSkillList() {
    var initialObj = {};
    return SKILL_LIST.reduce((obj, curr) => {
      return Object.assign(obj, { [curr.name]: 0 });
    }, initialObj);
  }

  // Called when attribute counters are incremented or decremented
  function handleAttributeCounter(attribute, type) {
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

      // Update classesAchieved state with classes that have been achieved
      let updatedClassesAchieved = classesAchieved;
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

      // Adjust attribute modifier
      let updatedMods = attributeMods;
      ATTRIBUTE_LIST.forEach((attribute) => {
        updatedMods[attribute] = Math.floor(
          (attributeVals[attribute] - 10) / 2
        );
      });
      setAttributeMods(updatedMods);

      // Calculate the pointsSpendingMax
      // Minimum = 0, Max = inf
      if (attributeMods["Intelligence"] >= 0) {
        setPointsSpendingMax(10 + 4 * attributeMods["Intelligence"]);
      }
    }

    // Update skill totals
    updateSkillTotals();
  }

  function handleSkillsCounter(skill, type) {
    // Calculate current total
    const used = Object.values(skillPoints).reduce((currTotal, curr) => {
      return currTotal + curr;
    }, 0);

    if (type == "-") {
      // Don't decrement past 0
      if (skillPoints[skill] <= 0) {
        return;
      }

      // Update
      setSkillPoints({
        ...skillPoints,
        [skill]: (skillPoints[skill] -= 1),
      });
    } else {
      // Don't increment past max
      if (used >= pointsSpendingMax) {
        return;
      }

      // Update
      setSkillPoints({
        ...skillPoints,
        [skill]: (skillPoints[skill] += 1),
      });
    }

    // Update the skill totals
    updateSkillTotals();
  }

  // Used to update the skillTotals
  function updateSkillTotals() {
    let updatedSkillTotals = skillTotals;

    SKILL_LIST.forEach((skill) => {
      // If attribute modifier is greater than 0, then we can account for it.
      // Otherwise, do not account for it because it is negative
      if (attributeMods[skill.attributeModifier] >= 0) {
        updatedSkillTotals[skill.name] =
          skillPoints[skill.name] + attributeMods[skill.attributeModifier];
      } else {
        updatedSkillTotals[skill.name] = skillPoints[skill.name];
      }
    });

    setSkillTotals(updatedSkillTotals);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>CHARACTER SHEET</h3>
      </header>
      <section className="App-section">
        <AttributesSection
          attributeVals={attributeVals}
          attributeMods={attributeMods}
          handleAttributeCounter={handleAttributeCounter}
        />
        <br></br>
        <hr></hr>
        <ClassesSection
          classesAchieved={classesAchieved}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
        />
        <br></br>
        <hr></hr>
        <SkillsSection
          pointsSpendingMax={pointsSpendingMax}
          skillPoints={skillPoints}
          skillTotals={skillTotals}
          handleSkillsCounter={handleSkillsCounter}
        />
      </section>
    </div>
  );
}

export default App;
