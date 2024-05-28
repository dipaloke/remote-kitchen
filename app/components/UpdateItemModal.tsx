import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  TextField,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useFoodStore from "../stores/useFoodStore";
import { foodItemSchema } from "@/lib/validators/validationSchema";

interface UpdateItemProps {
  open: boolean;
  onClose: () => void;
  item: {
    id: number;
    name: string;
    description: string;
    src: string;
    price: string;
  };
}

type ValidationErrors = Record<string, string>;

export const UpdateItemModal = ({ open, onClose, item }: UpdateItemProps) => {
  const queryClient = useQueryClient();
  const updateItem = useFoodStore((state) => state.updateItem);

  const [formData, setFormData] = useState(item);
  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    setFormData(item);
  }, [item]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event?.target;
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

  const validate = () => {
    const result = foodItemSchema.safeParse(formData);
    if (result.success) {
      return true;
    } else {
      const newErrors: ValidationErrors = result.error.errors.reduce(
        (acc, err) => {
          if (err.path.length > 0) {
            acc[err.path[0] as string] = err.message;
          }
          return acc;
        },
        {} as ValidationErrors
      );
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = () => {
    if (validate()) {
      updateItem({ ...formData });
      queryClient.invalidateQueries("foodItems" as any);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="text-center text-xl font-semibold">
        Update Food Item
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col space-y-4 p-6">
          <TextField
            label="Item name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <TextField
            id="outlined-multiline-static"
            multiline
            label="Short description"
            name="description"
            defaultValue={formData.description}
            onChange={handleChange}
            error={Boolean(errors.description)}
            helperText={errors.description}
          />
          <TextField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            error={Boolean(errors.price)}
            helperText={errors.price}
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {formData.src && (
            <Image
              src={formData.src}
              alt={formData.name}
              width={400}
              height={200}
              className="w-full h-40 object-cover mt-2"
            />
          )}
        </div>
      </DialogContent>
      <DialogActions className="justify-end p-4">
        <Button onClick={onClose} color="error" className="mr-2">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="success">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};
