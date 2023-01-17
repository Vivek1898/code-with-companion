import React, { Component, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import "../css/ConfigBar.css";
import { save } from 'save-file'

const ConfigBar = (props) => {
 
  useEffect(() => {
    console.log("From ConfigBar")
  
  //  handleSaveCode();
  }, [props.mode,props.code])
  const handleSaveCode= async()=>{
    console.log(props.code)
    console.log(props.modeForile)
    //  await save(props.code,  `code.`+`${props.modeForile}` )}
    if(props.modeForile==="cpp"){
      await save(props.code,  "code.cpp" )}
    else if(props.modeForile==="java"){
      await save(props.code,  "code.java" )}
    else if(props.modeForile==="python"){
      await save(props.code,  "code.py" )}
    else if(props.modeForile==="javascript"){
      await save(props.code,  "code.js" )}
    else if(props.modeForile==="c"){
      await save(props.code,  "code.c" )}
    else  
    await save(props.code,  "code.txt" )
  }
  return (
    <div className="config-bar">
      <Dropdown
        className="dropdown"
        placeholder="Theme"
        selection
        options={props.themes}
        onChange={(e, data) => props.handleOnChange(e, data)}
        defaultValue={props.themes[8].value}
      />
      <Dropdown
        className="dropdown"
        placeholder="Language"
        selection
        options={props.languages}
        onChange={(e, data) => props.handleOnChange(e, data)}
        value={props.mode}
      />
      <Dropdown
        className="dropdown"
        placeholder="Font Size"
        selection
        options={props.fontSizes}
        onChange={(e, data) => props.handleOnChange(e, data)}
        defaultValue={props.fontSizes[4].value}
      />
      <button className="run" onClick={() => props.handleRunClick()}>
        <div dangerouslySetInnerHTML={{ __html: props.status }} />
      </button>

   <button className="btn btn-primary save" onClick={()=>props.handleDownloadCode()}>
        Save
      </button>
    </div>
  );
};

export default ConfigBar;
