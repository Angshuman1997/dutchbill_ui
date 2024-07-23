import React, { useState, useEffect } from "react";
import { Button, List, Collapse, Typography } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import ExpenseItem from "./ExpenseItem";
import SettlementList from "./SettlementList";

const InstantCalculate = () => {
  const itemObject = {
    id: 1,
    payer: "",
    expenseOn: "",
    amount: 0,
    userBaseExpense: [],
    isNew: true,
    isEditing: false,
  };

  const [items, setItems] = useState([]);
  const [settlements, setSettlements] = useState([]);

  const handleAddItem = () => {
    const newItem = {
      ...itemObject,
      id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
    };
    setItems([newItem, ...items]);
  };

  const handleRemoveItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    calculateSettlements();
  };

  const handleInputChange = (itemId, field, value, index, subfield) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              [field]:
                field === "userBaseExpense"
                  ? item.userBaseExpense.map((expense, i) =>
                      i === index ? { ...expense, [subfield]: value } : expense
                    )
                  : value,
            }
          : item
      )
    );
  };

  const handleAddUserBaseExpense = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              userBaseExpense: [
                ...item.userBaseExpense,
                { person: "", amount: 0 },
              ],
            }
          : item
      )
    );
  };

  const handleRemoveUserBaseExpense = (itemId, indexToRemove) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              userBaseExpense: item.userBaseExpense.filter(
                (_, index) => index !== indexToRemove
              ),
            }
          : item
      )
    );
  };

  const handleEditItem = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, isEditing: true } : item
      )
    );
  };

  const handleConfirmItem = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, isNew: false, isEditing: false } : item
      )
    );
    calculateSettlements();
  };

  const calculateSettlements = () => {
    const payerAmounts = {};
    const userBaseExpenseAmounts = {};

    items.forEach((item) => {
      if (!item.isNew) {
        payerAmounts[item.payer] =
          (payerAmounts[item.payer] || 0) + parseFloat(item.amount);

        item.userBaseExpense.forEach((expense) => {
          userBaseExpenseAmounts[expense.person] =
            (userBaseExpenseAmounts[expense.person] || 0) +
            parseFloat(expense.amount);
        });
      }
    });

    const newSettlements = [];
    Object.keys(userBaseExpenseAmounts).forEach((person) => {
      const payerAmount = payerAmounts[person] || 0;
      const userExpenseAmount = userBaseExpenseAmounts[person] || 0;
      const balance = userExpenseAmount - payerAmount;

      if (balance !== 0) {
        newSettlements.push({
          from: balance > 0 ? person : "Everyone",
          to: balance > 0 ? "Everyone" : person,
          amount: Math.abs(balance),
        });
      }
    });

    setSettlements(newSettlements);
  };

  useEffect(() => {
    calculateSettlements();
    console.log('items', items)
  }, [items]);

  return (
    <div>
      <Button onClick={handleAddItem}>Add Item</Button>
      <List>
        <TransitionGroup>
          {items.map((item) => (
            <Collapse key={item.id}>
              <ExpenseItem
                item={item}
                handleRemoveItem={handleRemoveItem}
                handleInputChange={handleInputChange}
                handleAddUserBaseExpense={handleAddUserBaseExpense}
                handleRemoveUserBaseExpense={handleRemoveUserBaseExpense}
                handleEditItem={handleEditItem}
                handleConfirmItem={handleConfirmItem}
              />
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
      <SettlementList settlements={settlements} />
    </div>
  );
};

export default InstantCalculate;
