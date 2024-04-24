import { CustomButton } from "@/components/CustomButton";
import { inter } from "@/fonts";
import { Event } from "@/types/Event";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

interface Props {
  events: Event[];
}

function Events({ events }: Props) {
  const router = useRouter();
  const [eventsData, setEventsData] = useState<Event[]>(events);

  const handleNavigateToAddEvent = () => {
    router.push("/events/add");
  };

  const fetchAll = async () => {
    const response = await fetch("http://localhost:3000/api/events");
    const events = await response.json();

    setEventsData(events);
  };

  return (
    <div className={inter.className}>
      {eventsData.map((event) => (
        <div key={event.id}>
          <Link href={`/events/${event.id}`}>{event.title}</Link>
        </div>
      ))}
      <CustomButton onClick={fetchAll}>Get All Events</CustomButton>
      <CustomButton onClick={handleNavigateToAddEvent}>Add event</CustomButton>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/events");
  const events = await response.json();

  return {
    props: {
      events: events,
    },
  };
}

export default Events;
