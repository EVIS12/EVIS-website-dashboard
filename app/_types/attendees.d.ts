declare module 'Attendees' {
  type Attendee = {
    name: string;
  };

  type ReceivedAttendee = Attendee & {
    id: string;
  };
}
