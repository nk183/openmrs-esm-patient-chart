import React from "react";
import { match } from "react-router";
import SummaryCard from "../cards/summary-card.component";
import SummaryCardRow from "../cards/summary-card-row.component";
import SummaryCardRowContent from "../cards/summary-card-row-content.component";
import { performPatientAllergySearch } from "./allergy-intolerance.resource";
import style from "./allergy-card-style.css";

export default function AllergyCard(props: AllergyCardProps) {
  const [patientAllergy, setPatientAllergy] = React.useState(null);

  React.useEffect(() => {
    const abortController = new AbortController();

    performPatientAllergySearch(
      props.currentPatient.identifier[0].value,
      abortController
    )
      .then(allergy => setPatientAllergy(allergy.data))
      .catch(error => {
        setTimeout(() => {
          throw error;
        });
      });

    return () => abortController.abort();
  }, [props.currentPatient.identifier[0].value]);

  return (
    <SummaryCard name="Allergy" match={props.match}>
      {patientAllergy &&
        patientAllergy.total > 0 &&
        patientAllergy.entry.map(allergy => {
          return (
            <SummaryCardRow key={allergy.resource.id} linkTo="/">
              <SummaryCardRowContent justifyContent="space-between">
                <span className={`omrs-bold ${style.left}`}>
                  {allergy.resource.code.text}
                </span>
                <span className={`${style.allergyReaction}`}>
                  {`${allergy.resource.reaction[0].manifestation[0].text} (${
                    allergy.resource.criticality === "?"
                      ? "\u2014"
                      : allergy.resource.criticality
                  })`}
                </span>
              </SummaryCardRowContent>
            </SummaryCardRow>
          );
        })}
    </SummaryCard>
  );
}

type AllergyCardProps = {
  match: match;
  currentPatient: any;
};