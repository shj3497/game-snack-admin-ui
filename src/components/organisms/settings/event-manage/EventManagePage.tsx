import {FC} from 'react';
import EventManageTable from './EventManageTable';

interface Props {
  page?: number;
  pageSize?: number;
}

const EventManagePage: FC<Props> = ({page, pageSize}) => {
  return (
    <div>
      <EventManageTable page={page} pageSize={pageSize} />
    </div>
  );
};
export default EventManagePage;
