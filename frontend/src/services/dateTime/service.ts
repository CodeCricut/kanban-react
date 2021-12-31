import { IDateTimeService } from "../../application/contracts/dateTimeService";

export const dateTimeService: IDateTimeService = {
    getCurrentDateTime: () => new Date(Date.now()),
};
