import * as React from 'react';
import TextField from '@mui/material/TextField';
import Label from '@mui/material/InputLabel'

interface Props{
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>
}
export default function SearchFiel({search,setSearch} : Props) {
    return (
        <div className="search">
            <Label>Search</Label>
            <TextField value={search} onChange={ (e) => setSearch(e.target.value)}/>
        </div>
    );
  }