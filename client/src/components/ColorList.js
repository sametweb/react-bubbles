import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../axiosWithAuth";
import { isNamedImports } from "typescript";
import { Link } from "react-router-dom";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, logout }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    editing
      ? axiosWithAuth()
          .put(`/colors/${colorToEdit.id}`, colorToEdit)
          .then(res => {
            console.log(res);
            updateColors(
              colors.map(color =>
                color.id === colorToEdit.id ? colorToEdit : color
              )
            );
            setColorToEdit(initialColor);
            setEditing(false);
          })
      : axiosWithAuth()
          .post(`/colors`, colorToEdit)
          .then(res => {
            updateColors(res.data);
            setColorToEdit(initialColor);
          });
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        console.log(res.data);
        updateColors(colors.filter(item => item.id !== res.data));
        setEditing(false);
        setColorToEdit(initialColor);
      });
  };
  console.log({ colorToEdit });
  return (
    <div className="colors-wrap">
      <div className="button-row">
        <button onClick={() => logout()}>logout</button>
      </div>
      <p>colors</p>
      <ul>
        {colors.map((color, index) => (
          <li key={index} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
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

      <form onSubmit={handleSubmit}>
        <legend>{editing ? "edit" : "add"} color</legend>
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
          <button type="submit">{editing ? "save" : "add"}</button>
          {editing && (
            <button
              onClick={() => {
                setColorToEdit(initialColor);
                setEditing(false);
              }}
            >
              cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ColorList;
