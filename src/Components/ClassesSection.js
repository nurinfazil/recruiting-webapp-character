import React from "react";
import { CLASS_LIST } from "../consts";

const ClassesSection = ({ classesAchieved }) => {
  return (
    <div>
      <h4 className="section-title">Classes</h4>
      <div className="classes-section">
        {Object.keys(CLASS_LIST).map((classType) => {
          return (
            <div className="">
              <h4>
                {classType} {classesAchieved.includes(classType) ? "✓" : ""}
              </h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClassesSection;
