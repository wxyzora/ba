import React, {useEffect, useState} from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';

const TextEditor = () => {



    
    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty()
      );

   
 
   
    const handleEditorChange = (state) => {
        
       // setEditorState(state)
        //convertContentToHTML();
        }


  
  

    const  [convertedContent, setConvertedContent] = useState(null);

    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
    }


    return (
     
        
            <Editor
                editorState={editorState}
                onChange={editorState => handleEditorChange(editorState)}/>
         
    )
}

export default TextEditor;