import React, { FunctionComponent } from 'react';

type Props = { onTry: (query: string) => void };

const EXAMPLE = 'Bratislava, Trnava, Vienna';

export const EmptyState: FunctionComponent<Props> = ({ onTry }) => (
    <div className="empty-state">
        <span className="empty-or">or</span>
        <button 
            type="button" 
            className="example-btn" 
            onClick={() => onTry(EXAMPLE)}>
            Try: {EXAMPLE}
        </button>
    </div>
);