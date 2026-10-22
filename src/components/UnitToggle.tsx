import { FunctionComponent } from 'react';
import { Units } from '../types/Units';

type Props = { units: Units; onChange: (units: Units) => void };

const OPTIONS: { value: Units; label: string; aria: string }[] = [
    { value: 'metric', label: '°C', aria: 'Celsius' },
    { value: 'imperial', label: '°F', aria: 'Fahrenheit' },
];

export const UnitToggle: FunctionComponent<Props> = ({ units, onChange }) => (
    <div
        className="unit-toggle"
        role="group"
        aria-label="Temperature units">
        {OPTIONS.map((option) => (
            <button
                key={option.value}
                type="button"
                aria-label={option.aria}
                aria-pressed={units === option.value}
                onClick={() => onChange(option.value)}
            >
                {option.label}
            </button>
        ))}
    </div>
);