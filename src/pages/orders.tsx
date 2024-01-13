import { ReactElement, useEffect, useState } from "react"
import TableHOC from "../components/admin/TableHOC"
import { Column } from "react-table"
import { Link } from "react-router-dom"
import { useAllOrdersQuery, useMyOrdersQuery } from "../redux/api/orderApi"
import { userReducerInitialState } from "../types/reducer-type"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"
import { Customerror } from "../types/api-types"
import { Skeleton } from "../components/loader"
type DataType={
  _id:string,
  amount : number,
  quantity: number,
  discount: number,
  status:ReactElement,
  action:ReactElement,

}

const column : Column<DataType>[]=[
  {
  Header:"ID",
  accessor:"_id",
},
  {
  Header:"Quantity",
  accessor:"quantity",
},
  {
  Header:"Discount",
  accessor:"discount",
},
  {
  Header:"Amount",
  accessor:"amount",
},
  {
  Header:"Status",
  accessor:"status",
},
  {
  Header:"Action",
  accessor:"action",
},


]

const Orders = () => {






  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );

  const { isLoading, data, isError, error } = useMyOrdersQuery(user?._id!);



const [rows , setRows] =useState<DataType[]>([])



if (isError) {
  const err = error as Customerror;
  toast.error(err.data.message);
}

useEffect(() => {

  console.log(data)

  if (data)
    setRows(
      data.orders.map((i) => ({
        _id: i._id,
        amount: i.total,
        discount: i.discount,
        quantity: i.orderItems.length,
        status: (
          <span
            className={
              i.status === "Processing"
                ? "red"
                : i.status === "Shipped"
                ? "green"
                : "purple"
            }
          >
            {i.status}{" "}
          </span>
        ),
        action: <Link to={`/admin/transactions/${i._id}`}>Manage</Link>,
      }))
    );
}, [data]);




const Table = TableHOC<DataType>(column,rows,"dashboard-product-box","orders",
rows.length > 6 
)()
  return (
    <div className="container">
 <h1>My orders</h1>
 {isLoading ? (
          <>
            {" "}
            <Skeleton length={10} /> <Skeleton length={10} />{" "}
          </>
        ) : (
          Table
        )}
    </div>
  )
}

export default Orders
