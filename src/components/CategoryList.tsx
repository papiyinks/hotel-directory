import { useDispatch } from "react-redux";
import { deleteCategory } from "@/lib/features/category/categorySlice";
import { Category } from "@/types";
import { Button } from "@/components/ui/button";
import { Edit, ListPlus, Trash2 } from "lucide-react";

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
}

const CategoryList = ({ categories, onEdit }: CategoryListProps) => {
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteCategory(id));
  };

  if (categories.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <ListPlus className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No categories
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by adding a new category.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {categories.map((category) => (
          <li
            key={category.id}
            className="p-4 flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-900">
                {category.name}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-800"
                onClick={() => onEdit(category)}
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-800"
                onClick={() => handleDelete(category.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
