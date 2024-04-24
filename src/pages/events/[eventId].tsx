import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import { useRouter } from "next/router";
import { useState } from "react";
import { inter } from "@/fonts";
import { Event } from "@/types/Event";

interface Props {
  event: Event;
}

function EventComp({ event }: Props) {
  const router = useRouter();
  const [eventData, setEventData] = useState<Event>(event);

  const handleChangeTitle = (title: string) => {
    setEventData((prev) => ({ ...prev, title: title }));
  };

  const handleChangeDescription = (description: string) => {
    setEventData((prev) => ({ ...prev, description: description }));
  };

  const updateEvent = async () => {
    if (eventData.title && eventData.description) {
      const response = await fetch(
        `http://localhost:3000/api/events/${eventData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ updatedEvent: eventData }),
        }
      );
      const event = await response.json();
      setEventData(event);
      handleBack();
    } else {
      alert("Fields are required");
    }
  };

  const deleteEvent = async () => {
    await fetch(`http://localhost:3000/api/events/${eventData.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    handleBack();
  };

  const handleBack = () => {
    router.back();
  };
  return (
    <div className={inter.className}>
      <CustomButton onClick={handleBack}>Back</CustomButton>
      <p>Id: {eventData.id}</p>
      <p>Title: </p>
      <CustomInput
        onChange={(e) => handleChangeTitle(e.target.value)}
        value={eventData.title}
      />
      <p>Description:</p>
      <CustomInput
        onChange={(e) => handleChangeDescription(e.target.value)}
        value={eventData.description}
      />
      <CustomButton onClick={updateEvent}>Update event</CustomButton>
      <CustomButton onClick={deleteEvent}>Delete event</CustomButton>
    </div>
  );
}

export async function getServerSideProps({ params }: any) {
  const { eventId } = params;

  const response = await fetch(`http://localhost:3000/api/events/${eventId}`);
  const event = await response.json();

  return {
    props: {
      event: event,
    },
  };
}

export default EventComp;
