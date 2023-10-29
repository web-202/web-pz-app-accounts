import React, { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import { format, parse } from "date-fns";
import "../styles/Modal.css";
import { Account } from "./Accounts";

interface EditResultProps {
  isOpen: boolean;
  isClose: () => void;
  updateResult: (result: Account) => void;
  resultToEdit: Account | null;
}

export default function EditResult({
  isOpen,
  isClose,
  updateResult,
  resultToEdit,
}: EditResultProps) {
  const [editedResult, setEditedResult] = useState<Account | null>(
    resultToEdit
  );
  const [error, setError] = useState("");

  useEffect(() => {
    setEditedResult(resultToEdit);
  }, [resultToEdit]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (editedResult) {
      const { name, value } = event.target;
      if (name === "start_date" || name === "expiration_date") {
        try {
          const parsedDate = parse(value, "yyyy-MM-dd", new Date());
          const unixTimestamp = parsedDate.getTime() / 1000;
          setEditedResult({
            ...editedResult,
            [name]: unixTimestamp.toString(),
          });
        } catch (error) {
          setError("Invalid date format");
        }
      } else {
        setEditedResult({ ...editedResult, [name]: value });
      }
    }
  };

  function unixTimestampToDate(unixTimestamp: string): string {
    const date = new Date(parseInt(unixTimestamp) * 1000);
    return format(date, "yyyy-MM-dd");
  }

  const handleSave = () => {
    if (editedResult) {
      const editedResultWithUnixTimestamp = {
        ...editedResult,
        start_date: editedResult.start_date,
        expiration_date: editedResult.expiration_date,
      };

      axios
        .put(
          `http://localhost:3001/accounts/${editedResult.id}`,
          editedResultWithUnixTimestamp
        )
        .then((response) => {
          console.log("Account updated successfully:", response.data);
          updateResult(response.data);
          isClose();
        })
        .catch((error) => {
          console.error("Error updating account:", error);
          setError("Error updating account.");
        });
    }
  };

  return (
    <div className={`modal ${isOpen ? "open" : "closed"}`}>
      <div className="modal-content">
        <h1 className="modal-title">Edit Account</h1>
        <hr />
        <button className="close-btn" onClick={isClose}>
          x
        </button>
        <div className="form-container">
          {editedResult ? (
            <>
              <div className="form-row">
                <label>Name*</label>
                <input
                  type="text"
                  name="name"
                  value={editedResult.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <label>Account Name*</label>
                <input
                  type="text"
                  name="account_name"
                  value={editedResult.account_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <label>Email*</label>
                <input
                  type="text"
                  name="email"
                  value={editedResult.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <label>Status*</label>
                <select
                  name="status"
                  value={editedResult.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Disable">Disable</option>
                </select>
              </div>
              <div className="form-row">
                <label>Start Date*</label>
                <input
                  type="date"
                  name="start_date"
                  value={unixTimestampToDate(editedResult.start_date as string)}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <label>Expiration Date*</label>
                <input
                  type="date"
                  name="expiration_date"
                  value={unixTimestampToDate(
                    editedResult.expiration_date as string
                  )}
                  onChange={handleInputChange}
                />
              </div>
            </>
          ) : (
            <p>No account selected.</p>
          )}
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="btn-container">
          <button className="cancel-btn" onClick={isClose}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
