import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import { useRouter } from "next/router";
import { useState } from "react";
import { inter } from "@/fonts";
import { Event } from "@/types/Event";

function AddEvent() {
  const router = useRouter();
  const [eventData, setEventData] = useState<Event>({} as Event);

  const handleChangeTitle = (title: string) => {
    setEventData((prev) => ({ ...prev, title: title }));
  };
  const handleChangeDescription = (description: string) => {
    setEventData((prev) => ({ ...prev, description: description }));
  };

  const handleAddEvent = async () => {
    if (eventData.title && eventData.description) {
      await fetch(`http://localhost:3000/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newEvent: eventData }),
      });
      router.back();
    } else {
      alert("Fields are required");
    }
  };

  return (
    <div className={inter.className}>
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
      <CustomButton onClick={handleAddEvent}>Add</CustomButton>
    </div>
  );
}

export default AddEvent;
