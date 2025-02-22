import React, { useState, useEffect, useRef } from "react";
import { ChromePicker } from "react-color";

// Standard color palette
const STANDARD_COLORS = [
  "#FFFFFF", // White
  "#F8FAFC", // Gray-50
  "#64748B", // Gray-500
  "#0EA5E9", // Sky-500
  "#6366F1", // Indigo-500
  "#EC4899", // Pink-500
  "#22C55E", // Green-500
  "#EAB308", // Yellow-500
  "#F97316", // Orange-500
  "#3B82F6", // Blue-500
  "#A855F7", // Purple-500
  "#000000"  // Black
];

const ColorPickerPopover = ({ color, onChange, onClose, position }) => {
  const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div
        ref={pickerRef}
        className="absolute z-50 bg-gray-800 rounded-lg shadow-xl p-2"
        style={position}
      >
        <ChromePicker
          color={color}
          onChange={(color) => onChange(color.hex)}
          styles={{
            default: {
              picker: {
                background: 'rgb(31 41 55)',
                boxShadow: 'none'
              }
            }
          }}
        />
        <div className="mt-3 grid grid-cols-6 gap-1.5">
          {STANDARD_COLORS.map((presetColor) => (
            <button
              key={presetColor}
              className={`
                w-full aspect-square rounded-md border-2 transition-all duration-200
                hover:scale-110 hover:shadow-lg
                ${color === presetColor ? 'border-blue-500 shadow-md' : 'border-gray-600'}
              `}
              style={{ backgroundColor: presetColor }}
              onClick={() => {
                onChange(presetColor);
                onClose();
              }}
              aria-label={`Select color ${presetColor}`}
            />
          ))}
        </div>
        <div className="mt-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 
                     text-gray-200 rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const StyledColorPicker = ({ label, color, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

  const handleOpen = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPopoverPosition({
        top: `${rect.bottom + window.scrollY + 10}px`,
        left: `${rect.left + window.scrollX}px`
      });
    }
    setIsOpen(true);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-200">
          {label}
        </label>
        <div className="text-xs text-gray-400 uppercase">
          {color}
        </div>
      </div>

      <button
        ref={triggerRef}
        onClick={handleOpen}
        className={`
          w-full h-12 rounded-lg border-2 border-gray-600
          flex items-center justify-between px-3 
          hover:border-gray-400 transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500
        `}
        style={{ backgroundColor: color }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full border border-gray-400"
            style={{ backgroundColor: color }}
          />
          <span className={`
            text-sm font-medium
            ${isColorLight(color) ? 'text-gray-900' : 'text-gray-200'}
          `}>
            Select Color
          </span>
        </div>
      </button>

      {isOpen && (
        <ColorPickerPopover
          color={color}
          onChange={onChange}
          onClose={() => setIsOpen(false)}
          position={popoverPosition}
        />
      )}
    </div>
  );
};

// Utility function to determine if a color is light or dark
const isColorLight = (color) => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return brightness > 128;
};

// Example usage in CustomizationFields component
const CustomizationFields = ({ customization, handleCustomizationChange }) => {
  const sections = ["General", "Card", "Border", "Layout"];
  const [activeSection, setActiveSection] = useState("General");

  return (
    <div className="bg-gray-900 rounded-lg shadow-xl">
      {/* Navbar */}
      <nav className="flex flex-wrap gap-2 p-4 border-b border-gray-800">
        {sections.map((section) => (
          <button
            key={section}
            className={`
              px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
              ${activeSection === section
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"}
            `}
            onClick={() => setActiveSection(section)}
          >
            {section}
          </button>
        ))}
      </nav>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* General Section */}
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
                      className={`w-full py-3 text-center rounded-lg transition-colors duration-300 ${customization.scrollType === type
                        ? "bg-purple-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-purple-500"
                        }`}
                      onClick={() => handleCustomizationChange("scrollType", type)}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="mt-6">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={customization.shouldAutoScroll !== false} // Defaults to true
                      onChange={(e) =>
                        handleCustomizationChange("shouldAutoScroll", e.target.checked)
                      }
                      className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-gray-300">Enable Auto-Scroll</span>
                  </label>
                </div>
              </div>


              {/* Background Color Picker */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-200 mb-4">
                  Background Color
                </h3>
                <StyledColorPicker
                  label="Choose Background Color"
                  color={customization.backgroundColor}
                  onChange={(color) => handleCustomizationChange("backgroundColor", color)}
                />
              </div>
            </div>
          </div>


        )}

        {/* Card Section */}
        {activeSection === "Card" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Card Customization</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StyledColorPicker
                label="Card Background Color"
                color={customization.cardBackgroundColor}
                onChange={(color) => handleCustomizationChange("cardBackgroundColor", color)}
              />
              <StyledColorPicker
                label="Card Text Color"
                color={customization.cardTextColor}
                onChange={(color) => handleCustomizationChange("cardTextColor", color)}
              />
            </div>
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
                  <option value="none">None</option>
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                </select>
              </div>
              <StyledColorPicker
                label="Card Text Color"
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
