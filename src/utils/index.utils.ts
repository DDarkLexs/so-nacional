export const checkErrorContatrainsArrays = (errors: any[]): any => {
  return errors.flatMap(error => Object.values(error.constraints ?? []))[0]; // Use flatMap and nullish coalescing operator
};
export const fazerSubtotal = (preco: number, quantidade: number): number => {
  return preco * quantidade;
};
