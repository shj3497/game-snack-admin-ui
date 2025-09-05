import {FC} from 'react';
import {ApplicantPageFilter} from '../ApplicantPage';
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import TableSuspense from '@/components/common/TableSuspense';
import ApplicantTableBody from './ApplicantTableBody.client';
import ApplicantTableFilter from './ApplicantTableFilter.client';

interface Props extends ApplicantPageFilter {
  eventId: string;
}

const ApplicantTable: FC<Props> = ({...props}) => {
  return (
    <TableContainer>
      <ApplicantTableFilter {...props} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>adid / idfa</TableCell>
            <TableCell width={90}>platform</TableCell>
            <TableCell width={250}>click_key</TableCell>
            <TableCell width={250}>userId</TableCell>
            <TableCell align="center">게임이력</TableCell>
            <TableCell width={110} align="center">
              응모일시
            </TableCell>
            <TableCell width={60} align="center">
              성공
              <br />
              여부
            </TableCell>
            <TableCell width={110} align="center">
              리워드 지급
              <br />
              요청상태
            </TableCell>
            <TableCell width={110} align="center">
              리워드 지급
              <br />
              요청일시
            </TableCell>
          </TableRow>
        </TableHead>
        <TableSuspense rowNum={10} colNum={10}>
          <ApplicantTableBody {...props} />
        </TableSuspense>
      </Table>
    </TableContainer>
  );
};

export default ApplicantTable;
