import React from "react";

const AttributesSection = ({
  attributeVals,
  handleAttributeCounter,
  attributeMods,
}) => {
  return (
    <div>
      <h4 className="section-title">Attributes</h4>
      <div className="attributes-section">
        {Object.keys(attributeVals).map((attribute) => {
          return (
            <div className="attribute">
              <h5>{attribute}</h5>
              <div className="attribute-modifier">
                Mod: {attributeMods[attribute]}
              </div>
              <div className="attribute-counter">
                <button
                  onClick={() => {
                    handleAttributeCounter(attribute, "-");
                  }}
                >
                  -
                </button>
                <p>{attributeVals[attribute]}</p>
                <button
                  onClick={() => {
                    handleAttributeCounter(attribute, "+");
                  }}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttributesSection;
