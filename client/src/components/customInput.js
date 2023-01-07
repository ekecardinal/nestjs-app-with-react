import {
  Box,
  FormHelperText,
  FormControl,
  OutlinedInput,
  Typography,
} from '@mui/material';

export default function CustomFormInput({
  name,
  onChange,
  errors,
  type,
  value,
  label,
}) {
  return (
    <Box sx={{ mb: 3 }}>
      <FormControl error={errors} fullWidth>
        <Typography variant="body1">{label}</Typography>
        <OutlinedInput
          id="component-outlined"
          name={name}
          type={type}
          onChange={onChange}
          value={value}
        />
        {errors && (
          <FormHelperText id="component-error-text">{errors}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}
