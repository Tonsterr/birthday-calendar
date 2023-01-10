import * as React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import SearchField from "../components/search";

afterEach(cleanup);

describe("SearchField", () => {
  it("should display the given search value", () => {
    const search = "test";
    const { container } = render(
      <SearchField search={search} setSearch={() => {}} />
    );
    const searchBox = container.querySelector("#search-field");
    expect(searchBox?.getAttribute("value")).toBe("test");
  });

  it("should update the search value when the input is changed", () => {
    const search = "test";
    const setSearch = jest.fn();

    const { getByLabelText } = render(
      <SearchField search={search} setSearch={setSearch} />
    );
    fireEvent.change(getByLabelText("Search"), {
      target: { value: "new value" },
    });
    expect(setSearch).toHaveBeenCalledWith("new value");
  });
});
