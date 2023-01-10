import React from "react";
import { render, cleanup } from "@testing-library/react";
import { FavoriteList } from "../components/birthdays";

afterEach(cleanup);

const favorites = [
  {
    date: {
      formatted: "January 1",
      day: "1",
      month: "January",
    },
    text: "Tony Montana",
    favorited: true,
  },
  {
    date: {
      formatted: "January 1",
      day: "1",
      month: "January",
    },
    text: "Speedy Gonzalez",
    favorited: true,
  },
  {
    date: {
      formatted: "February 14",
      day: "14",
      month: "February",
    },
    text: "John Smith",
    favorited: true,
  },
];

describe("FavoriteList", () => {
  it("should have the proper number of listitems base on the number of favorite birthdays", () => {
    const { getAllByTestId } = render(<FavoriteList favorites={favorites} />);
    const listItems = getAllByTestId("favorite-list-item");

    expect(listItems.length).toEqual(favorites.length);
  });

  // this test currently fails since I have not implemented the code yet
  it("should only display 2 distinct sub-headers", () => {
    const { getAllByTestId } = render(<FavoriteList favorites={favorites} />);
    const listItems = getAllByTestId("favorite-list-subheader");

    expect(listItems.length).toBeLessThan(favorites.length);
  });
});
