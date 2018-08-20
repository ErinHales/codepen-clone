import React from 'react';

export default function PenSettingsNav(props) {
    return (
        <div>
            <button>Close</button>
            <button onClick={() => props.pageHandler('html')}>HTML</button>
            <button onClick={() => props.pageHandler('css')}>CSS</button>
            <button onClick={() => props.pageHandler('js')}>JS</button>
            <button onClick={() => props.pageHandler('behavior')}>Behavior</button>
        </div>
    )
}