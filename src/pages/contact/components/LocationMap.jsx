import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import ScheduleMeet from "./ScheduleMeeting";

const LocationMap = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  const address =
    "26 Lala Lajpat Rai Colony, Prabhat Petrol Pump, Bhopal, Madhya Pradesh, India";

  const handleMapLoad = () => setMapLoaded(true);

  const handleDirectionsClick = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      address,
    )}`;
    window.open(googleMapsUrl, "_blank");
  };

  const locationDetails = {
    city: "26 Lala Lajpat Rai Colony, Prabhat Petrol Pump, Bhopal, Madhya Pradesh, India",
    area: "Open to Entry-Level, Internship & Full-Time Opportunities",
    description:
      "Based in Bhopal, Madhya Pradesh. As an entry-level MERN stack developer, I'm eager to contribute to real-world projects, learn from experienced teams, and grow as a full-stack developer.",
  };

  return (
    <>
      {/* Schedule Meeting Popup */}
      <ScheduleMeet open={open} setOpen={setOpen} />

      <div className="space-y-8">
        {/* MAP */}
        <div className="relative group">
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
            <div className="aspect-video relative">
              {!mapLoaded && (
                <div className="absolute inset-0 bg-muted flex flex-col items-center justify-center">
                  <Icon
                    name="MapPin"
                    size={40}
                    className="text-muted-foreground mb-2"
                  />
                  <p className="text-muted-foreground text-sm">
                    Loading location...
                  </p>
                </div>
              )}

              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Ratnakar Singh Location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  address,
                )}&z=15&output=embed`}
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={handleMapLoad}
                className="w-full h-full"
              />

              {/* Map Badge */}
              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-medium shadow">
                📍 Bhopal, Madhya Pradesh
              </div>

              {/* Direction Button */}
              <div className="absolute top-4 right-4">
                <Button
                  variant="secondary"
                  size="sm"
                  iconName="Navigation"
                  iconPosition="left"
                  onClick={handleDirectionsClick}
                >
                  Directions
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* LOCATION INFO CARD */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="MapPin" size={20} className="text-primary" />
            </div>

            <h3 className="text-lg font-semibold text-foreground">
              My Current Location
            </h3>
          </div>

          <p className="text-muted-foreground mb-3">
            {locationDetails.description}
          </p>

          <p className="font-medium text-foreground">{locationDetails.city}</p>

          <p className="text-sm text-muted-foreground">
            {locationDetails.area}
          </p>

          {/* ACTION BUTTONS */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button
              variant="default"
              iconName="Navigation"
              iconPosition="left"
              onClick={handleDirectionsClick}
              className="flex-1"
            >
              Get Directions
            </Button>

            <Button
              variant="outline"
              iconName="Video"
              iconPosition="left"
              onClick={() => setOpen(true)}
              className="flex-1"
            >
              Schedule Virtual Meet
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationMap;
