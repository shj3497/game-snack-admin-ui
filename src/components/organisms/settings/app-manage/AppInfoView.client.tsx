'use client';

import {useGetAppDetailSuspense} from '@/lib/service/api-client/apps/apps';
import {Skeleton, TableBody, TableCell, TableRow} from '@mui/material';
import {FC} from 'react';

interface Props {
  appId: string;
}

export const AppInfoViewSkeleton: FC = () => {
  return (
    <TableBody>
      <TableRow>
        <TableCell
          component="th"
          scope="row"
          width={200}
          sx={{color: '#a2a2a2'}}
        >
          App Id
        </TableCell>
        <TableCell>
          <Skeleton />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          component="th"
          scope="row"
          width={200}
          sx={{color: '#a2a2a2'}}
        >
          App Name
        </TableCell>
        <TableCell>
          <Skeleton />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          component="th"
          scope="row"
          width={200}
          sx={{color: '#a2a2a2'}}
        >
          Postback Url
        </TableCell>
        <TableCell>
          <Skeleton />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          component="th"
          scope="row"
          width={200}
          sx={{color: '#a2a2a2'}}
        >
          Hash Key
        </TableCell>
        <TableCell>
          <Skeleton />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          component="th"
          scope="row"
          width={200}
          sx={{color: '#a2a2a2'}}
        >
          Description
        </TableCell>
        <TableCell>
          <Skeleton />
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

const AppInfoView: FC<Props> = ({appId}) => {
  const {
    data: {data},
  } = useGetAppDetailSuspense(appId, {
    query: {
      staleTime: 5 * 60 * 1000, // 5분
      gcTime: 5 * 60 * 1000, // 5분
    },
  });

  return (
    <TableBody>
      <TableRow>
        <TableCell
          component="th"
          scope="row"
          width={200}
          sx={{color: '#a2a2a2'}}
        >
          App Id
        </TableCell>
        <TableCell align="left">{data.appId}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          component="th"
          scope="row"
          width={200}
          sx={{color: '#a2a2a2'}}
        >
          App Name
        </TableCell>
        <TableCell>{data.appName}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row" sx={{color: '#a2a2a2'}}>
          Postback Url
        </TableCell>
        <TableCell>{data.postbackUrl}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row" sx={{color: '#a2a2a2'}}>
          Hash Key
        </TableCell>
        <TableCell>{data.hashKey}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row" sx={{color: '#a2a2a2'}}>
          Description
        </TableCell>
        <TableCell>{data.description}</TableCell>
      </TableRow>
    </TableBody>
  );
};

export default AppInfoView;
