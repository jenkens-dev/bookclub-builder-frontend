// import React, { useState } from 'react';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import Radio from '@material-ui/core/Radio';
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import CircularProgress from '@material-ui/core/CircularProgress';

// export default function Demo({}) {
//    const [inputText, setInputText] = useState('');
//    const [selectedRadio, setRadioSelection] = useState('female');
//    const [options, setOptions] = React.useState([{ name: '1', value: 1 }]);
//    const [loading, setLoading] = React.useState(true);

//    return (
//       <FormControl component="fieldset">
//          <FormLabel component="legend">Gender</FormLabel>
//          <RadioGroup
//             defaultValue="female"
//             aria-label="gender"
//             name="customized-radios"
//             onChange={(_, value) => setRadioSelection(value)}
//             value={selectedRadio}
//          >
//             <FormControlLabel
//                value="female"
//                control={<Radio color="primary" />}
//                label="Female"
//             />
//             <FormControlLabel
//                value="male"
//                control={<Radio color="primary" />}
//                label="Male"
//             />
//             <FormControlLabel
//                value="other"
//                control={<Radio color="primary" />}
//                label="Other"
//             />

//             <FormControlLabel
//                value={inputText}
//                control={<Radio color="primary" />}
//                label={
//                   <TextField
//                      id="standard-name"
//                      label="Another book"
//                      value={inputText}
//                      onChange={({ target }) => {
//                         setInputText(target.value);
//                         setRadioSelection(target.value);
//                      }}
//                   />
//                }
//             />
//             <Autocomplete
//                id="asynchronous-demo"
//                style={{ width: 300 }}
//                getOptionSelected={(option, value) => option.name === value.name}
//                getOptionLabel={option => option.name}
//                options={options}
//                loading={loading}
//                onInputChange={(_, value) => {
//                   setInputText(value);
//                   setRadioSelection(value);
//                }}
//                renderInput={params => (
//                   <TextField
//                      {...params}
//                      label="Asynchronous"
//                      fullWidth
//                      variant="outlined"
//                      InputProps={{
//                         ...params.InputProps,
//                         endAdornment: (
//                            <React.Fragment>
//                               {loading ? (
//                                  <CircularProgress color="inherit" size={20} />
//                               ) : null}
//                               {params.InputProps.endAdornment}
//                            </React.Fragment>
//                         ),
//                      }}
//                   />
//                )}
//             />
//          </RadioGroup>
//       </FormControl>
//    );
// }
