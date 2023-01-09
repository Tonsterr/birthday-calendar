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
  date: string;
  text: string;
  favorited: boolean;
}

interface Props {
  day: string | undefined;
  month: string | undefined;
  search: string;
}

const BirthdayList = ({ day, month, search }: Props) => {
  const [birthdays, setBirthdays] = React.useState<Birthday[]>([]);
  const [error, setError] = React.useState("");
  const [favorites, setFavorites] = React.useState<Birthday[]>([]);

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
    birth.date = `${FormatMonth(month)} ${day}`;
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
              <ListItem key={birthday.text} disableGutters>
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
      {favorites.length > 0 && <FavoriteList favorites={favorites} />}
    </div>
  );
};

const FavoriteList = ({ favorites }: { favorites: Birthday[] }) => {
  return (
    <div>
      <h2>Favorite Birthdays</h2>
      <List sx={{ width: "100%" }}>
        {favorites.map((favorite) => (
          <div>
            <Label>{favorite.date}</Label>
            <ListItem key={favorite.text} disableGutters>
              <ListItemText primary={`${favorite.text}`} />
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  );
};
export default BirthdayList;
