import * as React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import dayjs, { Dayjs } from "dayjs";
import Calendar from "../components/calendar";

afterEach(cleanup);

describe("DatePicker", () => {
  it("should display the selected date in the input field", () => {
    const date = dayjs("2022-01-01");
    const { getByLabelText } = render(
      <Calendar date={date} setDate={() => {}} />
    );
    expect(getByLabelText("Date picker").getAttribute("value")).toBe(
      "01/01/2022"
    );
  });

  it("should update the selected date when a new date is chosen", () => {
    const date = dayjs("2022-01-01");
    const setDate = jest.fn();
    const { getByLabelText } = render(
      <Calendar date={date} setDate={setDate} />
    );
    fireEvent.change(getByLabelText("Date picker"), {
      target: { value: "02/01/2022" },
    });
    expect(setDate).toHaveBeenCalledWith(dayjs("2022-02-01"));
  });
});
