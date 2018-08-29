import React from 'react';

export default function PenSettingsNav(props) {
    return (
        <div>
            <div className="pen-settings-nav-header">
                <h1 className="pen-settings-nav-title">Pen Settings</h1>
                <button onClick={() => props.settingsPopUpHandler(false)} className="pen-settings-nav-close">Close</button>
            </div>
            <div className="pen-settings-nav-selection">
                <div>
                    <button className={`pen-settings-nav-selection-button ${props.page === 'html' ? ' selected' : ''}`} onClick={() => props.pageHandler('html')}>HTML</button>
                    <button className={`pen-settings-nav-selection-button ${props.page === 'css' ? ' selected' : ''}`} onClick={() => props.pageHandler('css')}>CSS</button>
                    <button className={`pen-settings-nav-selection-button ${props.page === 'js' ? ' selected' : ''}`} onClick={() => props.pageHandler('js')}>JavaScript</button>
                    <button className={`pen-settings-nav-selection-button ${props.page === 'behavior' ? ' selected' : ''}`} onClick={() => props.pageHandler('behavior')}>Behavior</button>
                </div>
                <button className={`pen-settings-nav-selection-button ${props.page === 'details' ? ' selected' : ''}`} onClick={() => props.pageHandler('details')}> Pen Details</button>
            </div>
        </div>
    )
}