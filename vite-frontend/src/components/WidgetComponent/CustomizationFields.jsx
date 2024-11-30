import React, { useState } from "react";
import { ChromePicker } from "react-color";

const COMMON_COLORS = [
  "#FFFFFF",
  "#FEFEFE",
  "#8ED1FC",
  "#5D5DFF",
  "#FCB900",
  "#00D084",
  "#ABB8C3",
  "#EB144C",
  "#F78DA7",
  "#FF6900",
  "#7BDCB5",
  "#0693E3"// Yellow
];


const Navbar = ({ sections, activeSection, onSectionChange }) => (
  <nav className="flex flex-col  md:flex-row bg-gray-900 p-4 shadow-lg">
    {sections.map((section) => (
      <button
        key={section}
        className={`px-4 py-2 mr-2 text-sm font-semibold rounded-md transition ${
          activeSection === section
            ? "bg-purple-600 text-white"
            : "bg-gray-700 text-gray-300 hover:bg-purple-500"
        }`}
        onClick={() => onSectionChange(section)}
      >
        {section}
      </button>
    ))}
  </nav>
);

const ColorPickerWithPresets = ({ label, color, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      <div className="flex items-center gap-2">
      <div
  className="w-24 h-12 rounded-lg border-2 border-gray-500 cursor-pointer flex items-center justify-center bg-gray-800 hover:bg-gray-700 transition-all"
  style={{ backgroundColor: color }}
  onClick={() => setShowPicker(!showPicker)}
>
  <span className="text-sm text-gray-300">Pick Color</span>
</div>

        {showPicker && (
          <div className="absolute z-20">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setShowPicker(false)}
            ></div>
            <ChromePicker
              color={color}
              onChangeComplete={(selectedColor) => {
                onChange(selectedColor.hex);
                setShowPicker(false);
              }}
            />
          </div>
        )}
      </div>
      <div className="w-4/5">
      <div className="flex flex-wrap gap-2 mt-2">
        {COMMON_COLORS.map((preset) => (
          <div
            key={preset}
            className={`w-20 h-10 rounded cursor-pointer border ${
              color === preset ? "ring-2 ring-purple-500" : "border-gray-500"
            }`}
            style={{ backgroundColor: preset }}
            onClick={() => onChange(preset)}
          ></div>
        ))}
      </div>
      </div>
    </div>
  );
};

const CustomizationFields = ({ customization, handleCustomizationChange }) => {
  const sections = ["General", "Card", "Border", "Layout"];
  const [activeSection, setActiveSection] = useState("General");

  return (
    <div>
      {/* Navbar */}
      <Navbar
        sections={sections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Customization Panels */}
      <div className="flex-grow p-6 bg-gray-800 rounded-lg shadow-lg">
        {activeSection === "General" && (
          <div>
          <h3 className="text-2xl font-semibold text-gray-300 mb-6">General Settings</h3>
          <div className="space-y-6">
            {/* Scroll Settings */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h4 className="text-lg font-medium text-gray-300 mb-4">Scroll Type</h4>
              <div className="grid grid-cols-3 gap-6">
                {["vertical", "horizontal", "grid"].map((type) => (
                  <button
                    key={type}
                    className={`w-full py-3 text-center rounded-lg transition-colors duration-300 ${
                      customization.scrollType === type
                        ? "bg-purple-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-purple-500"
                    }`}
                    onClick={() => handleCustomizationChange("scrollType", type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
        
            {/* Background Color Picker */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h4 className="text-lg font-medium text-gray-300 mb-4">Background Color</h4>
              <ColorPickerWithPresets
                label="Background Color"
                color={customization.backgroundColor}
                onChange={(color) => handleCustomizationChange("backgroundColor", color)}
              />
            </div>
          </div>
        </div>
        
        )}

        {activeSection === "Card" && (
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Card Customization</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ColorPickerWithPresets
                label="Card Background"
                color={customization.cardBackgroundColor}
                onChange={(color) => handleCustomizationChange("cardBackgroundColor", color)}
              />
              <ColorPickerWithPresets
                label="Card Text Color"
                color={customization.cardTextColor}
                onChange={(color) => handleCustomizationChange("cardTextColor", color)}
              />
              <div>
                <label className="block text-sm font-medium text-gray-300">Padding (px)</label>
                <input
                  type="number"
                  value={customization.cardPadding}
                  onChange={(e) =>
                    handleCustomizationChange("cardPadding", parseInt(e.target.value, 10))
                  }
                  className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Border Radius (px)</label>
                <input
                  type="number"
                  value={customization.cardBorderRadius}
                  onChange={(e) =>
                    handleCustomizationChange("cardBorderRadius", parseInt(e.target.value, 10))
                  }
                  className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
                />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                checked={customization.cardShadow}
                onChange={(e) => handleCustomizationChange("cardShadow", e.target.checked)}
                className="h-4 w-4 text-purple-600 border-gray-600 rounded"
              />
              <label className="ml-2 text-sm font-medium text-gray-300">Enable Shadow</label>
            </div>
          </div>
        )}

        {activeSection === "Border" && (
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Border Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Style</label>
                <select
                  value={customization.borderStyle}
                  onChange={(e) => handleCustomizationChange("borderStyle", e.target.value)}
                  className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
                >
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                </select>
              </div>
              <ColorPickerWithPresets
                label="Border Color"
                color={customization.borderColor}
                onChange={(color) => handleCustomizationChange("borderColor", color)}
              />
              <div>
                <label className="block text-sm font-medium text-gray-300">Width (px)</label>
                <input
                  type="number"
                  value={customization.borderWidth}
                  onChange={(e) =>
                    handleCustomizationChange("borderWidth", parseInt(e.target.value, 10))
                  }
                  className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
                />
              </div>
            </div>
          </div>
        )}

        {activeSection === "Layout" && (
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Layout Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Width (%)</label>
                <input
                  type="number"
                  value={customization.width}
                  onChange={(e) =>
                    handleCustomizationChange("width", parseInt(e.target.value, 10))
                  }
                  className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Height (px)</label>
                <input
                  type="number"
                  value={customization.height}
                  onChange={(e) =>
                    handleCustomizationChange("height", parseInt(e.target.value, 10))
                  }
                  className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomizationFields;
