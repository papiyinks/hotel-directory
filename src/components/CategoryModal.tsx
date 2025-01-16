import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  addCategory,
  updateCategory,
} from "@/lib/features/category/categorySlice";
import { Category } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: Category;
}

const CategoryModal = ({ isOpen, onClose, category }: CategoryModalProps) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Category>({
    defaultValues: category || {
      id: "",
      name: "",
    },
  });

  useEffect(() => {
    if (category) {
      reset(category);
    }
  }, [category, reset]);

  const onSubmit = (data: Category) => {
    if (category) {
      dispatch(updateCategory(data));
      toast({
        title: "Category Updated",
        description: `${data.name} has been successfully updated.`,
      });
    } else {
      dispatch(addCategory({ ...data, id: Date.now().toString() }));
      toast({
        title: "Category Added",
        description: `${data.name} has been successfully added.`,
      });
    }
    onClose();
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Category" : "Add New Category"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Category name is required" }}
              render={({ field }) => <Input id="name" {...field} />}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">
              {category ? "Update Category" : "Add Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
