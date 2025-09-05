import React from 'react';
import { Box, TextField, Select, MenuItem, Button } from '@mui/material';

interface AdManageFilterProps {
  name: string;
  providerType: string;
  adOrderType: string;
  setName: (v: string) => void;
  setProviderType: (v: string) => void;
  setAdOrderType: (v: string) => void;
  onSearch: () => void;
}

const AdManageFilter: React.FC<AdManageFilterProps> = ({
  name,
  providerType,
  adOrderType,
  setName,
  setProviderType,
  setAdOrderType,
  onSearch,
}) => (
  <Box display="flex" gap={2} alignItems="center" p={1}>
    <TextField
      label="지면명"
      size="small"
      value={name}
      onChange={e => setName(e.target.value)}
    />
    <Select
      value={providerType}
      onChange={e => setProviderType(e.target.value)}
      displayEmpty
      size="small"
      sx={{ minWidth: 120 }}
    >
      <MenuItem value="">업체 선택</MenuItem>
      <MenuItem value="ADPOPCORN">애드팝콘</MenuItem>
      <MenuItem value="MEZZO">메조</MenuItem>
      <MenuItem value="DAWIN">다윈</MenuItem>
      <MenuItem value="GOOGLE">구글</MenuItem>
    </Select>
    <Select
      value={adOrderType}
      onChange={e => setAdOrderType(e.target.value)}
      displayEmpty
      size="small"
      sx={{ minWidth: 120 }}
    >
      <MenuItem value="">광고유형 선택</MenuItem>
      <MenuItem value="adpopcorn_interstitial">애드팝콘 전면</MenuItem>
      <MenuItem value="adpopcorn_video">애드팝콘 비디오</MenuItem>
      <MenuItem value="mezzo_interstitial">메조 전면</MenuItem>
      <MenuItem value="mezzo_video">메조 비디오</MenuItem>
      <MenuItem value="dawin_video">다윈</MenuItem>
      <MenuItem value="gpt_interstitial">구글 전면</MenuItem>
    </Select>
    <Button variant="contained" size="small" onClick={onSearch}>
      검색
    </Button>
  </Box>
);

export default AdManageFilter;
