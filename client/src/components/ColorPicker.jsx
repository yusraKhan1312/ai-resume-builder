import { Palette } from 'lucide-react';
import React, { useState } from 'react'

const ColorPicker = ({ selectedColor, onChange }) => {

    const colors = [
        { name: "Red", value: "#7F1D1D" },
        { name: "Green", value: "#065F46" },
        { name: "Blue", value: "#1D4ED8" },
        { name: "Gray", value: "#808080" },
        { name: "Orange", value: "#FFA500" },
        { name: "Pink", value: "#C2185B" },
        { name: "Teal", value: "#008080" },
        { name: "Yellow", value: "#FFFF00" },
        { name: "Purple", value: "#800080" },
        { name: "Black", value: "#000000" },
        { name: "Brown", value: "#78350F" },
    ];

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                className="flex gap-1.5 px-4 py-2 bg-purple-100 border border-purple-400 rounded-lg text-sm text-slate-800 hover:bg-purple-200 hover:border-purple-500 transition"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Palette size={14} /><span className="max-sm:hidden font-medium">Color</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg z-10 overflow-hidden">
                    {colors.map((color) => (
                        <div
                            key={color.value}
                            className={`px-4 py-3 cursor-pointer transition flex items-center gap-3
                            ${selectedColor === color.value
                                    ? 'bg-slate-100'
                                    : 'hover:bg-slate-50'}`}
                            onClick={() => {
                                onChange(color.value);
                                setIsOpen(false);
                            }}
                        >
                            <div
                                className="w-4 h-4 rounded-full border border-slate-300"
                                style={{ backgroundColor: color.value }}
                            />
                            <span className="text-sm text-slate-700">{color.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ColorPicker
