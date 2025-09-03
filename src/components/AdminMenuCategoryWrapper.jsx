import React from 'react'
import AdminMenuCategory from './AdminMenuCategory'
import { useParams } from "react-router-dom";

const AdminMenuCategoryWrapper = () => {
   const { category } = useParams();
  return <AdminMenuCategory category={category} />;
}

export default AdminMenuCategoryWrapper