import { FunctionComponent } from 'react';

type Props = { onLocate: () => void; disabled?: boolean };

export const LocationButton: FunctionComponent<Props> = ({ onLocate, disabled }) => (
    <button
        type="button"
        className="locate-btn"
        onClick={onLocate}
        disabled={disabled}>
        <span aria-hidden="true">📍</span> Use my location
    </button>
);