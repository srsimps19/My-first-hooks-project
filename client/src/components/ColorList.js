import React, { useState } from "react";
import {axiosWithAuth} from "./axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, getBubbleData }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        getBubbleData()
      })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        getBubbleData()
      })
  };

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth().post("/colors", newColor)
      .then(res => {
        console.log(res)
        updateColors(res.data)
        getBubbleData();
        setNewColor(initialColor)
      })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColor}>
      <legend>add color</legend>
      <label>color name:
        <input
          name="color"
          value={newColor.color}
          onChange={e =>
            setNewColor({
              ...newColor,
              color: e.target.value
            })
          }
        />
        </label>
        <label>hex code:
        <input
          name="hex"
          value={newColor.code.hex}
          onChange={e =>
            setNewColor({
              ...newColor,
              code: { hex: e.target.value }
            })
          }
        />
        </label>
        <div className="button-row">
          <button>submit</button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;
