import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { 
    params 
  }: { params: { carId: string } }
) {
  try {
    // Obtener el userId de la autenticación
    const { userId } = auth();
    const { carId } = params;

    // Verificar si el userId está presente
    if (!userId) {
      console.log("Unauthorized access attempt. No userId found.");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Obtener los datos del cuerpo de la solicitud
    const values = await req.json();
    console.log("Values to update:", values); // Verificar los datos enviados

    // Verificar que los valores sean correctos (por ejemplo, que no haya campos vacíos inesperados)
    if (!values || Object.keys(values).length === 0) {
      console.log("No values provided for update.");
      return new NextResponse("Bad Request: No values provided", { status: 400 });
    }

    // Realizar la actualización en la base de datos
    const car = await db.product.update({
      where: {
        id: carId,
        userId, // Asegúrate de que el usuario esté autorizado a modificar este producto
      },
      data: {
        ...values,
      },
    });

    console.log("Updated car:", car); // Verifica la respuesta de la base de datos

    return NextResponse.json(car);
  } catch (error) {
    // Capturar y loguear el error completo para mejor depuración
    console.error("[CAR FORM ID] Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
