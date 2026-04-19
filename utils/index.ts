import { Filters } from "@types";

export function addCommasToAmounts(amount: number): string {
  const reversedArray = amount.toString().split("").reverse();
  const commaedArray = [];
  let jumpedNumbersCount = 0;
  for (let i = 0; i < reversedArray.length; i++) {
    if (jumpedNumbersCount === 3) {
      commaedArray.push(",");
      commaedArray.push(reversedArray[i]);
      jumpedNumbersCount = 1;
    } else {
      jumpedNumbersCount = jumpedNumbersCount + 1;
      commaedArray.push(reversedArray[i]);
    }
  }

  const reversedCommaedArray = commaedArray.reverse();
  let processedString = "";

  for (let i = 0; i < reversedCommaedArray.length; i++) {
    processedString = processedString + reversedCommaedArray[i];
  }

  return processedString;
}

export function unixToTime(ms: string) {
  const date = new Date(Number(ms));

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

export function unixToDate(ms: string) {
  const date = new Date(Number(ms));

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
}

export function setSideStatus(filters: Filters): {
  side: number;
  status: number;
} {
  let sideStatus = {
    side: 2,
    status: 0,
  };
  if (filters.type === "sell") {
    sideStatus = { ...sideStatus, side: 1 };
  } else {
    sideStatus = { ...sideStatus, side: 0 };
  }

  switch (filters.status) {
    case "none":
      sideStatus = { ...sideStatus, status: 0 };
      break;
    case "completed":
      sideStatus = { ...sideStatus, status: 50 };
      break;
    case "canceled":
      sideStatus = { ...sideStatus, status: 40 };
      break;
    case "pending payment":
      sideStatus = { ...sideStatus, status: 10 };
      break;
    case "pending release":
      sideStatus = { ...sideStatus, status: 20 };
  }
  return sideStatus;
}

export function checkIfNumber(input: string): boolean {
  if (Number(input).toString() === "NaN") {
    return false;
  } else {
    return true;
  }
}

export function handleLocalStorage(
  action: "SET" | "GET" | "DELETE",
  title: string,
  data?: string
): any {
  if (action === "SET" && data) {
    localStorage.setItem(title, data);
    return;
  }

  if (action === "DELETE") {
    localStorage.removeItem(title);
    return;
  }

  if (action === "GET") {
    const storedData = localStorage.getItem(title);
    const parsedItem = JSON.parse(storedData ? storedData : "");
    return parsedItem;
  }
}
