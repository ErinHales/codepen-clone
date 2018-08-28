import React from 'react';

export default function Behavior(props) {
    return (
        <div className="pen-settings-interface">
            <h3 className="pen-settings-heading">Code Indentation</h3>
            <form className="pen-settings-slider-form" action="">
                <input 
                list="tab-width-options" 
                type="range" 
                min="0" 
                max="6" 
                value={props.tabSize} 
                id="tab-size"
                onChange={(event) => props.tabSizeHandler(event.target.value)}    
                />
                <datalist id="tab-width-options">
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                </datalist>
                <div className="tab-label">
                    <label className="pen-settings-label" htmlFor="tab-size">Width of Indention</label>
                </div>
            </form>
            <form action="">
                <h3 className="pen-settings-heading">Save Automatically?</h3>
                <input 
                    type="checkbox" 
                    checked={props.autoSave} 
                    onChange={(event) => props.autoSaveHandler(event.target.checked)} 
                    name="auto-save" 
                    id="auto-save"/>
                <label className="pen-settings-label" htmlFor="auto-save">Autosave</label>
            </form>
            <p

                className="pen-settings-description hint">
                If active, Pens will autosave every 30 seconds after being saved once.    
            </p>
            <h3 className="pen-settings-heading">Auto-Updating Preview</h3>
            <form action="">
                <input 
                    type="checkbox" 
                    checked={props.autoUpdate} 
                    onChange={(event) => props.autoUpdateHandler(event.target.checked)} 
                    name="auto-update" 
                    id="auto-update"/>
                <label className="pen-settings-label" htmlFor="auto-update">Enabled</label>
            </form>
            <p
                // style={{
                //     color: 
                // }} 
                className="pen-settings-description hint">
                If enabled, the preview panel updates automatically as you code. If disabled, use the "Run" button to update. 
            </p>
        </div>
    )
}