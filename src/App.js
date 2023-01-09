import { Autocomplete, Box, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
    let [countries, setCountries] = useState([]);

    // 실행시 async 로딩 호출
    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        let { data: resp } = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(resp);
    }

    return (
        <div className="App">
            <Autocomplete
                options={countries}
                sx={{ width: 300 }}
                getOptionLabel={(opt) => opt.name.official}
                renderOption={(props, opt) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <img loading="lazy" width="20" src={opt.flags.svg} alt="" />
                        {opt.name.official}
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Choose a country"
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                    />
                )}
                onChange={(e, v) => alert(v.name.official)}
            />
        </div>
    );
}

export default App;
