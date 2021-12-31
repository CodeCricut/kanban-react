import { IDateTimeService } from "../../application/contracts/dateTimeService";
import { dateTimeService } from "./service";

export function useDateTimeService(): IDateTimeService {
    return dateTimeService;
}
