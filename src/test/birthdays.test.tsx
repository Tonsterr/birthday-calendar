import React from "react";
import { render, cleanup } from "@testing-library/react";
import BirthList from "../components/birthdays";
import axios from "axios";

afterEach(cleanup);

describe("BirthdayList", () => {
  it("should have the proper number of people who's birthday is on the day and month passed", async () => {
    jest.setTimeout(10000);
    const month = "01";
    const day = "09";
    const response = await axios.get(
      `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${month}/${day}`
    );
    const items = response.data;

    const { getAllByTestId } = render(
      <BirthList search={""} day={day} month={month} />
    );
    setTimeout(() => {
      const listItems = getAllByTestId("birthday-list-item");

      expect(listItems.length).toEqual(items.length);
    }, 5000);
  });
});
//TODO:
// Add test for the search functionality
// Add test for label that displays current date
