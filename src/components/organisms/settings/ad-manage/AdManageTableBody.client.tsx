'use client';
import {
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  TableFooter,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import TablePagination from '@/components/common/TablePagination.client';
import paths from '@/lib/utils/paths';
import Link from 'next/link';
import dayjs from 'dayjs';
import {FC} from 'react';
import {
  GetAdPlacementByAppIdListAdOrderType,
  GetAdPlacementByAppIdListAdProviderType,
} from '@/lib/service/api-client/model';
import {useGetAdPlacementByAppIdListSuspense} from '@/lib/service/api-client/advertisement/advertisement';
import useAppId from '@/lib/store/useAppId';
import {AdManagePageFilter} from './AdManagePage';

interface Props extends AdManagePageFilter {}

const AdManageTableBody: FC<Props> = ({
  page = 0,
  pageSize = 10,
  name,
  providerType,
  adOrderType,
}) => {
  const appId = useAppId((store) => store.appId);
  const {
    data: {data},
  } = useGetAdPlacementByAppIdListSuspense(appId, {
    page,
    size: pageSize,
    name,
    providerType: providerType as GetAdPlacementByAppIdListAdProviderType,
    adOrderType: adOrderType as GetAdPlacementByAppIdListAdOrderType,
  });

  const totalCount = data.totalElements || 0;

  return (
    <>
      <TableBody>
        {data.content?.length === 0 && (
          <TableRow>
            <TableCell colSpan={8} align="center">
              No data
            </TableCell>
          </TableRow>
        )}
        {data.content?.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell align="center">
              {totalCount - (page * pageSize + index)}
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item.providerType}</TableCell>
            <TableCell>{item.adOrderType}</TableCell>
            <TableCell>
              {dayjs(new Date(item.createdAt || '')).format('YYYY.MM.DD')}
            </TableCell>
            <TableCell>
              {dayjs(new Date(item.updatedAt || '')).format('YYYY.MM.DD')}
            </TableCell>
            <TableCell>
              <Link
                href={paths.workspace.settings.ad.detail(item.id || '')}
                scroll={false}
              >
                <IconButton>
                  <VisibilityOutlinedIcon />
                </IconButton>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TablePagination
          count={totalCount}
          page={page}
          rowsPerPage={pageSize}
          colSpan={8}
        />
      </TableFooter>
    </>
  );
};

export default AdManageTableBody;
