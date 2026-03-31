import React from "react";
import { modalStyles } from "../assets/dummyStyles";
import { X } from "lucide-react";
const AddTransactionModal = ({
  showModal,
  setShowModal,
  newTransaction,
  setNewTransaction,
  handleAddTransaction,
  type = "both",
  title = "Add New Transaction",
  buttonText = "Add Transaction",
  categories = [
    "Food",
    "Housing",
    "Transport",
    "Shopping",
    "Entertainment",
    "Utilities",
    "Healthcare",
    "Salary",
    "Freelance",
    "Investments",
    "Bonus",
    "Other",
  ],
  color = "teal",
}) => {
  if (!showModal) return null;

  // Get current date in YYYY-MM-DD format
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentDate = today.toISOString().split("T")[0];
  const minDate = `${currentYear}-01-01`;

  const colorClass = modalStyles.colorClasses[color];

  return (
    <div className={modalStyles.overlay}>
      <div className={modalStyles.modalContainer}>
        <div className={modalStyles.modalHeader}>
          <h3 className={modalStyles.modalTitle}>{title}</h3>
          <button
            onClick={() => setShowModal(false)}
            className={modalStyles.closeButton}
          >
            <X size={24} />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddTransaction();
          }}
        >
          <div className={modalStyles.form}>
            <div>
              <label htmlFor="description" className={modalStyles.label}>
                Description
              </label>
              <input
                type="text"
                id="description"
                value={newTransaction.description}
                onChange={(e) => {
                  setNewTransaction((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
                className={modalStyles.input(colorClass.ring)}
                placeholder={
                  type === "both"
                    ? "Salary, Funds, etc."
                    : "Groceries, Rent, etc."
                }
                required
              />
            </div>

            <div>
              <label htmlFor="amount" className={modalStyles.label}>
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={newTransaction.amount}
                onChange={(e) => {
                  setNewTransaction((prev) => ({
                    ...prev,
                    amount: e.target.value,
                  }));
                }}
                className={modalStyles.input(colorClass.ring)}
                placeholder="0.00"
                required
              />
            </div>
            {type === "both" && (
              <div>
                <label className={modalStyles.label}>Type</label>
                <div className={modalStyles.typeButtonContainer}>
                  <button
                    type="button"
                    className={modalStyles.typeButton(
                      newTransaction.type === "income",
                      modalStyles.colorClasses.teal.typeButtonSelected,
                    )}
                    onClick={() =>
                      setNewTransaction((prev) => ({ ...prev, type: "income" }))
                    }
                  >
                    Income
                  </button>
                  <button
                    type="button"
                    className={modalStyles.typeButton(
                      newTransaction.type === "expense",
                      modalStyles.colorClasses.orange.typeButtonSelected,
                    )}
                    onClick={() =>
                      setNewTransaction((prev) => ({
                        ...prev,
                        type: "expense",
                      }))
                    }
                  >
                    Expense
                  </button>
                </div>
              </div>
            )}
            <div>
                <label htmlFor="category" className={modalStyles.label}>Category</label>
                <select id="category" value={newTransaction.category}
                onChange={(e)=>
                    setNewTransaction((prev)=>({
                        ...prev ,
                        category:e.target.value
                    }))
                } className={modalStyles.input(colorClass.ring)}>
                    {categories.map((cat)=>(
                        <option value={cat} key={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="dateAdded" className={modalStyles.label}>Date</label>
                <input type="date" id="dateAdded" value={newTransaction.date} 
                    onChange={(e)=>
                        setNewTransaction((prev)=>({ //must check later
                            ...prev,
                            date:e.target.value
                        }))
                    } className={modalStyles.input(colorClass.ring)} 
                    min={minDate} 
                    max={currentDate}
                    required  
                />
            </div>
            <button type="submit" className={modalStyles.submitButton(colorClass.button)}>
                {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
