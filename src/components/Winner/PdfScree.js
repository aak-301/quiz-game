import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "./pdfscreen.css";

function PdfScree(props) {
  const pdfRef = React.createRef();
  const handleDownload = () => {
    const content = pdfRef.current;

    const doc = new jsPDF("p", "pt", "a4", true);

    doc.html(content, {
      callback: function (doc) {
        doc.save("sample.pdf");
      },
      x: 10,
      y: 10,
      width: 500,
      windowWidth: 1500,
      margin: 50,
    });
  };
  console.log("record--=+: ", props.record);
  return (
    <div>
      <button onClick={handleDownload} className="btn">Download</button>
      <table id="my-table" ref={pdfRef}>
        <tbody>
          <tr>
            <th rowspan="2">
              <strong>Question</strong>
            </th>
            <th colspan="4">
              <strong>Options</strong>
            </th>
            <th rowspan="2">
              <strong>Correct Answer</strong>
            </th>
            <th rowspan="2">
              <strong>Your Answer</strong>
            </th>
          </tr>
          <tr>
            <th>Option 1</th>
            <th>Option 2</th>
            <th>Option 3</th>
            <th>Option 4</th>
          </tr>
          {props.questions.map((e, i) => (
            <tr key={Math.random() * 100}>
              <td>{e["question"]}</td>
              <td>{e["options"][0]}</td>
              <td>{e["options"][1]}</td>
              <td>{e["options"][2]}</td>
              <td>{e["options"][3]}</td>
              <td>{e["correct_answer"]}</td>
              <td>{props.record[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PdfScree;
