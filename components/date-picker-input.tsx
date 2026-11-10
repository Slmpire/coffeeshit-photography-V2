"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

interface DatePickerInputProps {
    value?: string;
    onChange: (val: string) => void;
    placeholder?: string;
    hasError?: boolean;
    minDate?: Date;
}

export default function DatePickerInput({
    value,
    onChange,
    placeholder = "Select date",
    hasError = false,
    minDate = new Date(),
}: DatePickerInputProps) {
    const [selected, setSelected] = useState<Date | null>(
        value ? new Date(value) : null
    );

    const handleChange = (date: Date | null) => {
        setSelected(date);
        if (date) {
            // Format as YYYY-MM-DD for form data
            const formatted = date.toISOString().split("T")[0];
            onChange(formatted);
        } else {
            onChange("");
        }
    };

    const displayValue = selected
        ? selected.toLocaleDateString("en-NG", {
              day: "2-digit",
              month: "long",
              year: "numeric",
          })
        : "";

    return (
        <>
            <style>{`
                .coffee-datepicker-popper {
                    z-index: 9999 !important;
                }
                .coffee-datepicker {
                    background: #0a0a0a !important;
                    border: 1px solid rgba(255,255,255,0.1) !important;
                    border-radius: 12px !important;
                    font-family: inherit !important;
                    color: white !important;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.8) !important;
                    padding: 8px !important;
                }
                .coffee-datepicker .react-datepicker__header {
                    background: #0a0a0a !important;
                    border-bottom: 1px solid rgba(255,255,255,0.05) !important;
                    border-radius: 12px 12px 0 0 !important;
                    padding: 12px 0 8px !important;
                }
                .coffee-datepicker .react-datepicker__current-month {
                    color: white !important;
                    font-size: 13px !important;
                    font-weight: 600 !important;
                    letter-spacing: 0.05em !important;
                }
                .coffee-datepicker .react-datepicker__day-name {
                    color: rgba(255,255,255,0.3) !important;
                    font-size: 11px !important;
                    width: 36px !important;
                    line-height: 36px !important;
                }
                .coffee-datepicker .react-datepicker__day {
                    color: rgba(255,255,255,0.7) !important;
                    font-size: 12px !important;
                    width: 36px !important;
                    line-height: 36px !important;
                    border-radius: 8px !important;
                    margin: 1px !important;
                }
                .coffee-datepicker .react-datepicker__day:hover {
                    background: rgba(245,158,11,0.2) !important;
                    color: white !important;
                }
                .coffee-datepicker .react-datepicker__day--selected {
                    background: #f59e0b !important;
                    color: black !important;
                    font-weight: 700 !important;
                }
                .coffee-datepicker .react-datepicker__day--today {
                    border: 1px solid rgba(245,158,11,0.4) !important;
                    background: transparent !important;
                    color: #f59e0b !important;
                }
                .coffee-datepicker .react-datepicker__day--today.react-datepicker__day--selected {
                    background: #f59e0b !important;
                    color: black !important;
                }
                .coffee-datepicker .react-datepicker__day--disabled {
                    color: rgba(255,255,255,0.15) !important;
                    cursor: not-allowed !important;
                }
                .coffee-datepicker .react-datepicker__navigation-icon::before {
                    border-color: rgba(255,255,255,0.4) !important;
                }
                .coffee-datepicker .react-datepicker__navigation:hover .react-datepicker__navigation-icon::before {
                    border-color: white !important;
                }
                .coffee-datepicker .react-datepicker__triangle {
                    display: none !important;
                }
                .react-datepicker-wrapper {
                    width: 100% !important;
                }
            `}</style>

            <DatePicker
                selected={selected}
                onChange={handleChange}
                minDate={minDate}
                placeholderText={placeholder}
                calendarClassName="coffee-datepicker"
                popperClassName="coffee-datepicker-popper"
                popperPlacement="bottom-start"
                dateFormat="dd/MM/yyyy"
                customInput={
                    <div
                        className={`w-full bg-white/[0.04] border ${
                            hasError
                                ? "border-red-500/50"
                                : "border-white/8 focus-within:border-amber-400/50"
                        } rounded-xl px-4 py-3.5 text-white text-sm flex items-center justify-between cursor-pointer transition-colors duration-200`}
                    >
                        <span className={displayValue ? "text-white" : "text-white/20"}>
                            {displayValue || placeholder}
                        </span>
                        <Calendar size={14} className="text-white/20 flex-shrink-0" />
                    </div>
                }
            />
        </>
    );
}