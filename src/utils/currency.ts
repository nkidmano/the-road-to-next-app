import { MyBig } from "@/lib/big";

export function toCent(amount: number): number {
  return MyBig(amount).mul(100).round(2).toNumber();
}

export function fromCent(amount: number): number {
  return MyBig(amount).div(100).round(2).toNumber();
}

export function toCurrency(amount: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(fromCent(amount));
}
