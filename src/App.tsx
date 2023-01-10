import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect } from "react";
import "./App.css";
import Birthdays from "./components/birthdays";
import Calendar from "./components/calendar";
import Search from "./components/search";
import Label from "@mui/material/InputLabel";

const App: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [date, setDate] = useState<Dayjs | null | undefined>(dayjs());
  const month = date?.format("MM");
  const day = date?.format("DD");
  console.log(search);
  console.log(date);

  return (
    <div className="App">
      <Label sx={{ fontSize: "4em" }}>Birthday Calendar</Label>
      <Calendar date={date} setDate={setDate} />
      <Search search={search} setSearch={setSearch} />
      <Birthdays search={search} day={day} month={month} />
    </div>
  );
};

export default App;
