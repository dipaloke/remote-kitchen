import Container from "@mui/material/Container";
import { FoodList } from "./components/FoodList";

export default function Home() {
  return (
    <div className="">
      <h1 className="text-center py-8 text-3xl">Food Items</h1>
      <FoodList />
    </div>
  );
}
