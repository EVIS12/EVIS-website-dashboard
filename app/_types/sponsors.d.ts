declare module 'Sponsors' {
  type SponsorsCategory = {
    name: string;
    order_num: string;
  };

  type ReceivedSponsorsCategory = SponsorsCategory & {
    id: string;
  };

  type Sponsor = {
    logo: string;
    subtitle: string;
    link: string;
    category: string;
  };

  type RecievedSponsor = Sponsor & {
    id: string;
  };
}
