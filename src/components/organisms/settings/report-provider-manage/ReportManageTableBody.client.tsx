'use client';

import {useGetReportProviderListSuspense} from '@/lib/service/api-client/reports/reports';
import useAppId from '@/lib/store/useAppId';
import {IconButton, TableBody, TableCell, TableRow} from '@mui/material';
import Link from 'next/link';
import paths from '@/lib/utils/paths';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {FC} from 'react';

interface Props {
  superspaceConfig?: SuperSpaceConfig;
}

const ReportManageTableBody: FC<Props> = ({superspaceConfig}) => {
  const isSuperspace = !!superspaceConfig;
  const storedAppId = useAppId((store) => store.appId);
  const appId = isSuperspace ? superspaceConfig.appId : storedAppId;

  const {data} = useGetReportProviderListSuspense(appId, {
    query: {
      retry: 1,
    },
  });

  const linkPath = (reportProviderId: string) =>
    isSuperspace
      ? paths.superspace.settings.app.report_provider.detail(
          appId,
          reportProviderId,
        )
      : paths.workspace.settings.report_provider.detail(reportProviderId);

  return (
    <TableBody>
      {data.data.length === 0 && (
        <TableRow>
          <TableCell colSpan={6} align="center">
            No data
          </TableCell>
        </TableRow>
      )}
      {data.data.map((item, index) => (
        <TableRow key={item.id}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{item.providerType}</TableCell>
          <TableCell>{item.reportProviderType}</TableCell>
          <TableCell>{item.reportKey}</TableCell>
          <TableCell>{item.commission}</TableCell>
          <TableCell>
            <Link href={linkPath(item.id)} scroll={false}>
              <IconButton>
                <VisibilityOutlinedIcon />
              </IconButton>
            </Link>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default ReportManageTableBody;
