import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { FormatMonth } from "../util/util";

interface Props {
  date: Dayjs | null | undefined;
  setDate: React.Dispatch<React.SetStateAction<Dayjs | null | undefined>>;
}

export default function DatePicker({ date, setDate }: Props) {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          openTo="day"
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      {date && (
        <p>
          Birthdays on: {FormatMonth(date.format("MM"))} {date.format("DD")}
        </p>
      )}
    </div>
  );
}
