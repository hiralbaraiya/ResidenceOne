import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class Texteditor extends Component{
    constructor(props){
        super(props)
        this.modules={toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{'script':'sub'},{'script':'super'}],
            [{size: []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, 
             {'indent': '-1'}, {'indent': '+1'}],
            ['link'],
            ['clean']
          ],
          clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
          }
        }
    }
    render(){
        return(
<ReactQuill    className='textedit'
             modules={this.modules}
             onChange={(value)=>this.props.onChange(value)}
             />
        )
    }
}
export default Texteditor;