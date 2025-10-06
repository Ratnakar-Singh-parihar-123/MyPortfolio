import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const LocationMap = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  // Your location (you can replace with your real coordinates)
  const latitude = 23.2599;
  const longitude = 77.4126;

  const handleMapLoad = () => setMapLoaded(true);

  const handleDirectionsClick = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(googleMapsUrl, "_blank");
  };

  const locationDetails = {
    city: "Bhopal, Madhya Pradesh, India",
    area: "Available for remote and local projects",
    description:
      "Let’s connect! I’m based in Bhopal and open for collaborations, meetings, or virtual discussions.",
  };

  return (
    <div className="space-y-8">
      {/* Map Section */}
      <div className="relative">
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="aspect-video relative">
            {!mapLoaded && (
              <div className="absolute inset-0 bg-muted flex flex-col items-center justify-center">
                <Icon
                  name="MapPin"
                  size={42}
                  className="text-muted-foreground mb-2"
                />
                <p className="text-muted-foreground text-sm">Loading map...</p>
              </div>
            )}

            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Ratnakar Singh Location"
              src={`https://www.google.com/maps?q=${latitude},${longitude}&z=12&output=embed`}
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={handleMapLoad}
              className="w-full h-full"
            />
          </div>

          {/* Overlay Button */}
          <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-md p-2 shadow-md">
            <Button
              variant="ghost"
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

      {/* Location Info */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="MapPin" size={20} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            My Location
          </h3>
        </div>

        <div className="space-y-2">
          <p className="text-muted-foreground">{locationDetails.description}</p>
          <p className="font-medium text-foreground">{locationDetails.city}</p>
          <p className="text-sm text-muted-foreground">{locationDetails.area}</p>
        </div>

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
            onClick={() =>
              window.open("", "_blank")
            }
            className="flex-1"
          >
            Book Virtual Meet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;