import { Account } from "./models/models";

export const stringNumberToDate = (date: string): string => {
    const newDate = new Date(Number(date) * 1000)

    var year = newDate.getFullYear();
    var month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    var day = newDate.getDate().toString().padStart(2, '0');

    var formattedDate = `${year}-${month}-${day}`;

    return formattedDate
}

export const stringDateToNumber = (date: string): number => {
    const newDate = new Date(date)
    return newDate.getTime() / 1000
}

export const colors: { [key: string]: string } = {
  Pending: "bg-warning",
  Disable: "bg-danger",
  Active: "bg-success"
}

export const validateAccount = (account: Account): string[] => {
    const validateErrors: string[] = []

    if (account.name.trim().length === 0 ) {
        validateErrors.push("name")
    }

    if (account.account_name.trim().length === 0 ) {
        validateErrors.push("account_name")
    }

    if (account.email.trim().length === 0 ) {
        validateErrors.push("email")
    }

    if (account.status.trim().length === 0 ) {
        validateErrors.push("status")
    }

    if (new Date(account.start_date).toLocaleString() === "Invalid Date" ) {
        validateErrors.push("start_date")
    }

    if (new Date(account.expiration_date).toLocaleString() === "Invalid Date" ) {
        validateErrors.push("expiration_date")
    }

    return validateErrors;
}