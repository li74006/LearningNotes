import { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Table

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface Props {
  expenses: Expense[];
  onDelete: (id: number) => void;
}
const ExpenseList = ({ expenses, onDelete }: Props) => {
  const { register, handleSubmit } = useForm();

  const [totalData, setTotalData] = useState<any>([]);

  const onSubmit = (data: FieldValues) => {
    let handleData = { ...data, id: Date.now() };
    setTotalData(() => {});
    console.log(totalData);
  };

  if (expenses.length === 0) return null;

  return (
    <div className="mt-5">
      <table className="table table-border">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="table-group">
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
              <td>
                <button onClick={() => onDelete(expense.id)} className="btn btn-outline-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>${expenses.reduce((acc, expense) => expense.amount + acc, 0).toFixed(2)}</td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ExpenseList;
