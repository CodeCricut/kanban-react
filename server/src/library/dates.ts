import moment from "moment";
export function convertDateToString(date: Date) {
    return date.toISOString();
}

export function convertDateStringToDate(dtString: string): Date {
    return moment(dtString).toDate();
}

export function isValidDateTimeString(dtString: string): boolean {
    return moment(dtString).isValid();
}

export const getCurrentDateTime = () => new Date(Date.now());
export const getCurrentDateTimeString = () =>
    convertDateToString(getCurrentDateTime());
