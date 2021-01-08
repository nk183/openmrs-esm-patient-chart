import React from "react";
import { ExtensionSlot } from "@openmrs/esm-react-utils";
import { spaBasePath } from "./constants";

function getPatientUuidFromUrl() {
  const match = /\/patient\/([a-zA-Z0-9\-]+)\/?/.exec(location.pathname);
  return match && match[1];
}

export default function PatientChartNavMenu() {
  const patientUuid = getPatientUuidFromUrl();
  const basePath = spaBasePath
    .replace(":patientUuid", patientUuid)
    .replace(/([^:]\/)\/+/g, "$1");
  return (
    <ExtensionSlot
      extensionSlotName="patient-chart-nav-menu"
      state={{ basePath, patientUuid }}
    />
  );
}
