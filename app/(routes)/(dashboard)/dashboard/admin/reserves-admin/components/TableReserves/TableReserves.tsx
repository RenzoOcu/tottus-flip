import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { TableReservesProps } from "./TableReserves.types";
  import { formatPrice } from "@/lib/formatPrice";
  
  export function TableReserves(props: TableReservesProps) {
    const { orders } = props;
  
    const totalAmount = orders.reduce((acc, booking) => {
      return acc + parseFloat(booking.totalAmount);
    }, 0);
  
    return (
      <Table>
        <TableCaption>fase de prueba.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Orden</TableHead>
            <TableHead>id</TableHead>
            <TableHead>producto</TableHead>
            <TableHead>inicio</TableHead>
            <TableHead>fin</TableHead>
            <TableHead className="text-right">precio</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">
                {new Date(order.createdAt).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell className="font-medium max-w-[100px] truncate">
                {order.userId}
              </TableCell>
              <TableCell className="font-medium truncate">
                {order.carName}
              </TableCell>
              <TableCell>
                {new Date(order.orderDate).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>
                {new Date(order.orderEndDate).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell className="text-right">
                {formatPrice(Number(order.totalAmount))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">
              {formatPrice(totalAmount)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }

  //5:00:24