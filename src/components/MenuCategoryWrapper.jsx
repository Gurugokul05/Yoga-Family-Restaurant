import React from "react";
import MenuCategory from "./MenuCategory";
import { useParams } from "react-router-dom";
const MenuCategoryWrapper = () => {
  const { category } = useParams();
  return <MenuCategory category={category} />;
};

export default MenuCategoryWrapper;
