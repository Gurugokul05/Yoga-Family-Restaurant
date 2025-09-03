import React from 'react'
import AdminMenuForPriceChange from './AdminMenuForPriceChange';
import { useParams } from "react-router-dom";

const AdminMenuForPriceChangeWrapper = () => {
  const { category } = useParams();
  return <AdminMenuForPriceChange category={category} />;
}

export default AdminMenuForPriceChangeWrapper