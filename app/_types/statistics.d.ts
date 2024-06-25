interface SendStatistics {
  delegates: string;
  speakers: string;
  vehicles: string;
  exhibitors: string;
  country: string;
}

interface RecievedStatistics extends SendStatistics {
  id: number;
}

export type { SendStatistics, RecievedStatistics };
