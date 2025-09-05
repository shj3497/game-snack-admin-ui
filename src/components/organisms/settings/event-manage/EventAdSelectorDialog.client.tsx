'use client';

import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {useEffect, useState} from 'react';

interface Props<T> {
  open: boolean;
  data?: T[];
  selectedValue?: T[];
  onClose: () => void;
  onChange?: (value: T[]) => void;
}

interface Data {
  id: string;
  name?: string;
  providerType: string;
  adOrderType: string;
}

const EventAdSelectorDialog = <T extends Data>({
  open,
  data = [],
  selectedValue = [],
  onClose,
  onChange,
}: Props<T>) => {
  const [state, setState] = useState<T[]>(selectedValue);

  const handleChecked = (value: T) => {
    setState((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setState([]);
    }, 300);
  };

  const handleAdd = () => {
    onChange?.(state);
    handleClose();
  };

  useEffect(() => {
    if (!open) return;
    setState(selectedValue);
  }, [open, selectedValue]);

  return (
    <Dialog open={open} maxWidth="xl" onClose={handleClose}>
      <Stack minWidth="800px" py={3} px={2}>
        <Typography variant="h6" mb={3}>
          연결 할 광고를 선택하세요.
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={40}></TableCell>
                <TableCell>이름</TableCell>
                <TableCell>광고 매체</TableCell>
                <TableCell>광고 타입</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow
                  key={item.name}
                  onClick={() => handleChecked(item)}
                  sx={{cursor: 'pointer'}}
                >
                  <TableCell>
                    <Checkbox
                      checked={state.includes(item)}
                      sx={{padding: '4px'}}
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.providerType}</TableCell>
                  <TableCell>{item.adOrderType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box display="flex" justifyContent="flex-end" mt={2} gap={1}>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAdd}
            disabled={state.length === 0}
          >
            Add
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
};
export default EventAdSelectorDialog;
