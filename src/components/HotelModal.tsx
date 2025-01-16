import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addHotel, updateHotel } from "@/lib/features/hotel/hotelSlice";
import { Hotel, Country, Category } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface HotelModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  countries: Country[];
  hotel?: Hotel;
}

const HotelModal = ({
  isOpen,
  onClose,
  categories,
  countries,
  hotel,
}: HotelModalProps) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Hotel>({
    defaultValues: hotel || {
      id: "",
      name: "",
      country: "",
      address: "",
      category: "",
    },
  });

  useEffect(() => {
    if (hotel) {
      reset(hotel);
    }
  }, [hotel, reset]);

  const onSubmit = (data: Hotel) => {
    if (hotel) {
      dispatch(updateHotel(data));
      toast({
        title: "Hotel Updated",
        description: `${data.name} has been successfully updated.`,
      });
    } else {
      dispatch(addHotel({ ...data, id: Date.now().toString() }));
      toast({
        title: "Hotel Added",
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
          <DialogTitle>{hotel ? "Edit Hotel" : "Add New Hotel"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => <Input id="name" {...field} />}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Controller
              name="country"
              control={control}
              rules={{ required: "Country is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country, index) => (
                      <SelectItem key={index} value={country.country}>
                        {country.country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.country && (
              <p className="text-red-500">{errors.country.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Controller
              name="address"
              control={control}
              rules={{ required: "Address is required" }}
              render={({ field }) => <Input id="address" {...field} />}
            />
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">
              {hotel ? "Update Hotel" : "Add Hotel"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HotelModal;
