import React from 'react';

export default function PenSettingsNav(props) {
    return (
        <div>
            <div className="pen-settings-nav-header">
                <h1 className="pen-settings-nav-title">Pen Settings</h1>
                <button onClick={props.closeSettingsNav} className="pen-settings-nav-close">Close</button>
            </div>
            <div className="pen-settings-nav-selection">
                <button className={`pen-settings-nav-selection-button ${props.htmlPage ? ' selected' : ''}`} onClick={() => props.pageHandler('html')}>HTML</button>
                <button className={`pen-settings-nav-selection-button ${props.cssPage ? ' selected' : ''}`} onClick={() => props.pageHandler('css')}>CSS</button>
                <button className={`pen-settings-nav-selection-button ${props.jsPage ? ' selected' : ''}`} onClick={() => props.pageHandler('js')}>JavaScript</button>
                <button className={`pen-settings-nav-selection-button ${props.behaviorPage ? ' selected' : ''}`} onClick={() => props.pageHandler('behavior')}>Behavior</button>
            </div>
        </div>
    )
}