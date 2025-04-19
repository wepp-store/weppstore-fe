import { createWeppEventLog } from '@/shared/apis/services/wepp/event-log';
import React from 'react';

interface Props {
  weppId: string;
}

const WeppViewEventLog = ({ weppId }: Props) => {
  React.useEffect(() => {
    if (!weppId) return;
    createWeppEventLog({ weppId, eventType: 'VIEW' });
  }, [weppId]);

  return null;
};

export default WeppViewEventLog;
