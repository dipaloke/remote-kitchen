import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import useFoodStore, { FoodItem } from "../stores/useFoodStore";
import { foodItemSchema } from "@/lib/validators/validationSchema";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";


interface CreateItemProps {
  open: boolean;
  onClose: () => void;
}

type validationErrors = Record<string, string>;

export const CreateItemModal = ({ open, onClose }: CreateItemProps) => {
  const [errors, setErrors] = useState<validationErrors>({});

  const addItem = useFoodStore((state) => state.addItem);

  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    src: "",
    price: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const render = new FileReader();
      render.onload = () => {
        setFormData({ ...formData, src: render.result as string });
      };
      render.readAsDataURL(file);
    }
  };

  //implement form validation
  const validate = () => {
    const result = foodItemSchema.safeParse(formData);
    if (result.success) {
      return true;
    } else {
      const newErrors: validationErrors = result.error.errors.reduce(
        (acc, err) => {
          if (err.path.length > 0) {
            acc[err.path[0] as string] = err.message;
          }
          return acc;
        },
        {} as validationErrors
      );
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = () => {
    if (validate()) {
      const newItem: FoodItem = { ...formData, id: Date.now() };
      addItem(newItem);
      queryClient.setQueryData(
        "foodItems" as any,
        (oldData: FoodItem[] | undefined) => [...(oldData || []), newItem]
      );
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="text-center text-xl font-semibold">
        Add your Food Item
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col space-y-4 p-4">
          <TextField
            label="Item name"
            name="name"
            value={formData.name}
            error={Boolean(errors.name)}
            helperText={errors.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            className="mb-4"
            required
          />
          <TextField
            label="Short description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={Boolean(errors.description)}
            helperText={errors.description}
            variant="outlined"
            fullWidth
            className="mb-4"
          />
          <TextField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            error={Boolean(errors.price)}
            helperText={errors.price}
            variant="outlined"
            fullWidth
            className="mb-4"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4"
            required
          />

        </div>
      </DialogContent>
      <DialogActions className="justify-end pb-4">
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="success">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
