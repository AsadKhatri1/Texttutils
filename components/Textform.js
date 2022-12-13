import React, { useState } from "react";

export default function Textform(props) {
    const UpClick=() => {
        setText(text.toUpperCase())
    }
    const LowClick=() => {
        setText(text.toLowerCase())
    }
     const onCahnges=(event)=>{
        
        setText(event.target.value)

     }

    //  const add=()=>{
    //     newValue(value+10)
    //  }
    //  const sub=()=>{
    //     newValue(value-10)
    
    //  }
   
  const [text, setText] = useState("  Enter text here");
//   const [value, newValue]=useState(0)
  return (
    <div>
      <div className="container my-4">
        <h3 className="heading">{props.heading}</h3>
        <div className="form-floating">
          <textarea
            className="textArea" value={text} onChange={onCahnges} placeholder="Leave a statement here" id="myBox"></textarea>
        </div>
        <button className="btn btn-primary my-3 mx-1" onClick={UpClick}>Convert uppercase</button>
        <button className="btn btn-primary my-3 mx-1" onClick={LowClick}>Convert lowercase</button>

        {/* <h3 className="heading">I have Rs.{value} </h3>
        <button className="btn btn-primary my-3 mx-1" onClick={add}>Add Rs.10</button>
        <button className="btn btn-primary my-3 mx-1" onClick={sub}>Subtract Rs.10</button>
        */}
        
      </div>
      <div className="container my-4">
        <h1 className="heading">You Text Summary</h1>
        <h5>Your text contains {text.split(" ").length} words & {text.length} characters.</h5>
      </div>
    </div>
  );
}
