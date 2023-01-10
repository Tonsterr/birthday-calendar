import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import StarIcon from "@mui/icons-material/Star";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import _ from "lodash";
import React from "react";
import { FormatMonth } from "../util/util";
import Label from "@mui/material/InputLabel";

interface Birthday {
  date: {
    formatted: string;
    day: string | undefined;
    month: string | undefined;
  };
  text: string;
  favorited: boolean;
}

interface Props {
  day: string | undefined;
  month: string | undefined;
  search: string;
}

const BirthdayList = ({ day, month, search }: Props) => {
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState<Birthday[]>([]);

  const fetchData = async (
    dayValue: string | undefined,
    monthValue: string | undefined
  ) => {
    if (typeof monthValue === "undefined" || typeof dayValue === "undefined")
      return;
    setBirthdays([]);
    const { data } = await axios.get(
      `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${monthValue}/${dayValue}`
    );
    const { births } = data;
    const t: Birthday[] = births;
    setBirthdays(births);
  };
  useEffect(() => {
    fetchData(day, month);
  }, [day, month]);

  const AddRemoveFavorite = (birthday: Birthday) => {
    setBirthdays(
      birthdays.map((b) =>
        b.text == birthday.text ? { ...b, favorited: !b.favorited } : b
      )
    );
    if (birthday.favorited) removeFromFavorites(birthday);
    else addToFavorites(birthday);
  };
  const addToFavorites = (birth: Birthday) => {
    birth.date = {
      formatted: `${FormatMonth(month)} ${day}`,
      day: day,
      month: month,
    };

    setFavorites([...favorites, birth]);
  };

  const removeFromFavorites = (birth: Birthday) => {
    const updatedFavorites = _.remove(favorites, function (favorite) {
      return favorite.text !== birth.text;
    });
    setFavorites(updatedFavorites);
  };

  console.log(birthdays);
  return (
    <div className="birthday-list">
      {birthdays.length < 1 ? (
        <CircularProgress />
      ) : (
        <List sx={{ width: "100%" }}>
          {birthdays
            .filter(
              (f) =>
                f.text.toLowerCase().includes(search.toLowerCase()) ||
                search === ""
            )
            .map((birthday) => (
              <ListItem
                key={birthday.text}
                disableGutters
                data-testid="birthday-list-item"
              >
                <ListItemButton onClick={() => AddRemoveFavorite(birthday)}>
                  <ListItemIcon>
                    {birthday.favorited ? (
                      <StarIcon sx={{ color: "blue" }} />
                    ) : (
                      <StarIcon sx={{ color: "lightgray" }} />
                    )}
                  </ListItemIcon>
                </ListItemButton>
                <ListItemText primary={`${birthday.text}`} />
              </ListItem>
            ))}
        </List>
      )}
      {<FavoriteList favorites={favorites} />}
    </div>
  );
};

export const FavoriteList = ({ favorites }: { favorites: Birthday[] }) => {
  return favorites.length > 0 ? (
    <div>
      <h2>Favorite Birthdays</h2>
      <List sx={{ width: "100%" }}>
        {favorites.map((favorite) => (
          <div key={favorite.text}>
            <Label data-testid="favorite-list-subheader">
              {favorite.date.formatted}
            </Label>
            <ListItem disableGutters data-testid="favorite-list-item">
              <ListItemText primary={`${favorite.text}`} />
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  ) : (
    <></>
  );
};

export default BirthdayList;
