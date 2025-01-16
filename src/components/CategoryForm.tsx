import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "@/lib//features/category/categorySlice";
import { Category } from "@/types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CategoryForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name) {
      const newCategory: Category = {
        id: Date.now().toString(),
        name,
      };
      dispatch(addCategory(newCategory));
      setName("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Category</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category Name"
            required
          />
          <Button type="submit">Add</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CategoryForm;
