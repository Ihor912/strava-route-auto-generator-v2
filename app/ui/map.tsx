"use client";

// START: Preserve spaces to avoid auto-sorting
import "leaflet/dist/leaflet.css";

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

import "leaflet-defaulticon-compatibility";
// END: Preserve spaces to avoid auto-sorting
import { Activity } from "@/types/Strava";
import Link from "next/link";
import { MapContainer, Polyline, Popup, TileLayer } from "react-leaflet";

/**
 * Renders a map component with activities and routes.
 *
 * @param {Activity[]} activities - The list of activities.
 * @param {Activity[]} routes - The list of routes.
 * @param {[number, number]} location - The center location of the map.
 * @return {JSX.Element} component.
 */
export default function Map({
  activities,
  routes,
  location,
}: {
  activities: Activity[];
  routes: Activity[];
  location: [number, number];
}) {
  return (
    <MapContainer
      preferCanvas={true}
      center={location}
      zoom={11}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {activities?.map((activity: Activity) => (
        <Polyline key={activity.id} positions={activity.positions}>
          <Popup>
            <Link className="link" href={`/activities/${activity.id}`}>
              <h2>{activity.name}</h2>
            </Link>
          </Popup>
        </Polyline>
      ))}
      {routes?.map((route: Activity) => (
        <Polyline key={route.id} positions={route.positions} color="red">
          <Popup>
            <Link className="link" href={`/saved-routes/${route.id}`}>
              <h2>{route.name}</h2>
            </Link>
          </Popup>
        </Polyline>
      ))}
    </MapContainer>
  );
}
