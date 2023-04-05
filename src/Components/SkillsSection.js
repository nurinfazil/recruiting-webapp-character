import React from "react";
import { SKILL_LIST } from "../consts";

const SkillsSection = ({
  pointsSpendingMax,
  handleSkillsCounter,
  skillPoints,
  skillTotals,
}) => {
  return (
    <div className="skill-section">
      <h4 className="section-title">Skills</h4>
      <div id="total">
        Maximum # of Points for Spending: {pointsSpendingMax}
      </div>
      {SKILL_LIST.map((skill, i) => {
        return (
          <div key={i} className="skill">
            <div className="skill-name">
              <strong>
                {skill.name} ({skill.attributeModifier.slice(0, 3)})
              </strong>
            </div>
            <div>
              <button
                onClick={() => {
                  handleSkillsCounter(skill.name, "-");
                }}
              >
                -
              </button>{" "}
              {skillPoints[skill.name]}{" "}
              <button
                onClick={() => {
                  handleSkillsCounter(skill.name, "+");
                }}
              >
                +
              </button>
            </div>
            <div>Total: {skillTotals[skill.name]}</div>
          </div>
        );
      })}
    </div>
  );
};

export default SkillsSection;
