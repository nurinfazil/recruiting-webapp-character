import React from "react";
import { CLASS_LIST } from "../consts";

const ClassesSection = ({
  classesAchieved,
  selectedClass,
  setSelectedClass,
}) => {
  return (
    <div>
      <h4 className="section-title">Classes</h4>
      <div className="classes-section">
        <div>
          {Object.keys(CLASS_LIST).map((classType, i) => {
            return (
              <div key={i} className="">
                <h4
                  onClick={() => {
                    setSelectedClass(classType);
                  }}
                >
                  {classType} {classesAchieved.includes(classType) ? "✓" : ""}
                </h4>
              </div>
            );
          })}
        </div>
        <div className="class-stats">
          {selectedClass == "" ? (
            <div>Click a class to see stats</div>
          ) : (
            <div>
              <u>{selectedClass}</u>
              {Object.keys(CLASS_LIST[selectedClass]).map((attribute, i) => {
                return (
                  <div key={i}>
                    {attribute}: {CLASS_LIST[selectedClass][attribute]}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassesSection;
